# editor 各檔案共用的小工具. 打包時放在最前面 ( 見各頁的 +script )

# 頁面載入完、瀏覽器空閒時才執行 ( 預載用, 不跟首屏搶資源 ). timeout: 最晚幾毫秒後一定執行
window.idle = (cb, timeout = 2000) ->
  run = -> if window.request-idle-callback => request-idle-callback cb, {timeout} else set-timeout cb, 200
  if document.ready-state == \complete => run! else window.add-event-listener \load, run

# GA 事件 ( gtag, 見 src/pug/modules/mt/ga.pug ). 沒載入 gtag 時 ( debug / 被擋 ) 直接略過
window.mt-track = (name, params = {}) ->
  if typeof(gtag) == \function => gtag \event, name, params

# 設定效果的文字 ( 可多行 ). 多行時每行一個 tspan, 以 dy 往下排, 整段垂直置中在原本的位置
# ( 效果的 text 多半是 text-anchor: middle / dominant-baseline: central ).
# 原始文字記在 data-mt-text, 匯出 ( download.ls ) 轉 path 時用
LINE-HEIGHT = 1.2
window.mt-set-text = (node, value) ->
  lines = "#value".split /\r?\n/
  node.dataset.mt-text = value
  if lines.length < 2 => return node.textContent = value
  node.textContent = ''
  x = node.getAttribute(\x) or 0
  for line, i in lines
    t = document.createElementNS \http://www.w3.org/2000/svg, \tspan
    t.setAttribute \x, x
    t.setAttribute \dy, "#{if i == 0 => -(lines.length - 1) / 2 * LINE-HEIGHT else LINE-HEIGHT}em"
    # 空行也要佔一行的高度
    t.textContent = line or ' '
    node.appendChild t
window.mt-text-lines = (node) -> "#{node.dataset.mt-text ? node.textContent}".split /\r?\n/
window.mt-line-height = LINE-HEIGHT
