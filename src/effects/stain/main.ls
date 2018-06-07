ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#ee4208
    color2: name: \color2, type: \color, default: \#4139ff
    stroke: name: \stroke, type: \color, default: \#000000
    shadow: name: \shadow, type: \color, default: \#000000
    direction: name: \direction, type: \number, default: 90, min: 0, max: 360, step: 1
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('stop')).map (d,i) ->
      if n["color#{i + 1}"]? => d.setAttribute \stop-color, n["color#{i + 1}"]
    flood = Array.from(node.querySelectorAll \feFlood)
    if n.stroke? => flood.0.setAttribute \flood-color, n.stroke
    if n.shadow? => flood.1.setAttribute \flood-color, n.shadow
    angle = n.direction or 0
    dx = Math.cos(angle * Math.PI / 180) * 0.4
    dy = Math.sin(angle * Math.PI / 180) * 0.4
    [x1, y1] = [0.5 - dx, 0.5 - dy]
    [x2, y2] = [0.5 + dx, 0.5 + dy]
    node.querySelector('linearGradient')
      ..setAttribute \x1, x1
      ..setAttribute \y1, y1
      ..setAttribute \x2, x2
      ..setAttribute \y2, y2
  dom: (config) ->

if module? => module.exports = ret
