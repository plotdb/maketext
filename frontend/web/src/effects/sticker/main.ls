# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    if n.color1 => node.querySelectorAll('stop').0.setAttribute \stop-color, n.color1
    if n.color2 => node.querySelectorAll('stop').1.setAttribute \stop-color, n.color2
    if n.color3 => node.querySelector('text').setAttribute \stroke, n.color3
    if n.stroke? => node.querySelector('text').setAttribute \stroke-width, n.stroke
    angle = n.direction or 0
    dx = Math.cos(angle * Math.PI / 180) * 0.3
    dy = Math.sin(angle * Math.PI / 180) * 0.3
    [x1, y1] = [0.5 - dx, 0.5 - dy]
    [x2, y2] = [0.5 + dx, 0.5 + dy]
    node.querySelector('linearGradient')
      ..setAttribute \x1, x1
      ..setAttribute \y1, y1
      ..setAttribute \x2, x2
      ..setAttribute \y2, y2
