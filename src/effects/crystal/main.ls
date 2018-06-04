ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#f00
    color2: name: \color2, type: \color, default: \#f00
    color3: name: \color3, type: \color, default: \#f00
    color4: name: \color4, type: \color, default: \#f00
  watch: (n,o, node) ->
    node.querySelector(\text)
      ..setAttribute(\fill, n.color1)
      ..setAttribute(\stroke, n.color2)
    node.querySelector(\feFlood).setAttribute(\flood-color, n.color3)
    node.querySelector(\feSpecularLighting).setAttribute(\lighting-color, n.color4)
    text = node.querySelector(\text)
    text.style.display = \inline-block
    setTimeout (-> text.style.display = \block), 0

  dom: (config) ->

if module? => module.exports = ret
