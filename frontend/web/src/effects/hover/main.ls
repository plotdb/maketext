# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    if n.fill? => node.querySelector(\text).setAttribute(\fill, n.fill)
    if n.shadow? => node.querySelector(\feFlood).setAttribute(\flood-color, n.shadow)
    if n.offset-x? => Array.from(node.querySelectorAll(\feOffset)).map (d,i) ->
      d.setAttribute("dx", n.offset-x * (if i => 1 else -1))
    if n.offset-y? => Array.from(node.querySelectorAll(\feOffset)).map (d,i) ->
      d.setAttribute("dy", n.offset-y * (if i => 1 else -1))
