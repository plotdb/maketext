# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n, o, node) ->
    flood = Array.from(node.querySelectorAll \feFlood)
    if n.fill? => node.querySelector(\text).setAttribute \fill, n.fill
    if n.flame? =>
      flood.0.setAttribute \flood-color, n.flame
      # 外焰: 火焰色暗一階
      flood.1.setAttribute \flood-color, d3.hcl(n.flame).darker(1).hex!
    if n.core? => flood.2.setAttribute \flood-color, n.core
