ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color: name: \color, type: \color, default: \#444
  watch: (n,o, node) ->
    node.querySelector('text').style.fill = n.color
  dom: (config) ->

if module? => module.exports = ret
