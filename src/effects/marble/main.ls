ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    base: name: \base, type: \color, default: \#e49c49
    texture: name: \texture, type: \color, default: \#b44607
    clarity: name: \clarity, type: \number, default: 4, min: 0, max: 5, step: 0.1
    grain: name: \grain, type: \number, default: 0.07, min: 0, max: 1, step: 0.01
    scale: name: \scale, type: \number, default: 110, min: 0, max: 500, step: 1
  watch: (n,o, node) ->
    if n.base? => node.querySelector(\text).setAttribute(\fill, n.base)
    if n.texture? => node.querySelector(\feFlood).setAttribute(\flood-color, n.texture)
    if n.clarity? => node.querySelector(\feGaussianBlur).setAttribute("stdDeviation", 5 - +n.clarity)
    if n.grain? => node.querySelector(\feTurbulence).setAttribute("baseFrequency", n.grain)
    if n.scale? => node.querySelector(\feDisplacementMap).setAttribute("scale", n.scale)

    text = node.querySelector(\text)
    text.style.display = \inline-block
    setTimeout (-> text.style.display = \block), 0

  dom: (config) ->

if module? => module.exports = ret
