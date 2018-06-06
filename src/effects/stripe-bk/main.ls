ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#de530f
    stripe: name: 'Stripe Color', type: \color, default: \#700f0f
  watch: (n,o, node) ->
    if n.stripe? => node.querySelector \feFlood .setAttribute \flood-color, n.stripe
    if n.fill != o.fill => node.querySelector \text .setAttribute \fill, n.fill

  dom: (config) ->

if module? => module.exports = ret
