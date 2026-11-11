# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    if n.fill? => node.querySelector(\text).setAttribute(\fill, n.fill)
    if n.stroke? => node.querySelector(\text).setAttribute(\stroke, n.stroke)
    if n.inner-shadow? => node.querySelector(\feFlood).setAttribute(\flood-color, n.inner-shadow)
    if n.reflect? => node.querySelector(\feSpecularLighting).setAttribute(\lighting-color, n.reflect)
    text = node.querySelector(\text)
    text.style.display = \inline-block
    setTimeout (-> text.style.display = \block), 0
