ret = do
  name: ''
  desc: ''
  tags: ''
  slug: ''
  init: ->
  edit: do
    fill: name: \fill, type: \color, default: \#663300
    stroke: name: \stroke, type: \color, default: \#D7A500
    inner-fill: name: "Inner Fill", type: \color, default: \#9f6b00
  watch: (n,o, node) ->
    flood = Array.from(node.querySelectorAll('feFlood'))
    if n.fill? => flood.0.setAttribute \flood-color, n.fill
    if n.stroke? => flood.1.setAttribute \flood-color, n.stroke
    if n.inner-fill? =>
      node.querySelector \feImage .setAttribute \href, """
      data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="10px" height="4px">
      <rect fill="#{n.inner-fill}" width="10" height="2"/>
      </svg> 
      """

  dom: (config) ->

if module? => module.exports = ret
