# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    node.querySelectorAll('feFlood').0.setAttribute \flood-color, n.color1
    node.querySelectorAll('feFlood').1.setAttribute \flood-color, n.color2
