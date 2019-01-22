# for API auto scrolling
history.scrollRestoration = \manual

<- $ document .ready

for k,v of effects =>
  ret = null
  eval(v.js)
  if ret => v.js = ret

window.editor = editor = do
  effects: effects
  toggle: (v) ->
    if !v? => v = !document.body.classList.contains(\editing)
    document.body.classList[if !v => \remove else \add] \editing
    if !v =>
      svg = document.querySelector '#cooltext svg'
      svg.parentNode.removeChild svg
  config: cur: {fontSize: 64}, old: {}

update-text = (node) ->
  node = node or document.querySelector('#text-input')
  text-input = document.querySelector('#text-input')
  value = node.value or 'Hello World!'
  Array.from(document.querySelectorAll('.gallery text')).map (d,i) -> d.textContent = value
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
  if name == \fontSize => Array.from(document.querySelectorAll('.gallery text')).map (node,i) ->
    node.style.fontSize = "#{value}px"
  Array.from(document.querySelectorAll '.gallery .item').map (d,i) ~>
    if !d.parentNode.style.opacity => return
    type = d.getAttribute('data-type')
    if !(@effects[type].js and @effects[type].watch) => return
    @effects[type].js.watch @config.cur, @config.old, d
  if name == \background =>
    Array.from(document.querySelectorAll '.gallery svg').map (d,i) -> d.style.background = value

list = [[k,v] for k,v of effects]
html = []
for i from 0 til list.length by 2 =>
  code = ""
  for j from 0 to 1 =>
    d = list[i + j]
    if !d => break
    d.1.html = d.1.html.replace "<svg", "<svg width='100%' height='100%'"
    #d.1.html = d.1.html.replace "0 0 500 150", "-10 -10 520 170"
    d.1.html = d.1.html.replace "0 0 500 150", "0 0 500 150"
    code += """<div class="item" data-type="#{d.0}"><div class="inner">#{d.1.html}</div></div>"""
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
  ldcp = new ldColorPicker(node.querySelector('input'), {})
  ldcp.on \change, ->
    editor.update key, it
    node.querySelector('.inner').style.background = it

document.querySelector \.gallery .addEventListener \click, (e) ->
  target = e.target
  if !(target and target.classList  and target.classList.contains \item) => return
  type = target.getAttribute \data-type
  if !type => return
  html = effects[type].html
  # for Safari: duplicate id makes effect gone, so we rename them.
  html = html.replace /id="([^"]+)"/g, 'id="editing-$1"'
  html = html.replace /url\(#([^)]+)\)/g, 'url(#editing-$1)'
  document.querySelector \#cooltext .innerHTML = html
  svg = document.querySelector '#cooltext svg'
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
  rows_in_block: 50

document.addEventListener \scroll, (e) ->
  scrolltop = document.scrollingElement.scrollTop
  editor = document.querySelector('#editor')
  if scrolltop > 200 => editor.classList.add \on
  else editor.classList.remove \on
  height = window.innerHeight
  Array.from(document.querySelectorAll('.gallery .line')).map (d,i) ->
    box = d.getBoundingClientRect!
    if box.y + box.height < 0 or box.y > height => d.style.visibility = \hidden
    else d.style.visibility = \visible
    if box.y + box.height < 0 or box.y + box.height > height =>
      d.style.opacity = 0
      d.style.transform = "scale(0.9)"
    else
      d.style.opacity = 1
      d.style.transform = "scale(1)"
      #delta = Math.abs((box.y + box.height * 0.5) / height - 0.5)
      #delta = delta * 50
      #Array.from(d.querySelectorAll 'svg').map ->
      #  it.setAttribute \viewBox, [-delta - 10, -delta - 10, 520 + delta * 2, 170 + delta * 2].join(' ')

window.subscribe = ->
  node = document.querySelector(\#subscribe)
  node.classList.remove 'done', 'fail'
  node.classList.add \loading
  email = document.querySelector(\#email).value
  ret = /^[^@]+@[^.]+\.(.+)$/.exec(email or '')
  if !ret or !email => return
  $.ajax do
    url: \/d/newsletter-subscription
    method: \PUT
    data: {email}
  .then ->
    node.classList.remove \loading
    node.classList.add \done
  .fail ->
    node.classList.remove \loading
    node.classList.add \fail

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

ldColorPicker.init!

Array.from(document.querySelectorAll('#font-size-slider .up.irs-input')).map (d,i) ->
  editor.update \fontSize, (v = (+d.value or 64))
  $(d)
    ..val v
    ..ionRangeSlider do
      onChange: (data) -> editor.update \fontSize, data.from
