ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \fill, type: \color, default: \#f00
    color2: name: \stroke, type: \color, default: \#0f0
    color3: name: \extrusion, type: \color, default: \#00f
    color4: name: 'inner shadow', type: \color, default: \#00f
    color5: name: \shadow, type: \color, default: \#00f
  watch: (n,o, node) ->
    floods = node.querySelectorAll('feFlood')
    if n.color3? => floods.0.setAttribute \flood-color, n.color3 # extrude color
    if n.color4? => floods.1.setAttribute \flood-color, n.color4 # inner shadow
    if n.color1? => floods.2.setAttribute \flood-color, n.color1 # main color
    if n.color5? => floods.4.setAttribute \flood-color, n.color5 # shadow color
    if n.color2 != o.color2 => node.querySelectorAll('text').1.setAttribute \stroke, n.color2 # stroke color

  dom: (config) ->

if module? => module.exports = ret
