# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    node.querySelector('text').style.fill = n["color1"]
    node.querySelector('feSpecularLighting').setAttribute('lighting-color', n["color2"])
