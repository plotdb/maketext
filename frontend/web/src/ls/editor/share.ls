# 分享目前的設定: 效果獨立頁的網址, 設定放在 query string. 開這個網址會以這些設定打開 editor.
#
#   /effect/<name>/?d=<編碼後的設定>
#
# 設定是 {t: 文字, s: 字級, bg: 背景, font: 字型, pat: 圖樣, pad: padding, ox, oy, p: {參數: 值}} 的 JSON,
# 壓縮 ( deflate-raw ) 後以 base64url 編碼, 第一個字元是格式: 1 = 壓縮, 0 = 未壓縮 ( 沒有 CompressionStream 時 ).
# 舊格式 ( 明碼 ) 仍可開啟:
#
#   /effect/<name>/?edit=1&t=<文字>&s=<字級>&bg=..&font=..&pat=..&pad=..&ox=..&oy=..&p.<參數>=<值>
#
# t / s 也是舊的 API 參數 ( index.ls, 不需要 edit ), 其餘只在 edit=1 或 d 時套用.
# 上傳的圖樣 ( data url ) 放不進網址, 不分享.

b64url = (bytes) ->
  s = ''
  for i from 0 til bytes.length by 0x8000 => s += String.fromCharCode.apply null, bytes.subarray(i, i + 0x8000)
  btoa(s).replace(/\+/g, \-).replace(/\//g, \_).replace(/=+$/, '')
unb64url = (str) ->
  s = atob(str.replace(/-/g, \+).replace(/_/g, \/))
  Uint8Array.from s, (c) -> c.charCodeAt 0
pipe = (bytes, stream) -> new Response(new Blob([bytes]).stream!pipeThrough(stream)).arrayBuffer!then -> new Uint8Array it

# 設定 ( object ) <-> d 參數
share-encode = (obj) ->
  bytes = new TextEncoder!encode JSON.stringify(obj)
  if !window.CompressionStream => return Promise.resolve('0' + b64url bytes)
  pipe(bytes, new CompressionStream \deflate-raw).then -> '1' + b64url it
share-decode = (d) ->
  Promise.resolve!
    .then ->
      bytes = unb64url d.substring(1)
      if d.0 == '1' => pipe(bytes, new DecompressionStream \deflate-raw) else bytes
    .then -> JSON.parse new TextDecoder!decode(it)

# 目前的設定 -> object
settings = ->
  cur = editor.config.cur
  o = {t: document.querySelector(\#text-input).value, s: cur.fontSize}
  if cur.background => o.bg = cur.background
  if (f = mt-font.override) =>
    o.font = if (f.style or \normal) == \normal and "#{f.weight or 400}" == \400 => f.name else "#{f.name}/#{f.style}/#{f.weight}.ttf"
  if (p = mt-pattern.cur) and p.name != \upload => o.pat = p.name
  o.pad = mt-frame.opt.padding
  if mt-frame.offset.x or mt-frame.offset.y => o <<< ox: Math.round(mt-frame.offset.x), oy: Math.round(mt-frame.offset.y)
  e = editor.effects[editor.effects.type]
  o.p = {}
  for k of ((e and e.js and e.js.edit) or {}) when cur[k]? => o.p[k] = cur[k]
  o

share-url = -> share-encode(settings!).then (d) -> "#{location.origin}/effect/#{editor.effects.type}/?d=#d"

window.mt-share = share = do
  open: -> share-url!then (url) ~>
    mt-track \share, {effect: editor.effects.type}
    root = @root
    root.querySelector(\input).value = url
    root.querySelector(\.mt-share-x).href = "https://x.com/intent/post?url=#{encodeURIComponent url}"
    root.querySelector(\.mt-share-fb).href = "https://www.facebook.com/sharer/sharer.php?u=#{encodeURIComponent url}"
    @ldcv = @ldcv or new ldcover root: root
    @ldcv.toggle true
  copy: ->
    input = @root.querySelector \input
    p = if navigator.clipboard => navigator.clipboard.writeText(input.value) else
      input.select!
      Promise.resolve document.execCommand(\copy)
    p.then ~>
      btn = @root.querySelector \.mt-share-copy
      btn.classList.add \tip-on
      clearTimeout @_tip
      @_tip = setTimeout (-> btn.classList.remove \tip-on), 1200
  # 網址的 query ( 已 decodeURIComponent 的 object ) -> 明碼格式的設定 ( 同舊格式的 key ); 不是分享的網址則為 null
  parse: (q) ->
    if q.d =>
      share-decode(q.d).then (o) ->
        ret = {} <<< o
        delete ret.p
        for k, v of (o.p or {}) => ret["p.#k"] = v
        ret
      .catch (e) ->
        console.warn "[maketext] share:", e
        null
    else Promise.resolve(if q.edit => q else null)
  # 開啟分享的網址時: 打開 editor 並套用設定 ( index.ls 在 open-effect 之後呼叫 )
  # from-d: t / s 不是由 index.ls 的舊參數處理套用的, 這裡套用
  apply: (q, from-d) ->
    if from-d and q.t? => maketext.editor.input "#{q.t}"
    if from-d and q.s? and (n = document.querySelector '#font-size-slider .up.irs-input') =>
      $(n).data(\ionRangeSlider)?update {from: +q.s}
      editor.update \fontSize, +q.s
    if q.bg => set-color \background, q.bg
    for k, v of q when /^p\./.exec(k) =>
      name = k.substring 2
      if document.querySelector("\#editor-custom-options input[name=\"#name\"][data-toggle=colorpicker]") => set-color name, v
      else if (n = document.querySelector "\#editor-custom-options .irs-input input[data-name=\"#name\"]") =>
        $(n).data(\ionRangeSlider)?update {from: +v}
        editor.update name, +v
      else editor.update name, v
    if q.pad? => mt-frame.set-opt \padding, +q.pad
    if q.ox? or q.oy? =>
      mt-frame.offset = {x: +q.ox or 0, y: +q.oy or 0}
      mt-frame.apply!
    if q.pat => mt-pattern.load-list!then (list) -> if (p = list.find -> it.name == q.pat) => mt-pattern.set p
    if q.font => mt-font.load(q.font).then((f) -> mt-font.set-override f).catch (e) -> console.warn "[maketext] share font:", e

# 顏色欄位: 設定 ldcolorpicker ( 也更新色塊 ) 並通知 editor
set-color = (name, value) ->
  if (n = document.querySelector "\#editor input[name=\"#name\"][data-toggle=colorpicker]") and ldcp = n.getColorPicker! =>
    ldcp.setColor value
    if (inner = n.parentNode.querySelector \.inner) => inner.style.background = value
  editor.update name, value

<- document.addEventListener \DOMContentLoaded, _
if !(root = share.root = document.querySelector \#share-panel) => return
root.querySelector(\.mt-share-copy).addEventListener \click, -> share.copy!
root.querySelector(\input).addEventListener \focus, -> @select!
