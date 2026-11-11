ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#ffd800
    shadow: name: \shadow, type: \color, default: \#2d1500
    side: name: 'side color', type: \color, default: \#894619
  watch: (n,o, node) ->
    flood = Array.from(node.querySelectorAll \feFlood)
    if n.fill != o.fill => node.querySelector \text .setAttribute \fill, n.fill
    if n.shadow? => flood.0.setAttribute \flood-color, n.shadow
    if n.side? => flood.1.setAttribute \flood-color, n.side

  dom: (config) ->

if module? => module.exports = ret
