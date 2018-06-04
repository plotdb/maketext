ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color: name: "color", type: \color, default: \#f00
  watch: (n,o, node) ->
    if n.color => node.querySelector('feFlood').setAttribute(\flood-color, n.color)
  dom: (config) ->

if module? => module.exports = ret
