# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    if n.base? => node.querySelector(\text).setAttribute(\fill, n.base)
    if n.texture? => node.querySelector(\feFlood).setAttribute(\flood-color, n.texture)
    if n.clarity? => node.querySelector(\feGaussianBlur).setAttribute("stdDeviation", 5 - +n.clarity)
    if n.grain? => node.querySelector(\feTurbulence).setAttribute("baseFrequency", n.grain)
    if n.scale? => node.querySelector(\feDisplacementMap).setAttribute("scale", n.scale)

    text = node.querySelector(\text)
    text.style.display = \inline-block
    setTimeout (-> text.style.display = \block), 0
