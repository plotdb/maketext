ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#444
    redfilter: name: 'Red Filter', type: \color, default: \#f00
    bluefilter: name: 'Blue Filter', type: \color, default: \#00f
    offsetX: name: 'offset X', type: \number, default: 5, min: -20, max: 20
    offsetY: name: 'offset Y', type: \number, default: 1, min: -20, max: 20
  watch: (n, o, node) ->
    if n.fill != o.fill => node.querySelector('text').setAttribute \fill, n.fill
    node.querySelectorAll('feFlood').0.setAttribute \flood-color, n.redfilter
    node.querySelectorAll('feFlood').1.setAttribute \flood-color, n.bluefilter
    offsets = node.querySelectorAll('feOffset')
    if n.offsetX =>
      offsets.0.setAttribute \dx, n.offsetX
      offsets.1.setAttribute \dx, -n.offsetX
    if n.offsetY =>
      offsets.0.setAttribute \dy, -n.offsetY
      offsets.1.setAttribute \dy, n.offsetY

  dom: (config) ->

if module? => module.exports = ret
