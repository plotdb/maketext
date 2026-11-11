ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#ffffff
    color2: name: \color2, type: \color, default: \#fec918
    shadow: name: \shadow, type: \color, default: \#000000
    direction: name: \direction, type: \number, default: 41, min: 0, max: 360, step: 1
    offsetx: name: 'shadow dx', type: \number, default: -1.2, min: -10, max: 10, step: 0.1
    offsety: name: 'shadow dy', type: \number, default: -1.2, min: -10, max: 10, step: 0.1
    stddev: name: 'shadow spread', type: \number, default: 2, min: 0, max: 20, step: 0.01
    background: default: \#1db593
  watch: (n,o, node) ->
    gradients = node.querySelectorAll('linearGradient')
    Array.from(gradients.0.querySelectorAll('stop')).map (d,i) -> d.setAttribute \stop-color, n.shadow
    Array.from(gradients.1.querySelectorAll('stop')).map (d,i) -> d.setAttribute \stop-color, n["color#{i + 1}"]
    angle = n.direction or 0
    dx = Math.cos(angle * Math.PI / 180)
    dy = Math.sin(angle * Math.PI / 180)
    [x1, y1] = [0.5 - dx, 0.5 - dy]
    [x2, y2] = [0.5 + dx, 0.5 + dy]
    gradients.1
      ..setAttribute \x1, x1
      ..setAttribute \y1, y1
      ..setAttribute \x2, x2
      ..setAttribute \y2, y2
    if n.thick? => Array.from(node.querySelectorAll \feMorphology).map -> it.setAttribute \radius, n.thick
    dx = -n.fontSize * 0.3 + n.offsetx
    dy = n.offsety
    node.querySelectorAll \g .1 .setAttribute \transform, "translate(#dx, #dy)"
    Array.from(node.querySelectorAll \feGaussianBlur).map (d,i) ->
      d.setAttribute \stdDeviation, n.stddev / (i + 1)
  dom: (config) ->

if module? => module.exports = ret
