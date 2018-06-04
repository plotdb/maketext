<- $ document .ready

for k,v of effects =>
  eval(v.js)
  v.js = ret

window.editor = editor = do
  effects: effects
  config: cur: {}, old: {}

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
    code += """<div class="item" data-type="#{d.0}"><div class="inner">#{d.1.html}</div></div>"""
  html.push """<div class="line" style="visibility:hidden">#code</div>"""

init-slider = (node, key, value) ->
  $(node.querySelector('.irs-input')).ionRangeSlider do
    min: value.min or 0
    max: value.max or 100
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
  document.querySelector \#cooltext .innerHTML = effects[type].html
  bkcolor = (document.querySelector '#cooltext svg' .style.background) or '#fff'
  document.body.classList.add \editing
  Array.from(document.querySelectorAll('#cooltext text')).map ->
    it.textContent = (document.querySelector('#text-input').value or 'Hello World')
  editor.effects.type = type
  effect = editor.effects[type]
  if effect.js and effect.js.edit =>
    options = document.querySelector(\#editor-custom-options)
    options.innerHTML = ''
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
    if box.y + box.height < 0 or box.y + box.height > height => d.style.opacity = 0
    else d.style.opacity = 1

ldColorPicker.init!

Array.from(document.querySelectorAll('#font-size-slider .up.irs-input')).map (d,i) ->
  $(d).ionRangeSlider do
    onChange: (data) -> editor.update \fontSize, data.from
