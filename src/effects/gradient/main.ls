ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#f0f
    color2: name: \color2, type: \color, default: \#0ff
    direction: name: \direction, type: \number, default: 0, min: 0, max: 360, step: 1
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('stop')).map (d,i) -> d.setAttribute \stop-color, n["color#{i + 1}"]
    box = node.querySelector \text .getBBox!
    angle = n.direction or 0
    dx = Math.cos(angle * Math.PI / 180) * 0.5
    dy = Math.sin(angle * Math.PI / 180) * 0.5
    [x1, y1] = [0.5 - dx, 0.5 - dy]
    [x2, y2] = [0.5 + dx, 0.5 + dy]
    node.querySelector('linearGradient')
      ..setAttribute \x1, x1
      ..setAttribute \y1, y1
      ..setAttribute \x2, x2
      ..setAttribute \y2, y2

  dom: (config) ->

if module? => module.exports = ret
