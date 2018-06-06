ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#444
    color2: name: \color2, type: \color, default: \#000
    direction: name: \direction, type: \number, default: 0, min: 0, max: 360, step: 1
    thick: name: \thickness, type: \number, default: 1, min: 1, max: 8, step: 1
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('stop')).map (d,i) -> d.setAttribute \stop-color, n["color#{i + 1}"]
    angle = n.direction or 0
    dx = Math.cos(angle * Math.PI / 180)
    dy = Math.sin(angle * Math.PI / 180)
    [x1, y1] = [0.5 - dx, 0.5 - dy]
    [x2, y2] = [0.5 + dx, 0.5 + dy]
    node.querySelector('linearGradient')
      ..setAttribute \x1, x1
      ..setAttribute \y1, y1
      ..setAttribute \x2, x2
      ..setAttribute \y2, y2
    if n.thick? => Array.from(node.querySelectorAll \feMorphology).map -> it.setAttribute \radius, n.thick
  dom: (config) ->

if module? => module.exports = ret
