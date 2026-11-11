ret = do
  name: 'Extrusion'
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#ccc
    extrusion: name: \extrusion, type: \color, default: \#444
    offset: name: \offset, type: \number, default: 8, min: 0, max: 16
  watch: (n,o, node) ->
    if n.fill != o.fill => node.querySelector('text').setAttribute \fill, n.fill
    if n.extrusion? => node.querySelector('feFlood').setAttribute \flood-color, n.extrusion
    if n.offset =>
      node.querySelector('feOffset')
        ..setAttribute(\dx, n.offset * 0.5)
        ..setAttribute(\dy, n.offset * 0.5)
      conv = node.querySelector 'feConvolveMatrix'
      conv.setAttribute \order, "#{n.offset},#{n.offset}"
      conv.setAttribute(\kernelMatrix, [i for i from 0 til n.offset].map((i)-> 
        [j for j from 0 til n.offset].map((j)-> if i == j => 1 else 0).join(' ')
      ).join(' '))
      
  dom: (config) ->

if module? => module.exports = ret
