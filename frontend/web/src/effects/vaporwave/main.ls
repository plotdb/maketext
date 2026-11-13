# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n, o, node) ->
    stops = node.querySelectorAll \stop
    if n.top? => stops.0.setAttribute \stop-color, n.top
    if n.bottom? => stops.1.setAttribute \stop-color, n.bottom
    if n.shadow? => node.querySelector(\text.shadow).setAttribute \fill, n.shadow
