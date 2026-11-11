ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#fff
    stroke: name: \stroke, type: \color, default: \#000
    outline: name: \outline, type: \color, default: \#ff0
  watch: (n,o, node) ->
    flood = Array.from(node.querySelectorAll \feFlood)
    if n.fill != o.fill => node.querySelector \text .setAttribute \fill, n.fill
    if n.stroke? => flood.0.setAttribute \flood-color, n.stroke
    if n.outline? => flood.1.setAttribute \flood-color, n.outline

  dom: (config) ->

if module? => module.exports = ret
