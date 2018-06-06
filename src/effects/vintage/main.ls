ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#f00
    stroke: name: \stroke, type: \color, default: \#fff
    extrusion: name: \extrusion, type: \color, default: \#900
    inner-shadow: name: 'inner shadow', type: \color, default: \#000
    shadow: name: \shadow, type: \color, default: \#444
    depth: name: \depth, type: \number, default: 9, min: 1, max: 13
  watch: (n,o, node) ->
    floods = node.querySelectorAll('feFlood')
    if n.extrusion? => floods.0.setAttribute \flood-color, n.extrusion # extrude color
    if n.inner-shadow? => floods.1.setAttribute \flood-color, n.inner-shadow # inner shadow
    if n.fill != o.fill => floods.2.setAttribute \flood-color, n.fill # main color
    if n.shadow? => floods.4.setAttribute \flood-color, n.shadow # shadow color
    if n.stroke != o.stroke => node.querySelectorAll('text').1.setAttribute \stroke, n.stroke # stroke color
    if n.depth? =>
      convs = node.querySelectorAll \feConvolveMatrix
      offset = node.querySelectorAll \feOffset
      matrix = [(if i == j => 1 else 0) for i from 0 til n.depth for j from 0 til n.depth]
      order = "#{n.depth},#{n.depth}"
      [0,2].map ->
        convs[it]
          ..setAttribute \kernelMatrix, matrix
          ..setAttribute \order, order
        offset[it]
          ..setAttribute \dx, Math.ceil(n.depth * 0.5) * (it + 1)
          ..setAttribute \dy, Math.ceil(n.depth * 0.5) * (it + 1)
      d = n.depth * -1
      node.querySelector(\g).setAttribute \transform, "translate(#d,#d)"


  dom: (config) ->

if module? => module.exports = ret
