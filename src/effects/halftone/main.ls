ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#0ff
    color2: name: \color2, type: \color, default: \#f0f
    color3: name: \color3, type: \color, default: \#ff0
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('stop')).map (d,i) ->
      if n["color" + (3 - i)]? => d.setAttribute('stop-color', n["color" + (3 - i)])

  dom: (config) ->

if module? => module.exports = ret
