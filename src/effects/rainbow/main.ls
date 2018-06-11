ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#f00
    color2: name: \color2, type: \color, default: \#f90
    color3: name: \color3, type: \color, default: \#ff4
    color4: name: \color4, type: \color, default: \#9f0
    color5: name: \color5, type: \color, default: \#09f
    color6: name: \color6, type: \color, default: \#00f
    color7: name: \color7, type: \color, default: \#90f
    direction: name: \direction, type: \number, default: 0, min: 0, max: 360, step: 1
    depth: name: \depth, type: \number, default: 2, main: 1, max: 5, step: 0.1
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('stop')).map (d,i) -> d.setAttribute \stop-color, n["color#{i + 1}"]
    if n.depth? =>
      node.querySelector \feMorphology .setAttribute \radius, "1,#{n.depth}"
      node.querySelector \feOffset .setAttribute \dy, n.depth
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
