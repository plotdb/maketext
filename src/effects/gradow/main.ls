ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#f0f
    color2: name: \color2, type: \color, default: \#0ff
    shadow: name: \shadow, type: \color, default: \#fffcd9
    offset-x: name: 'offset x', type: \number, default: 4, min: -50, max: 50, step: 0.1
    offset-y: name: 'offset y', type: \number, default: 4, min: -50, max: 50, step: 0.1
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
    if n.shadow? => node.querySelector(\feFlood).setAttribute(\flood-color, n.shadow)
    if n.offset-x? => Array.from(node.querySelectorAll(\feOffset)).map (d,i) ->
      d.setAttribute("dx", n.offset-x * (if i => 1 else -1))
    if n.offset-y? => Array.from(node.querySelectorAll(\feOffset)).map (d,i) ->
      d.setAttribute("dy", n.offset-y * (if i => 1 else -1))

  dom: (config) ->

if module? => module.exports = ret
