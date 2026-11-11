ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#f00
    color2: name: \color2, type: \color, default: \#0f0
    color3: name: \color3, type: \color, default: \#00f
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('feFlood')).map (d,i) ->
      if i >= 3 => return
      d.setAttribute('flood-color', n["color" + (i + 1)])

  dom: (config) ->

if module? => module.exports = ret
