# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    if n.stripe? => node.querySelector \feFlood .setAttribute \flood-color, n.stripe
    if n.fill != o.fill => node.querySelector \text .setAttribute \fill, n.fill
    if n.density? =>
      [w, w2, s] = [n.density, n.density * 2, n.density * 0.25]
      d = [
        \M, -w, -w, \L, w2, w2
        \M, -w2, -w, \L, w, w2
        \M, -w, -w2, \L, w2, w
      ].join(' ')
      code = btoa """<svg xmlns="http://www.w3.org/2000/svg" width="2000px" height="1000px"><defs><pattern id="pattern" patternUnits="userSpaceOnUse" x="0" y="0" width="#w" height="#w"><path d="#d" stroke="#000" stroke-width="#s"/></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(\#pattern)"/></svg>"""
      node.querySelector \feImage
        .setAttributeNS \http://www.w3.org/1999/xlink, \href, "data:image/svg+xml;base64,#code"
