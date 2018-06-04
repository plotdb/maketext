ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#a0d5ff
    color2: name: \color2, type: \color, default: 'rgba(51.266%,81.812%,87.142%,0.34)'
    color3: name: \color3, type: \color, default: \#0067ff
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('feFlood')).map (d,i) ->
      if i >= 3 => return
      d.setAttribute('flood-color', n["color" + (i + 1)])
  dom: (config) ->

if module? => module.exports = ret
