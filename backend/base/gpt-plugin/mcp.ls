# 精簡的 MCP server ( streamable HTTP，stateless + JSON response )
#
# 只實作 tools / resources，夠 ChatGPT plugin ( MCP Apps ) 用。
# 不用 @modelcontextprotocol/sdk：stateless 模式下協定只剩幾個 JSON-RPC method，
# 手寫比引入 ESM-only 的 SDK 與 zod 進 makechart 依賴樹單純。
# spec: https://modelcontextprotocol.io/specification
#       https://github.com/modelcontextprotocol/ext-apps ( MCP Apps / SEP-1865 )

VERSIONS = <[2025-11-25 2025-06-18 2025-03-26 2024-11-05]>

rpc-error = (code, message) -> new Error(message) <<< {rpc-code: code}
omit = (o, k) -> ret = {} <<< o; delete ret[k]; ret

# opt:
#  - info: {name, version}
#  - instructions: 給 model 的使用說明
#  - tools: [{name, description, inputSchema, _meta, handler: (args, req) -> result}]
#  - resources: [{uri, name, mimeType, _meta, text: (req) -> string}]
#  req: 這次的 http 請求 ( 依網域決定網址等 )
mcp = (opt) ->
  {info, instructions, tools = [], resources = []} = opt

  methods =
    initialize: (params = {}) ->
      v = params.protocolVersion
      protocolVersion: if v in VERSIONS => v else VERSIONS.0
      capabilities:
        tools: {}
        resources: {}
        extensions: {"io.modelcontextprotocol/ui": {}}
      serverInfo: info
      instructions: instructions
    ping: -> {}
    "tools/list": -> tools: tools.map -> omit it, \handler
    "tools/call": ({name, arguments: args} = {}, req) ->
      tool = tools.find -> it.name == name
      if !tool => throw rpc-error -32602, "unknown tool: #name"
      Promise.resolve!
        .then -> tool.handler(args or {}, req)
        # tool 執行錯誤依 spec 回 isError 讓 model 看得到，而不是 protocol error
        .catch (e) -> {isError: true, content: [{type: \text, text: "#{e.message or e}"}]}
    "resources/list": -> resources: resources.map -> omit it, \text
    "resources/templates/list": -> resourceTemplates: []
    "resources/read": ({uri} = {}, req) ->
      r = resources.find -> it.uri == uri
      if !r => throw rpc-error -32002, "resource not found: #uri"
      contents: [{uri: r.uri, mimeType: r.mimeType, text: r.text(req), _meta: r._meta}]

  handle = (msg, req) ->
    if !msg or msg.jsonrpc != \2.0 or typeof(msg.method) != \string =>
      return Promise.resolve {jsonrpc: \2.0, id: null, error: {code: -32600, message: 'invalid request'}}
    # notification ( 無 id ) 不需回應，stateless 下也沒有狀態要更新
    if !(msg.id?) => return Promise.resolve null
    Promise.resolve!
      .then ->
        if !methods[msg.method] => throw rpc-error -32601, "method not found: #{msg.method}"
        methods[msg.method] msg.params, req
      .then (result) -> {jsonrpc: \2.0, id: msg.id, result}
      .catch (e) ->
        error = {code: e.rpc-code or -32603, message: if e.rpc-code => e.message else 'internal error'}
        {jsonrpc: \2.0, id: msg.id, error}

  (req, res) ->
    # stateless：不開 SSE stream，也沒有 session 可刪
    if req.method != \POST => return res.status 405 .set \Allow, \POST .json {error: 'method not allowed'}
    body = req.body
    batch = Array.isArray body
    Promise.all (if batch => body else [body]).map(-> handle it, req)
      .then (rets) ->
        rets = rets.filter -> it
        if !rets.length => return res.status 202 .end!
        res.json(if batch => rets else rets.0)

module.exports = mcp
