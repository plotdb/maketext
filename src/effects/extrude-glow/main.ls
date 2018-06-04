ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#eb6c6c
    extrusion: name: \extrusion, type: \color, default: \#333333
    shadow: name: \shadow, type: \color, default: \#000000
  watch: (n,o, node) ->
    if n.fill != o.fill => node.querySelector('text').setAttribute \fill, n.fill
    if n.extrusion => node.querySelectorAll('feFlood').0.setAttribute \flood-color, n.extrusion
    if n.shadow => node.querySelectorAll('feFlood').1.setAttribute \flood-color, n.shadow
  dom: (config) ->

if module? => module.exports = ret
