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
    offset: name: \offset, type: \number, default: 3, min: 0, max: 16
  watch: (n,o, node) ->
    if n.fill != o.fill => node.querySelector('text').setAttribute \fill, n.fill
    if n.extrusion => node.querySelectorAll('feFlood').0.setAttribute \flood-color, n.extrusion
    if n.shadow => node.querySelectorAll('feFlood').1.setAttribute \flood-color, n.shadow
    if n.offset? =>
      matrix = node.querySelector('feConvolveMatrix')
      offsets = node.querySelectorAll('feOffset')
      offsets.0.setAttribute \dx, -n.offset
      offsets.1.setAttribute \dx, -n.offset * 1.5
      matrix.setAttribute \order, "#{n.offset},#{n.offset}"
      matrix.setAttribute(\kernelMatrix, [i for i from 0 til n.offset].map((i) ->
        [j for j from 0 til n.offset].map((j) -> if i == Math.floor(n.offset * 0.5) => 1 else 0).join(' ')
      ).join(' '))
  dom: (config) ->

if module? => module.exports = ret
