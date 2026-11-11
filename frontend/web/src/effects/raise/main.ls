ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#ccc
    color2: name: \color2, type: \color, default: \#777
  watch: (n,o, node) ->
    node.querySelectorAll('feFlood').0.setAttribute \flood-color, n.color1
    node.querySelectorAll('feFlood').1.setAttribute \flood-color, n.color2
  dom: (config) ->

if module? => module.exports = ret
