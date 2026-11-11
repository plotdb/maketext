ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#ffd5af
    shadow: name: \shadow, type: \color, default: \#052b4a
    offset-x: name: 'offset x', type: \number, default: 4, min: -50, max: 50, step: 0.1
    offset-y: name: 'offset y', type: \number, default: 4, min: -50, max: 50, step: 0.1
    background: default: \#596886
  watch: (n,o, node) ->
    if n.fill? => node.querySelector(\text).setAttribute(\fill, n.fill)
    if n.shadow? => node.querySelector(\feFlood).setAttribute(\flood-color, n.shadow)
    if n.offset-x? => Array.from(node.querySelectorAll(\feOffset)).map (d,i) ->
      d.setAttribute("dx", n.offset-x * (if i => 1 else -1))
    if n.offset-y? => Array.from(node.querySelectorAll(\feOffset)).map (d,i) ->
      d.setAttribute("dy", n.offset-y * (if i => 1 else -1))

  dom: (config) ->

if module? => module.exports = ret
