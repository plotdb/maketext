# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    flood = Array.from(node.querySelectorAll('feFlood'))
    if n.fill? => flood.0.setAttribute \flood-color, n.fill
    if n.stroke? => flood.1.setAttribute \flood-color, n.stroke
    if n.inner-fill? =>
      node.querySelector \feImage
        .setAttributeNS \http://www.w3.org/1999/xlink, \href, "data:image/svg+xml;base64," + btoa("""
      <svg xmlns="http://www.w3.org/2000/svg" width="1000px" height="4px" viewBox="0 0 1000 4">
      <rect fill="#{n.inner-fill}" width="1000" height="2"/>
      </svg> 
      """)
