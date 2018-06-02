<- $ document .ready

html = []
for i from 0 til fonts.length by 4 =>
  code = ""
  for j from 0 til 4 =>
    d = fonts[i + j]
    if !d => break
    idx = i + j + 1
    [x, y] = [-55 + -400 * Math.floor(idx / 167), -30 * (idx % 167)]
    code += """<div class='item'><div class='inner'>
      <div class="img" style="background-position:#{x}px #{y}px"></div>
      <span>#{d}</span>
    </div></div>"""
  html.push "<div class='line'><div class='inner'>#code</div></div>"

clusterize = new Clusterize do
  rows: html
  scrollElem: document.querySelector('#font-picker .clusterize-scroll')
  contentElem: document.querySelector('#font-picker .clusterize-content')
  rows_in_block: 50


use-font = (name) ->
  name = name.replace(/\.png/,'')
  window.fontname = name
  style = document.createElement("style")
  style.innerHTML = """
    @font-face {
      font-family: #name;
      src: url(/assets/fonts/ttf/#{name}-Regular.ttf), url(/assets/fonts/ttf/#{name}.ttf);
    }
    svg text {
      font-family: #name;
    }
  """
  document.body.appendChild(style)
  document.querySelector('#cooltext').style.fontFamily = name
  document.querySelector('.gallery').style.fontFamily = name
  $('#font-picker').modal('hide')


document.querySelector('#font-picker').addEventListener \click, (e) ->
  target = e.target
  if !target or !target.classList or !target.classList.contains \inner => return
  use-font target.querySelector('span').innerText

