ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color, type: \color, default: \#f00
    color2: name: \outline, type: \color, default: \#f00
  watch: (n,o, node) ->
    node.querySelector('text').setAttribute('fill', n.color)
    node.querySelector('feFlood').setAttribute('flood-color', n.outline)
    node.querySelector('text')
      ..setAttribute('stroke', n.outline)
      ..setAttribute('stroke-width', 0)

  dom: (config) ->

if module? => module.exports = ret
