ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#fff
    color2: name: \color2, type: \color, default: \#f00
    density: name: \density, type: \number, default: 10, min: 2, max: 20, step: 0.1
  watch: (n,o, node) ->
    density = n.density or 3
    [w, w2, s] = [density, density * 2, density * 0.25]
    d = [
      \M, -w, -w, \L, w2, w2
      \M, -w2, -w, \L, w, w2
      \M, -w, -w2, \L, w2, w
    ].join(' ')
    node.querySelector \feImage
      .setAttributeNS \http://www.w3.org/1999/xlink, \href, ("data:image/svg+xml;base64," + btoa("""<svg xmlns="http://www.w3.org/2000/svg" width="2000px" height="1000px"><defs><pattern id="pattern" patternUnits="userSpaceOnUse" x="0" y="0" width="#w" height="#w"><rect x="0" y="0" width="#w" height="#w" fill="#{n.color1}"/><path d="#d" stroke="#{n.color2}" stroke-width="#s"/></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(\#pattern)"/></svg>"""))

  dom: (config) ->

if module? => module.exports = ret
