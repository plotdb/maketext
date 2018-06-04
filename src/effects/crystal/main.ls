ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \fill, type: \color, default: \#f00
    color2: name: \stroke, type: \color, default: \#f00
    color3: name: 'inner shadow', type: \color, default: \#f00
    color4: name: \reflect, type: \color, default: \#f00
  watch: (n,o, node) ->
    if n.color1? => node.querySelector(\text).setAttribute(\fill, n.color1)
    if n.color2? => node.querySelector(\text).setAttribute(\stroke, n.color2)
    if n.color3? => node.querySelector(\feFlood).setAttribute(\flood-color, n.color3)
    if n.color4? => node.querySelector(\feSpecularLighting).setAttribute(\lighting-color, n.color4)
    text = node.querySelector(\text)
    text.style.display = \inline-block
    setTimeout (-> text.style.display = \block), 0

  dom: (config) ->

if module? => module.exports = ret
