# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n, o, node) ->
    stops = Array.from(node.querySelectorAll \stop)
    if n.sky? => stops.1.setAttribute \stop-color, n.sky
    if n.ground? => stops.4.setAttribute \stop-color, n.ground
    if n.glow? => node.querySelector(\feFlood).setAttribute \flood-color, n.glow
