ret = do
  debug: true
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: {}
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('feFlood')).map (d,i) ->
      if i >= 3 => return
      d.setAttribute('flood-color', n["color" + (i + 1)])

  dom: (config) ->

if module? => module.exports = ret
