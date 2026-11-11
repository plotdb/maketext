# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n, o, node) ->
    if n.fill != o.fill => node.querySelector('text').setAttribute \fill, n.fill
    node.querySelectorAll('feFlood').0.setAttribute \flood-color, n.redfilter
    node.querySelectorAll('feFlood').1.setAttribute \flood-color, n.bluefilter
    offsets = node.querySelectorAll('feOffset')
    if n.offsetX =>
      offsets.0.setAttribute \dx, n.offsetX
      offsets.1.setAttribute \dx, -n.offsetX
    if n.offsetY =>
      offsets.0.setAttribute \dy, -n.offsetY
      offsets.1.setAttribute \dy, n.offsetY
