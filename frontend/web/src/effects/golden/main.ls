ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#f7c61d
    reflect: name: \reflect, type: \color, default: \#fff694
    shadow: name: \shadow, type: \color, default: \#806527
  watch: (n,o, node) ->
    flood = Array.from(node.querySelectorAll \feFlood )
    if n.fill != o.fill => node.querySelector \text .setAttribute \fill, n.fill
    if n.shadow? => flood.0.setAttribute \flood-color, n.shadow
    if n.reflect? => flood.1.setAttribute \flood-color, n.reflect
  dom: (config) ->

if module? => module.exports = ret
