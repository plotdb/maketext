ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \shadow, type: \color, default: \#a0d5ff
    color2: name: \sparkling, type: \color, default: 'rgba(100%,100%,100%,0.34)'
    color3: name: \fill, type: \color, default: \#0067ff
    seed: name: 'Random Seed', type: \number, default: 1, min: 1, max: 100, step: 1
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('feFlood')).map (d,i) ->
      if i >= 3 => return
      if n["color" + (i + 1)]? => d.setAttribute('flood-color', n["color" + (i + 1)])
    if n.seed? =>
      Array.from(node.querySelectorAll('*[seed]')).map (d,i) ->
        d.setAttribute \seed, n.seed + i
  dom: (config) ->

if module? => module.exports = ret
