ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#ffb200
    color2: name: \color2, type: \color, default: \#e10057
    color3: name: \color3, type: \color, default: \#5A1A80
    direction: name: \direction, type: \number, default: 24, min: 0, max: 360, step: 1
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll 'linearGradient stop').map (d,i) ->
      if i > 2 => return
      if n["color#{i + 1}"]? => d.setAttribute \stop-color, n["color#{i + 1}"]
    angle = n.direction or 0
    dx = Math.cos(angle * Math.PI / 180) * 125
    dy = Math.sin(angle * Math.PI / 180) * 37.5
    [x1, y1] = [250 - dx, 75 - dy]
    [x2, y2] = [250 + dx, 75 + dy]
    node.querySelector('linearGradient')
      ..setAttribute \x1, x1
      ..setAttribute \y1, y1
      ..setAttribute \x2, x2
      ..setAttribute \y2, y2

  dom: (config) ->

if module? => module.exports = ret
