require! <[fs path express]>
require! <[@servebase/backend/aux]>

# demo: 給 ChatGPT 呼叫的外部 API 統一掛在 /demo/gpt-plugin/<name>/ 下，每個子資料夾是一個獨立 plugin：
#  - GPT Action：匯出 `openapi(server-url)`，提供 <name>/openapi.json
#  - ChatGPT 外掛程式：用 ./mcp 在 <name>/mcp 提供 MCP endpoint
# 兩者都匯出 `route(router, backend)` 註冊自己的路由。
#
# 掛在 `route.public` ( session / csrf 之前 )：呼叫方是 OpenAI 的伺服器，
# 不帶 cookie 也拿不到 csrf token，且這些 API 不應依賴 req.user。

(backend, {api, app}) <- (->module.exports = it)  _
{config} = backend
cfg = config.gpt-plugin or {}

root = aux.routecatch express.Router {mergeParams: true}
backend.route.public.use \/demo/gpt-plugin, root

# OpenAPI 的 servers.url 依實際請求推得，nginx 的 X-Forwarded-Proto 經 trust proxy 生效
base-url = (req, name) -> "#{req.protocol}://#{req.get \host}/demo/gpt-plugin/#name"

# 發佈到 GPT Store 需要 privacy policy url
root.get \/privacy, (req, res) ->
  res.type \text .send "These GPT actions do not store or log request data beyond standard server access logs."

fs.readdir-sync __dirname
  .filter -> !/^\./.exec(it)
  .map -> {name: it, dir: path.join(__dirname, it)}
  .filter ({dir}) -> fs.stat-sync(dir).is-directory!
  .map ({name, dir}) ->
    plugin = require(dir)
    router = aux.routecatch express.Router {mergeParams: true}
    apikey = (cfg[name] or {}).apikey or cfg.apikey
    # openapi.json ( GPT Action 用 ) 保持公開，GPT Builder 匯入時不會帶 key。
    # MCP 類的 plugin ( ChatGPT 外掛程式 ) 不需要它，可不提供
    if plugin.openapi
      router.get \/openapi.json, (req, res) -> res.json plugin.openapi(base-url req, name)
    if apikey
      router.use (req, res, next) ->
        if req.headers.authorization == "Bearer #apikey" => return next!
        res.status 401 .json {error: \unauthorized}
    plugin.route router, backend
    # 錯誤一律回 JSON：全站 error handler 對非 /api 路徑會轉 490 錯誤頁，GPT 讀不懂
    router.use (req, res) -> res.status 404 .json {error: 'not found'}
    router.use (err, req, res, next) ->
      if err.status == 400 => return res.status 400 .json {error: err.message}
      backend.log.error {err}, "gpt-plugin/#name"
      res.status 500 .json {error: 'internal error'}
    root.use "/#name", router
