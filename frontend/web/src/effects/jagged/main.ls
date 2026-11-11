ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color: name: \color, type: \color, default: \#444
    freq: name: \frequency, type: \number, default: 0.1, min: 0, max: 0.5, step: 0.01
    scale: name: \scale, type: \number, default: 10, min: 0, max: 20, step: 0.5
  watch: (n,o, node) ->
    if n.color? => node.querySelector('text').style.fill = n.color
    if n.freq? => node.querySelector('feTurbulence').setAttribute \baseFrequency, n.freq
    if n.scale? =>
      d = n.scale * -0.25
      node.querySelector('feDisplacementMap').setAttribute \scale, n.scale
      node.querySelector('text').setAttribute \transform, "translate(#d,#d)"
  dom: (config) ->

if module? => module.exports = ret
