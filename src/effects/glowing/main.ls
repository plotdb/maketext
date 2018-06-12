ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#67ff43
    color2: name: \color2, type: \color, default: \#90ffff
    direction: name: \direction, type: \number, default: 231, min: 0, max: 360, step: 1
    thick: name: \thickness, type: \number, default: 10, min: 1, max: 30, step: 0.5
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('stop')).map (d,i) -> d.setAttribute \stop-color, n["color#{i + 1}"]
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
    if n.thick? => Array.from(node.querySelectorAll \feGaussianBlur).map -> it.setAttribute \stdDeviation, n.thick
  dom: (config) ->

if module? => module.exports = ret
