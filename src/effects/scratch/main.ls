ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#c2c2c2
    color2: name: \color2, type: \color, default: \#000
    color3: name: \color3, type: \color, default: \#000
  watch: (n,o, node) ->
    node.querySelectorAll('feFlood').0.setAttribute('flood-color', n.color1)
    node.querySelectorAll('feFlood').1.setAttribute('flood-color', n.color2)
    node.querySelector('text').setAttribute('fill', n.color3)
    node.querySelector('text').setAttribute('stroke', if n.color2 == o.color2 => n.color1 else n.color2)
    node.querySelector('text').setAttribute('stroke-width', 0)
  dom: (config) ->

if module? => module.exports = ret
