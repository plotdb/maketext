ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#ff4
    color2: name: \color2, type: \color, default: \#f92
    stroke: name: \stroke, type: \color, default: \#921
    outline: name: \outline, type: \color, default: \#fff
    shadow: name: \shadow, type: \color, default: \#400
    direction: name: \direction, type: \number, default: 24, min: 0, max: 360, step: 1
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('stop')).map (d,i) -> d.setAttribute \stop-color, n["color#{i + 1}"]
    flood = Array.from(node.querySelectorAll \feFlood)
    if n.stroke? => flood.1.setAttribute \flood-color, n.stroke
    if n.outline? => flood.2.setAttribute \flood-color, n.outline
    if n.shadow? => flood.3.setAttribute \flood-color, n.shadow
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

  dom: (config) ->

if module? => module.exports = ret
