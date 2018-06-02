<- $ document .ready

html = []
for i from 0 til palettes.length by 4 =>
  code = ""
  for j from 0 til 4 =>
    d = palettes[i + j]
    if !d => break
    code += """<div class="palette"><div class="name">#{d.0}</div>""" +
    (d.1.map(-> "<div class='color' style='background:#it'></div>").join('')) +
    "</div>"
  html.push "<div class='line'>#code</div>"

set-palette = (colors) ->
  document.querySelector(\#palette-btn).innerHTML = colors
    .map -> """<div class="color" style="background:#{it}"></div>"""
    .join('')
  Array.from(document.querySelectorAll("[data-toggle='colorpicker']")).map ((d,i)->
    ldcp = d.getColorPicker!
    ldcp.setPalette {colors: colors.map -> {hex: it}}
    ldcp.setIdx(i % colors.length)
  )

palette-btn = document.querySelector('#palette-btn')
#palette-btn.innerHTML = ''
palette = palettes[Math.floor(Math.random! * palettes.length)]
set-palette palette.1
/*
palette-btn.innerHTML = (
  for i from 0 til palette.1.length =>
    "<div class='color' style='background:#{palette.1[i]}'></div>"
).join('')
*/

clusterize = new Clusterize do
  rows: html
  scrollElem: document.querySelector('#palette-picker .clusterize-scroll')
  contentElem: document.querySelector('#palette-picker .clusterize-content')
  rows_in_block: 50

document.querySelector('#palette-picker').addEventListener \click, (e) ->
  target = e.target
  if !target or !target.classList or !target.classList.contains \palette => return
  colors = Array.from(target.querySelectorAll('.color')).map(-> it.style.background)
  $(\#palette-picker).modal \hide
  set-palette colors

Array.from(document.querySelectorAll '.color input[data-toggle="colorpicker"]').map (d,i) ->
  ldcp = d.getColorPicker!
  name = d.getAttribute(\name)
  ldcp.on \change, ->
    editor.update name, it
    d.parentNode.querySelector('.inner').style.background = it


