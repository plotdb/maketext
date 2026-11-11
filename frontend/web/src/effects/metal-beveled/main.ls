# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    if n.light? => node.querySelector("feSpecularLighting").setAttribute \lighting-color, n.light
    if n.fill != o.fill => node.querySelector("text").setAttribute \fill, n.fill
