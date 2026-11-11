# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    if n.fill != o.fill => node.querySelector(\text).setAttribute(\fill, n.fill)
    if n.shadow? => node.querySelector(\feFlood).setAttribute(\flood-color, n.shadow)
