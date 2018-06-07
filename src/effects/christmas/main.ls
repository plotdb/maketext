ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#fff
    color2: name: \color2, type: \color, default: \#f99
  watch: (n,o, node) ->
    node.querySelector \feImage .setAttribute \href, """
    data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><rect x="-1" y="-1" width="12" height="12" fill="#{n.color1}"/><path d="M0 0L10 10M-10 0 L0 10M0 -10L10 0" stroke-linecap="round" stroke="#{n.color2}" stroke-width="3"/></svg>"""

  dom: (config) ->

if module? => module.exports = ret
