ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#ddd
    color2: name: \color2, type: \color, default: \#666
    color3: name: \color3, type: \color, default: \#000
  watch: (n,o, node) ->
    if n.color1? => node.querySelectorAll('feFlood').0.setAttribute('flood-color', n.color1)
    if n.color2? => node.querySelectorAll('feFlood').1.setAttribute('flood-color', n.color2)
    if n.color3 != o.color3 => node.querySelector('text').setAttribute('fill', n.color3)
  dom: (config) ->

if module? => module.exports = ret
