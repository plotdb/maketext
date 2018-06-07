ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#ac7c2e
    color2: name: \color2, type: \color, default: \#340000
    shadow: name: \shadow, type: \color, default: \#340000
    frequency: name: \fractal, type: \number, default: 0.05, min: 0, max: 0.5, step: 0.01
  watch: (n,o, node) ->
    if n.color2 != o.color2 => node.querySelector \text .setAttribute \fill, n.color2
    if n.color1? => node.querySelector \feSpecularLighting .setAttribute \lighting-color, n.color1
    if n.shadow? => node.querySelector \feFlood .setAttribute \flood-color, n.shadow
    if n.frequency? => node.querySelector \feTurbulence .setAttribute \baseFrequency, n.frequency
  dom: (config) ->

if module? => module.exports = ret
