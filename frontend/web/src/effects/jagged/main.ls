# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    if n.color? => node.querySelector('text').style.fill = n.color
    if n.freq? => node.querySelector('feTurbulence').setAttribute \baseFrequency, n.freq
    if n.scale? =>
      d = n.scale * -0.25
      node.querySelector('feDisplacementMap').setAttribute \scale, n.scale
      node.querySelector('text').setAttribute \transform, "translate(#d,#d)"
