ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#fd9
    color2: name: \color2, type: \color, default: \#9df
    color3: name: 'stroke color', type: \color, default: \#000
    stroke: name: 'stroke width', type: \number, default: \2.5, min: 0, max: 10
    direction: name: \direction, type: \number, default: 90, min: 0, max: 360, step: 1
  watch: (n,o, node) ->
    if n.color1 => node.querySelectorAll('stop').0.setAttribute \stop-color, n.color1
    if n.color2 => node.querySelectorAll('stop').1.setAttribute \stop-color, n.color2
    if n.color3 => node.querySelector('text').setAttribute \stroke, n.color3
    if n.stroke? => node.querySelector('text').setAttribute \stroke-width, n.stroke
    angle = n.direction or 0
    dx = Math.cos(angle * Math.PI / 180) * 0.3
    dy = Math.sin(angle * Math.PI / 180) * 0.3
    [x1, y1] = [0.5 - dx, 0.5 - dy]
    [x2, y2] = [0.5 + dx, 0.5 + dy]
    node.querySelector('linearGradient')
      ..setAttribute \x1, x1
      ..setAttribute \y1, y1
      ..setAttribute \x2, x2
      ..setAttribute \y2, y2

  dom: (config) ->

if module? => module.exports = ret
