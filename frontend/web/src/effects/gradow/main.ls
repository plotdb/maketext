# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('stop')).map (d,i) -> d.setAttribute \stop-color, n["color#{i + 1}"]
    box = node.querySelector \text .getBBox!
    angle = n.direction or 0
    dx = Math.cos(angle * Math.PI / 180) * 0.5
    dy = Math.sin(angle * Math.PI / 180) * 0.5
    [x1, y1] = [0.5 - dx, 0.5 - dy]
    [x2, y2] = [0.5 + dx, 0.5 + dy]
    node.querySelector('linearGradient')
      ..setAttribute \x1, x1
      ..setAttribute \y1, y1
      ..setAttribute \x2, x2
      ..setAttribute \y2, y2
    if n.shadow? => node.querySelector(\feFlood).setAttribute(\flood-color, n.shadow)
    if n.offset-x? => Array.from(node.querySelectorAll(\feOffset)).map (d,i) ->
      d.setAttribute("dx", n.offset-x * (if i => 1 else -1))
    if n.offset-y? => Array.from(node.querySelectorAll(\feOffset)).map (d,i) ->
      d.setAttribute("dy", n.offset-y * (if i => 1 else -1))
