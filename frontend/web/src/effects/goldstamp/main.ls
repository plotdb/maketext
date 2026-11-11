ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#999569
    outline: name: \outline, type: \color, default: \#797549
    width: name: "outline width", type: \number, default: 2, min: 1, max: 5
  watch: (n,o, node) ->
    if n.fill != o.fill => node.querySelector('text').setAttribute('fill', n.fill)
    if n.outline? => node.querySelector('feFlood').setAttribute('flood-color', n.outline)
    if n.width? => node.querySelector('feMorphology').setAttribute('radius', n.width)

  dom: (config) ->

if module? => module.exports = ret
