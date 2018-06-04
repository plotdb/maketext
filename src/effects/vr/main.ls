ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#f00
    color2: name: \color2, type: \color, default: \#0f0
    color3: name: \color3, type: \color, default: \#00f
  watch: (n, o, node) ->
    if n.color1 != o.color1 => node.querySelector('text').setAttribute \fill, n.color1
    node.querySelectorAll('feFlood').0.setAttribute \flood-color, n.color2
    node.querySelectorAll('feFlood').1.setAttribute \flood-color, n.color3

  dom: (config) ->

if module? => module.exports = ret
