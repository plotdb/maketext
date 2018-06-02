ret = do
  debug: true
  name: 'Beveled'
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: {}
  watch: (n,o, node) ->
    node.querySelector('text').style.fill = n["color1"]
    node.querySelector('feSpecularLighting').setAttribute('lighting-color', n["color2"])
  dom: (config) ->

if module? => module.exports = ret
