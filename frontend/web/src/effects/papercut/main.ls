# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n, o, node) ->
    flood = Array.from(node.querySelectorAll \feFlood)
    if n.fill? => node.querySelector(\text).setAttribute \fill, n.fill
    for i in [1 2 3] when n["layer#i"]? => flood[i - 1].setAttribute \flood-color, n["layer#i"]
