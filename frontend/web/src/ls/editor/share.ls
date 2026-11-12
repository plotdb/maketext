# 分享目前的設定: 效果獨立頁的網址, 設定放在 query string. 開這個網址會以這些設定打開 editor.
#
#   /effect/<name>/?edit=1&t=<文字>&s=<字級>&bg=<背景>&font=<字型>&pat=<圖樣>&pad=<padding>&ox=..&oy=..&p.<參數>=<值>
#
# t / s 也是舊的 API 參數 ( index.ls, 不需要 edit ), 其餘只在 edit=1 時套用.
# 上傳的圖樣 ( data url ) 放不進網址, 不分享.

# 目前的設定 -> 網址
share-url = ->
  type = editor.effects.type
  cur = editor.config.cur
  q = [[\edit, 1], [\t, document.querySelector(\#text-input).value], [\s, cur.fontSize]]
  if cur.background => q.push [\bg, cur.background]
  if (f = mt-font.override) =>
    q.push [\font, if (f.style or \normal) == \normal and "#{f.weight or 400}" == \400 => f.name else "#{f.name}/#{f.style}/#{f.weight}.ttf"]
  if (p = mt-pattern.cur) and p.name != \upload => q.push [\pat, p.name]
  q.push [\pad, mt-frame.opt.padding]
  if mt-frame.offset.x or mt-frame.offset.y => q.push [\ox, Math.round(mt-frame.offset.x)], [\oy, Math.round(mt-frame.offset.y)]
  e = editor.effects[type]
  for k of ((e and e.js and e.js.edit) or {}) when cur[k]? => q.push ["p.#k", cur[k]]
  "#{location.origin}/effect/#{type}/?" + q.map(([k, v]) -> "#{k}=#{encodeURIComponent v}").join('&')

window.mt-share = share = do
  open: ->
    url = share-url!
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
  # 開啟分享的網址時: 打開 editor 並套用設定 ( index.ls 在 open-effect 之後呼叫 )
  apply: (q) ->
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
