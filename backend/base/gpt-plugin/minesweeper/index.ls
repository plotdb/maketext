require! <[fs path ../mcp]>

# 踩地雷：ChatGPT 外掛程式 ( MCP Apps )。
# 遊戲完全在 iframe 內跑，server 只負責把 board.html 交給 ChatGPT；
# 過關秒數由 iframe 以 ui/message 送回對話，GPT 因此知道成績。

DIFFICULTY =
  beginner: {label: \初級, rows: 9, cols: 9, mines: 10}
  intermediate: {label: \中級, rows: 16, cols: 16, mines: 40}
  expert: {label: \高級, rows: 16, cols: 30, mines: 99}

WIDGET = \ui://minesweeper/board.html
board-file = path.join __dirname, \board.html

# 每次讀檔：開發時改 html 不用重啟，檔案小，成本可忽略
board-html = -> fs.read-file-sync board-file, \utf8

server = mcp do
  info: {name: \minesweeper, version: \0.1.0}
  instructions: """
    Minesweeper game rendered inside ChatGPT. Call play_minesweeper when the user wants to play.
    When the game reports a result (time in seconds, win or loss), react to it naturally,
    e.g. congratulate, compare with earlier rounds in this conversation, or suggest a harder level.
    """
  tools: [{
    name: \play_minesweeper
    title: 'Play Minesweeper'
    description: 'Open an interactive Minesweeper board for the user to play in the chat. The board reports the result (win/loss and seconds taken) back to the conversation when a game ends.'
    inputSchema:
      type: \object
      properties:
        difficulty:
          type: \string
          enum: <[beginner intermediate expert]>
          description: 'beginner 9x9/10 mines, intermediate 16x16/40, expert 16x30/99. Default beginner.'
    annotations: {readOnlyHint: true}
    _meta: ui: resourceUri: WIDGET
    handler: ({difficulty}) ->
      key = if DIFFICULTY[difficulty] => difficulty else \beginner
      d = DIFFICULTY[key]
      content: [{type: \text, text: "Minesweeper board opened: #{d.label} (#{d.cols}x#{d.rows}, #{d.mines} mines). Waiting for the user to play."}]
      structuredContent: {difficulty: key} <<< d
  }]
  resources: [{
    uri: WIDGET
    name: 'Minesweeper board'
    mimeType: 'text/html;profile=mcp-app'
    # 遊戲不連任何外部資源，csp 留空即最嚴格
    _meta: ui: {prefersBorder: true, csp: {}}
    text: board-html
  }]

route = (router) ->
  router.all \/mcp, server
  # 直接在瀏覽器開，方便不經 ChatGPT 測遊戲本身
  router.get \/preview, (req, res) -> res.type \html .send board-html!

module.exports = {route}
