ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#ccc
    shadow: name: \shadow, type: \color, default: \#000
  watch: (n,o, node) ->
    if n.fill != o.fill => node.querySelector(\text).setAttribute(\fill, n.fill)
    if n.shadow? => node.querySelector(\feFlood).setAttribute(\flood-color, n.shadow)
  dom: (config) ->

if module? => module.exports = ret
