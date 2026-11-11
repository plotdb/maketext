# for API auto scrolling
history.scrollRestoration = \manual

<- $ document .ready

# 效果清單 ( effects ) 與載入器 ( mteffect ) 來自 /js/effects/index.js ( tool/maketext/build-effects.ls ).
# 效果本體 ( svg 與 watch ) 在需要即時 render 時才以 mteffect.load 載入.
svg-html = (e) -> e.html.replace "<svg", "<svg width='100%' height='100%'"

window.editor = editor = do
  effects: effects
  toggle: (v) ->
    if !v? => v = !document.body.classList.contains(\editing)
    document.body.classList[if !v => \remove else \add] \editing
    if !v =>
      svg = document.querySelector '#cooltext svg'
      svg.parentNode.removeChild svg
  config: cur: {fontSize: 64}, old: {}

# gallery 的分段更新:
# 每個效果都是帶 svg filter 的 svg, 一次改動全部同步更新會讓畫面內 ~10 個 filter 一起重畫 ( 每打一個字卡 ~250ms ).
# 改成: 改動只記在 gallery.state 並遞增版本, debounce 後只更新畫面內的項目, 每個 frame 一個;
# 畫面外的等捲進畫面時 ( scroll handler ) 再補. 項目以 data-v 記錄已套用的版本,
# 因此被 clusterize 用原始 html 重建的項目也會被視為過期而補上.
# 一開始顯示的是預先 render 的縮圖 ( 固定文字 / 預設字型 ), 第一次真正的改動才把項目切成即時 render.
# state 的初始值對應縮圖的狀態, set 相同的值 ( 例: 載入時的字級 64 ) 不會讓縮圖失效.
gallery = state: {fontSize: 64, font: null}, ver: 0, queue: [], timer: null, running: false
gallery.stale = (item) -> +(item.dataset.v or 0) != @ver
gallery.sync = (item) ->
  ver = @ver
  type = item.dataset.type
  # 效果本體與字型都載入後才切成即時 render; 字型載入失敗時以替代字型顯示
  Promise.all [mteffect.load(type), mt-font.of(type).catch(-> null)]
    .then ([e, font]) ~>
      inner = item.querySelector \.inner
      if !inner.querySelector(\svg) => inner.insertAdjacentHTML \beforeend, svg-html(e)
      if font => mt-font.apply item, font
      item.classList.add \live
      {text, font-size, background} = @state
      if text? => Array.from(item.querySelectorAll \text).map -> it.textContent = text
      if font-size? => Array.from(item.querySelectorAll \text).map -> it.style.fontSize = "#{font-size}px"
      if background? => item.querySelector(\svg).style.background = background
      item.dataset.v = ver
    .catch (e) -> console.warn "[maketext] gallery:", e
# 縮圖載入失敗 ( 例: 新效果還沒產縮圖 ) 時改用即時 render
gallery.fallback = (img) ->
  item = img.closest \.item
  item.dataset.v = -1
  @enqueue item.closest(\.line)
gallery.enqueue = (line) ->
  for item in Array.from(line.querySelectorAll \.item) => if @stale(item) and !(item in @queue) => @queue.push item
  @run!
gallery.run = ->
  if @running => return
  @running = true
  step = ~>
    while (item = @queue.shift!) and !@stale(item) => continue
    if !item => return @running = false
    @sync(item).then -> requestAnimationFrame step
  requestAnimationFrame step
gallery.set = (k, v) ->
  if @state[k] == v => return
  @state[k] = v
  @ver++
  clearTimeout @timer
  @timer = setTimeout (~>
    Array.from(document.querySelectorAll '.gallery .line')
      .filter -> it.style.visibility == \visible
      .map ~> @enqueue it
  ), 120

# 字型 ( font.ls ) 也透過它讓 gallery 以新字型重新 render
editor.gallery = gallery

update-text = (node) ->
  node = node or document.querySelector('#text-input')
  text-input = document.querySelector('#text-input')
  value = node.value or 'Hello World!'
  gallery.set \text, value
  Array.from(document.querySelectorAll('#cooltext text')).map -> it.textContent = value
  text-input.value = value

window.scrollto = scrollto = (node) ->
  $('html,body').animate({ scrollTop: $(node).offset().top }, 300)

document.querySelector('#landing input').addEventListener \keyup, (e) ->
  if e.keyCode == 13 => scrollto \#top
  update-text @
