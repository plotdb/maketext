ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#000000
    stroke: name: \stroke, type: \color, default: \#88e0eb
    inner-shadow: name: 'inner shadow', type: \color, default: \#fff
    reflect: name: \reflect, type: \color, default: \#fff
  watch: (n,o, node) ->
    if n.fill? => node.querySelector(\text).setAttribute(\fill, n.fill)
    if n.stroke? => node.querySelector(\text).setAttribute(\stroke, n.stroke)
    if n.inner-shadow? => node.querySelector(\feFlood).setAttribute(\flood-color, n.inner-shadow)
    if n.reflect? => node.querySelector(\feSpecularLighting).setAttribute(\lighting-color, n.reflect)
    text = node.querySelector(\text)
    text.style.display = \inline-block
    setTimeout (-> text.style.display = \block), 0

  dom: (config) ->

if module? => module.exports = ret
