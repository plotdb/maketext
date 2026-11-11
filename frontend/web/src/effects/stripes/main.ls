ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: "color1", type: \color, default: \#f92
    color2: name: "color2", type: \color, default: \#e00
    direction: name: \direction, type: \number, default: 24, min: 0, max: 360, step: 1
    density: name: \density, type: \number, default: 4, min: 1, max: 10, step: 0.1
  watch: (n,o, node) ->
    stop = node.querySelectorAll('stop')
    if n.color1? => stop.0.setAttribute \stop-color, n.color1
    if n.color2? => stop.1.setAttribute \stop-color, n.color2
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
    if n.density? =>
      [w, w2, s] = [n.density, n.density * 2, n.density * 0.25]
      d = [
        \M, -w, -w, \L, w2, w2
        \M, -w2, -w, \L, w, w2
        \M, -w, -w2, \L, w2, w
      ].join(' ')
      code = btoa """<svg xmlns="http://www.w3.org/2000/svg" width="2000px" height="1000px"><defs><pattern id="pattern" patternUnits="userSpaceOnUse" x="0" y="0" width="#w" height="#w"><path d="#d" stroke="#000" stroke-width="#s"/></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(\#pattern)"/></svg>"""
      node.querySelector \feImage
        .setAttributeNS \http://www.w3.org/1999/xlink, \href, "data:image/svg+xml;base64,#code"

  dom: (config) ->

if module? => module.exports = ret
