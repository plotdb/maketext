ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#0ff
    color2: name: \color2, type: \color, default: \#f0f
    color3: name: \color3, type: \color, default: \#ff0
    density: name: "Dot Density", type: \number, default: 1, min: 0, max: 2, step: 0.1
    direction: name: \direction, type: \number, default: 90, min: 0, max: 360, step: 1
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('stop')).map (d,i) ->
      if n["color" + (3 - i)]? => d.setAttribute('stop-color', n["color" + (3 - i)])
    r = 3
    p = (if n.density? => n.density else 1)
    d = r * 2 + p
    c = r + p * 0.5

    node.querySelector \feImage
      ..setAttribute \href, """
        data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="#{d}px" height="#{d}px"><circle cx="#{c}" cy="#{c}" r="#{r}" fill="red"/></svg>
        """
      ..setAttribute \width, "5px"
      ..setAttribute \height, "5px"

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
