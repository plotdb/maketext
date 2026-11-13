# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n, o, node) ->
    if n.fill? =>
      node.querySelector(\text.outer).setAttribute \fill, n.fill
      node.querySelector(\text.outer).setAttribute \stroke, n.fill
      node.querySelector(\text.face).setAttribute \fill, n.fill
    if n.gap? => node.querySelector(\text.gap).setAttribute \stroke, n.gap
