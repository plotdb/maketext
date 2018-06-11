ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    color1: name: \color1, type: \color, default: \#fff
    color2: name: \color2, type: \color, default: \#f00
  watch: (n,o, node) ->
    node.querySelector \feImage .setAttributeNS \http://www.w3.org/1999/xlink, \href, """
    data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1000px" height="1000px"><defs><pattern id="pattern" patternUnits="userSpaceOnUse" width="10" height="10"><rect x="0" y="0" width="10" height="10" fill="#{n.color1}"/><path d="M-10 -10L30 30M0 -10L40 30M-10 0L30 40" stroke="#{n.color2}" stroke-width="3"/></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(\#pattern)"/></svg>
    """
  dom: (config) ->

if module? => module.exports = ret