document.querySelector(\#text-input).addEventListener \keyup, -> update-text @
editor.update = (name, value) ->
  @config.old = JSON.parse JSON.stringify @config.cur
  @config.cur[name] = value
  svg = document.querySelector('#cooltext svg')
  if document.body.classList.contains \editing =>
    @effects[effects.type].js.watch @config.cur, @config.old, svg
    if name == \background => svg.style.background = value
    if name == \fontSize => Array.from(svg.querySelectorAll(\text)).map -> it.style.fontSize = "#{value}px"
    return
  # gallery 只同步字級與背景. 舊版這裡另有一段呼叫各效果 watch 的迴圈, 但條件檢查的是
  # effects[type].watch ( watch 實際在 .js 底下 ) 而從未執行, 移植時拿掉, 行為不變.
  if name in <[fontSize background]> => gallery.set name, value

list = [[k,v] for k,v of effects]
html = []
for i from 0 til list.length by 2 =>
  code = ""
  for j from 0 to 1 =>
    d = list[i + j]
    if !d => break
    # 預設顯示預先 render 的縮圖 ( tool/maketext/build-thumbs.ls ), 改過文字 / 字級 / 背景 / 字型後
    # 才載入效果本體, 切成即時 render 的 svg ( .live, 見 gallery.sync ). 縮圖缺漏時直接用 svg.
    # 容器的背景色是效果 svg 的背景 ( build 時取出 ), 讓縮圖 object-fit: contain 多出來的邊同色.
    thumb = """<img class="thumb" src="/assets/thumb/#{d.0}.webp" loading="lazy" alt="#{d.0}"
    onerror="editor.gallery.fallback(this)">"""
    code += """<div class="item" data-type="#{d.0}"><div class="inner" style="background:#{d.1.bk}">#thumb</div></div>"""
  html.push """<div class="line" style="visibility:hidden">#code</div>"""


init-slider = (node, key, value) ->
  n = node.querySelector \.irs-input
  n.setAttribute 'data-name', key
  $(n)
    ..val value.default or 0
    ..ionRangeSlider do
      min: value.min or 0
      max: value.max or 100
      step: value.step or 1
      onChange: (data) -> editor.update key, data.from

init-colorpicker = (node, key, value) ->
  ldcp = new ldcolorpicker(node.querySelector('input'))
  # 新版 change 傳的是 hsl 物件, 轉成 css 色碼給 effect 的 watch 用
  ldcp.on \change, ->
    c = ldcolor.web it
    editor.update key, c
    node.querySelector('.inner').style.background = c

document.querySelector \.gallery .addEventListener \click, (e) ->
  target = e.target
  if !(target and target.classList  and target.classList.contains \item) => return
  type = target.getAttribute \data-type
  if !type => return
  mteffect.load type
    .then (e) -> open-effect type, e
    .catch (e) -> console.warn "[maketext] editor:", e

# 打開 editor 編輯指定的效果 ( e: 已載入的效果 )
open-effect = (type, e) ->
  html = svg-html e
  # for Safari: duplicate id makes effect gone, so we rename them.
  html = html.replace /id="([^"]+)"/g, 'id="editing-$1"'
  html = html.replace /url\(#([^)]+)\)/g, 'url(#editing-$1)'
  document.querySelector \#cooltext .innerHTML = html
  svg = document.querySelector '#cooltext svg'
  mt-font.of type
    .then (f) -> mt-font.apply document.querySelector(\#cooltext), f
    .catch (e) -> console.warn "[maketext] font:", e
  bkcolor = (getComputedStyle(svg).backgroundColor) or '#fff'
  Array.from(svg.querySelectorAll \feImage).map (d,i) ->
    href = d.getAttributeNS(\http://www.w3.org/1999/xlink, \href) or d.getAttribute(\href)
    if /^data:image/.exec href => return
    [w,h] = [d.getAttribute(\width), d.getAttribute(\height)].map -> (/(\d+)/.exec(it) or [0,1024]).1
    smiltool.url-to-dataurl href, w, h .then -> d.setAttributeNS \http://www.w3.org/1999/xlink, \href, it
  editor.toggle true
  Array.from(document.querySelectorAll('#cooltext text')).map ->
    it.textContent = (document.querySelector('#text-input').value or 'Hello World')
  editor.effects.type = type
  effect = editor.effects[type]
  options = document.querySelector(\#editor-custom-options)
  options.innerHTML = ''
  if effect.js and effect.js.edit =>
    colors = [v for k,v of effect.js.edit].filter(-> it.type == \color).map(-> it.default)
    for k,v of effect.js.edit =>
      node = document.querySelector("\#editor-option-sample-#{v.type}")
      if !node => continue
      node = node.cloneNode(true)
      if v.type == \color =>
        node.querySelector('label').textContent = v.name
        node.querySelector('input').setAttribute \name, k
        init-colorpicker node, k, v
      else if v.type == \number =>
        node.querySelector('label').textContent = v.name
        node.querySelector('input').setAttribute \name, k, v
        init-slider node, k, v
      options.appendChild(node)
    set-palette [bkcolor] ++ colors
    for k,v of effect.js.edit =>
      editor.update k, v.default
  else
    options.innerHTML = "<div class='col-sm'><div class='empty'></div></div>"
    set-palette [bkcolor]
  for k,v of editor.config.{}cur => editor.update k, v



clusterize = new Clusterize do
  rows: html
  scrollElem: document.querySelector 'body'
  contentElem: document.querySelector '#gallery'
  rows_in_block: 10

document.addEventListener \scroll, (e) ->
  scrolltop = document.scrollingElement.scrollTop
  editor = document.querySelector('#editor')
  if scrolltop > 200 => editor.classList.add \on
  else editor.classList.remove \on
  height = window.innerHeight
  Array.from(document.querySelectorAll('.gallery .line')).map (d,i) ->
    box = d.getBoundingClientRect!
    if box.y + box.height < 0 or box.y > height => d.style.visibility = \hidden
    else
      d.style.visibility = \visible
      # 捲進畫面時補上過期的項目
      gallery.enqueue d
    if box.y + box.height < 0 or box.y + box.height / 3 > height =>
      d.style.opacity = 0
      d.style.transform = "scale(0.9)"
    else
      d.style.opacity = 1
      d.style.transform = "scale(1)"
      #delta = Math.abs((box.y + box.height * 0.5) / height - 0.5)
      #delta = delta * 50
      #Array.from(d.querySelectorAll 'svg').map ->
      #  it.setAttribute \viewBox, [-delta - 10, -delta - 10, 520 + delta * 2, 170 + delta * 2].join(' ')


/*
# API Functionality
 * Export Input
   -  t: [text input]
         auto fill text input and scroll into gallery
   -  s: [font size]
         pre-set font size

 * Export events:
   - image.ready / fired when use click SVG/PNG button
     - type: ANY(image/png image/svg+xml)
     - name: [name]

 * Eventbus usage example:
   - maketext.editor.on \image.ready, -> console.log it

 DOM that is expected to be used by API user:
   editor-download-btn
     .btn[data-type=svg]
     .btn[data-type=png]

*/

window.maketext = maketext = editor: do
  input: ->
    node = document.querySelector('#landing input')
    node.value = it
    update-text node
  evt-handler: {}
  on: (n, cb) -> @evt-handler.[][n].push cb
  fire: (n, ...v) ->
    for cb in (@evt-handler[n] or []) => cb.apply @, v
    window.postMessage {n, data: v}, \*


queries = (window.location.search or "?").substring(1)
  .split \&
  .map -> it.split \=
  .filter -> it.0
queries
  .filter(-> it.0 == \t)
  .slice(0,1)
  .map ->
    maketext.editor.input decodeURIComponent it.1
    scrollto \#top # this only works if we disable history.scrollRestoration

queries
  .filter(-> it.0 == \s and !isNaN(+it.1))
  .slice(0,1)
  .map -> $('#font-size-slider .up.irs-input').val +it.1

# 新版 ldcolorpicker 沒有自動掃描的 init, 逐一建立 ( 設定由 input 上的 data-* 屬性讀取 )
Array.from(document.querySelectorAll 'input[data-toggle="colorpicker"]').map -> new ldcolorpicker it

Array.from(document.querySelectorAll('#font-size-slider .up.irs-input')).map (d,i) ->
  editor.update \fontSize, (v = (+d.value or 64))
  $(d)
    ..val v
    ..ionRangeSlider do
      onChange: (data) -> editor.update \fontSize, data.from
      max: 200
