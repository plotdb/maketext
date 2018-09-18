ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color: name: \color, type: \color, default: \#00ff2f
    stroke: name: \stroke, type: \number, default: 1, min: 0.1, max: 10, step: 0.1
  watch: (n,o, node) ->
    if n.color? =>
      c2 = d3.hcl(n.color).brighter(3).hex!
      node.querySelector(\text).setAttribute(\stroke, c2)
      Array.from(node.querySelectorAll(\feFlood)).map((d,i)->
        d.setAttribute \flood-color, n.color
      )
    if n.stroke? =>
      node.querySelector(\text).setAttribute(\stroke-width, n.stroke)

  dom: (config) ->

if module? => module.exports = ret
