# 色盤: 以 ldpalettepicker 選色盤, 套到 editor 的各個顏色欄位 ( ldcolorpicker ).
# 色盤清單沿用舊站挑選的 palettes.js ( [名稱, [色碼...]] ), 轉成 ldpp 的格式.
<- $ document .ready

pals = palettes.map ([name, colors]) -> {name, colors}

window.set-palette = set-palette = (colors, name = 'Palette') ->
  colors = colors.map -> ldcolor.web it
  document.querySelector('#palette-btn label').textContent = name
  document.querySelector('#palette-btn .palette').innerHTML = colors
    .map -> """<div class="color" style="background:#{it}"></div>"""
    .join('')

  Array.from(document.querySelectorAll("\#editor *[data-toggle='colorpicker']")).map ((d,i)->
    ldcp = d.getColorPicker!
    ldcp.setPalette {colors: colors.map -> {hex: it}}
    ldcp.setIdx(i % colors.length)
    # 新版 setIdx 只在前後顏色不同時才觸發 change ( 而且兩者都取自新色盤 ), 換色盤時需主動通知 editor
    ldcp.fire \change, ldcp.getColor(\hsl)
  )

palette = pals[Math.floor(Math.random! * pals.length)]
set-palette palette.colors, palette.name

picker = null
window.pick-palette = ->
  if !picker => picker := new ldpp do
    root: document.querySelector('#palette-picker .ldpp')
    ldcv: true
    use-vscroll: true
    palettes: pals
  picker.get!then (pal) ->
    if !(pal and pal.colors and pal.colors.length) => return
    set-palette pal.colors.map((c) -> c.value or c), pal.name

Array.from(document.querySelectorAll '.color input[data-toggle="colorpicker"]').map (d,i) ->
  ldcp = d.getColorPicker!
  name = d.getAttribute(\name)
  # 新版 change 傳的是 hsl 物件, 轉成 css 色碼
  ldcp.on \change, ->
    c = ldcolor.web it
    editor.update name, c
    d.parentNode.querySelector('.inner').style.background = c
