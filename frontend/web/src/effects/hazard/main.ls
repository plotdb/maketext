# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n, o, node) ->
    if n.stripe? => node.querySelector(\rect.a).setAttribute \fill, n.stripe
    if n.dark? =>
      node.querySelector(\rect.b).setAttribute \fill, n.dark
      node.querySelector(\text).setAttribute \stroke, n.dark
