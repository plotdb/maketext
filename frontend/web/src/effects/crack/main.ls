# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    if n.color2 != o.color2 => node.querySelector \text .setAttribute \fill, n.color2
    if n.color1? => node.querySelector \feSpecularLighting .setAttribute \lighting-color, n.color1
    if n.shadow? => node.querySelector \feFlood .setAttribute \flood-color, n.shadow
    if n.frequency? => node.querySelector \feTurbulence .setAttribute \baseFrequency, n.frequency
