ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#f00
    color2: name: \color2, type: \color, default: \#f00
  watch: (n,o, node) ->
    if n["color1"] => node.querySelector('text').setAttribute \fill, n["color1"]
    if n["color2"] => node.querySelector('feFlood').setAttribute \flood-color, n["color2"]
    node.querySelector('text').setAttribute('stroke', n["color2"])
    node.querySelector('text').setAttribute('stroke-width', 0)
  dom: (config) ->

if module? => module.exports = ret
