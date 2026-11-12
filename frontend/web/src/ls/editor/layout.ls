# 編輯中效果的位置與匯出範圍
#
# - 位置: 在預覽上拖曳文字可微調位置 ( 修正字型基線造成的偏移 ). 效果的圖形 ( defs 以外 ) 包進
#   g.mt-offset, 以 translate 移動整組, 效果內部的座標 ( filter / gradient / getBBox ) 都不受影響.
#   換效果時歸零.
# - 匯出範圍 ( download.ls 的 prepare ): 以文字的外框為準, 四周加上 padding.
#   範圍跟著「拖曳前」的文字走, 拖曳就是在範圍內移動文字. 預覽上以虛線框標出.
# - 匯出設定 ( padding / 倍率 ) 記在 localStorage.
SVGNS = \http://www.w3.org/2000/svg
# 這些不是圖形, 不包進 g.mt-offset
NON-GRAPHIC = <[defs style filter linearGradient radialGradient pattern mask clipPath symbol title desc metadata script]>

load-opt = ->
  try JSON.parse(localStorage.getItem(\mt-export) or '{}') catch e => {}

window.mt-frame = frame = do
  offset: {x: 0, y: 0}
  opt: {padding: 20, scale: 1} <<< load-opt!
  svg: -> document.querySelector '#cooltext svg'
  # 打開效果時 ( index.ls 的 open-effect ) 呼叫: 把圖形包進 g.mt-offset, 位置歸零
  init: (svg) ->
    g = document.createElementNS SVGNS, \g
    g.setAttribute \class, \mt-offset
    for n in Array.from(svg.childNodes) when !(n.nodeType == 1 and n.localName in NON-GRAPHIC) => g.appendChild n
    svg.appendChild g
    crop = document.createElementNS SVGNS, \rect
    crop.setAttribute \class, \mt-crop
    svg.appendChild crop
    @offset = {x: 0, y: 0}
    @apply!
  # 文字的外框 ( 根座標, 含效果內部的 transform ), 扣掉拖曳的位移 = 匯出範圍的中心
  box: (svg = @svg!) ->
    if !(svg and ctm = svg.getScreenCTM!) => return null
    rs = Array.from(svg.querySelectorAll \text).map(-> it.getBoundingClientRect!).filter(-> it.width and it.height)
    if !rs.length => return null
    [x1, y1] = [Math.min(...rs.map (.left)), Math.min(...rs.map (.top))]
    [x2, y2] = [Math.max(...rs.map (.right)), Math.max(...rs.map (.bottom))]
    [x1, x2] = [x1, x2].map -> (it - ctm.e) / ctm.a
    [y1, y2] = [y1, y2].map -> (it - ctm.f) / ctm.d
    p = +@opt.padding or 0
    {x: x1 - p - @offset.x, y: y1 - p - @offset.y, width: x2 - x1 + 2 * p, height: y2 - y1 + 2 * p}
  apply: ->
    if !(svg = @svg!) => return
    if (g = svg.querySelector \.mt-offset) => g.setAttribute \transform, "translate(#{@offset.x},#{@offset.y})"
    if (btn = document.querySelector \#editor-reset-offset) => btn.classList.toggle \d-none, !(@offset.x or @offset.y)
    @refresh!
  # 更新虛線框. 字型載入 / 參數改變後外框會變, 這裡 debounce
  refresh: ->
    clearTimeout @_timer
    @_timer = setTimeout (~>
      if !((svg = @svg!) and crop = svg.querySelector \.mt-crop) => return
      if !(b = @box svg) => return crop.setAttribute \width, 0
      for k,v of b => crop.setAttribute k, v
    ), 60
  reset: -> @offset = {x: 0, y: 0}; @apply!
  set-opt: (k, v) ->
    @opt[k] = v
    try localStorage.setItem \mt-export, JSON.stringify(@opt) catch e => null
    @refresh!

# 拖曳 ( 只在編輯時, #cooltext 的 svg 上 ). script 在頁面內容之前載入, DOM 好了才綁定
drag = null
<- document.addEventListener \DOMContentLoaded, _
if (cooltext = document.querySelector \#cooltext) =>
  cooltext.addEventListener \pointerdown, (e) ->
    if !(document.body.classList.contains(\editing) and (svg = frame.svg!) and ctm = svg.getScreenCTM!) => return
    drag := {x: e.clientX, y: e.clientY, o: {} <<< frame.offset, s: ctm.a}
    cooltext.setPointerCapture e.pointerId
    cooltext.classList.add \dragging
    e.preventDefault!
  cooltext.addEventListener \pointermove, (e) ->
    if !drag => return
    frame.offset = x: drag.o.x + (e.clientX - drag.x) / drag.s, y: drag.o.y + (e.clientY - drag.y) / drag.s
    frame.apply!
  end = (e) ->
    if !drag => return
    drag := null
    cooltext.classList.remove \dragging
    mt-track \offset, {effect: editor.effects.type}
  cooltext.addEventListener \pointerup, end
  cooltext.addEventListener \pointercancel, end

if document.fonts => document.fonts.addEventListener \loadingdone, -> frame.refresh!

# 匯出設定的輸入框 ( src/pug/modules/mt/editor.pug )
if (n = document.querySelector '#export-padding-slider .irs-input input') =>
  $(n)
    ..val frame.opt.padding
    ..ionRangeSlider do
      min: 0, max: 200, step: 1
      onChange: (data) -> frame.set-opt \padding, data.from
if (n = document.querySelector \#export-scale) =>
  n.value = "#{frame.opt.scale}"
  n.addEventListener \change, -> frame.set-opt \scale, +n.value or 1
