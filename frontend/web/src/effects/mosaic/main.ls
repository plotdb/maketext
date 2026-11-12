# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n, o, node) ->
    for i in [1 2 3] when n["color#i"]? =>
      Array.from(node.querySelectorAll "rect.c#i").map -> it.setAttribute \fill, n["color#i"]
