ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#444
    light: name: \light, type: \color, default: \#fff
  watch: (n,o, node) ->
    if n.light? => node.querySelector("feSpecularLighting").setAttribute \lighting-color, n.light
    if n.fill != o.fill => node.querySelector("text").setAttribute \fill, n.fill
  dom: (config) ->

if module? => module.exports = ret
