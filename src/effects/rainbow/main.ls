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
    direction: name: \direction, type: \number, default: 24, min: 0, max: 360, step: 1
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('stop')).map (d,i) -> d.setAttribute \stop-color, n["color#{i + 1}"]
    box = node.querySelector \text .getBBox!
    angle = n.direction or 0
    dx = Math.cos(angle * Math.PI / 180) * 0.5 * box.width
    dy = Math.sin(angle * Math.PI / 180) * 0.5 * box.height
    [x1, y1] = [box.x + box.width * 0.5 - dx, box.y + box.height * 0.5 - dy]
    [x2, y2] = [box.x + box.width * 0.5 + dx, box.y + box.height * 0.5 + dy]
    node.querySelector('linearGradient')
      ..setAttribute \x1, x1
      ..setAttribute \y1, y1
      ..setAttribute \x2, x2
      ..setAttribute \y2, y2

  dom: (config) ->

if module? => module.exports = ret
