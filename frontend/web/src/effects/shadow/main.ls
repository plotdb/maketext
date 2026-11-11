# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    gradients = node.querySelectorAll('linearGradient')
    Array.from(gradients.0.querySelectorAll('stop')).map (d,i) -> d.setAttribute \stop-color, n.shadow
    Array.from(gradients.1.querySelectorAll('stop')).map (d,i) -> d.setAttribute \stop-color, n["color#{i + 1}"]
    angle = n.direction or 0
    dx = Math.cos(angle * Math.PI / 180)
    dy = Math.sin(angle * Math.PI / 180)
    [x1, y1] = [0.5 - dx, 0.5 - dy]
    [x2, y2] = [0.5 + dx, 0.5 + dy]
    gradients.1
      ..setAttribute \x1, x1
      ..setAttribute \y1, y1
      ..setAttribute \x2, x2
      ..setAttribute \y2, y2
    if n.thick? => Array.from(node.querySelectorAll \feMorphology).map -> it.setAttribute \radius, n.thick
    dx = -n.fontSize * 0.3 + n.offsetx
    dy = n.offsety
    node.querySelectorAll \g .1 .setAttribute \transform, "translate(#dx, #dy)"
    Array.from(node.querySelectorAll \feGaussianBlur).map (d,i) ->
      d.setAttribute \stdDeviation, n.stddev / (i + 1)
