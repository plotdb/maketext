# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('feFlood')).map (d,i) ->
      if i >= 3 => return
      if n["color" + (i + 1)]? => d.setAttribute('flood-color', n["color" + (i + 1)])
    if n.seed? =>
      Array.from(node.querySelectorAll('*[seed]')).map (d,i) ->
        d.setAttribute \seed, n.seed + i
