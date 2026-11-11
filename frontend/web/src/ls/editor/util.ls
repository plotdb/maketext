# editor 各檔案共用的小工具. 打包時放在最前面 ( 見各頁的 +script )

# 頁面載入完、瀏覽器空閒時才執行 ( 預載用, 不跟首屏搶資源 ). timeout: 最晚幾毫秒後一定執行
window.idle = (cb, timeout = 2000) ->
  run = -> if window.request-idle-callback => request-idle-callback cb, {timeout} else set-timeout cb, 200
  if document.ready-state == \complete => run! else window.add-event-listener \load, run

# GA 事件 ( gtag, 見 src/pug/modules/mt/ga.pug ). 沒載入 gtag 時 ( debug / 被擋 ) 直接略過
window.mt-track = (name, params = {}) ->
  if typeof(gtag) == \function => gtag \event, name, params
