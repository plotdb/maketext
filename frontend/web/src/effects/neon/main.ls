# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    if n.color? =>
      c2 = d3.hcl(n.color).brighter(3).hex!
      node.querySelector(\text).setAttribute(\stroke, c2)
      Array.from(node.querySelectorAll(\feFlood)).map((d,i)->
        d.setAttribute \flood-color, n.color
      )
    if n.stroke? =>
      node.querySelector(\text).setAttribute(\stroke-width, n.stroke)
