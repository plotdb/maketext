# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n, o, node) ->
    rect = Array.from(node.querySelectorAll \rect)
    if n.base? => rect.0.setAttribute \fill, n.base
    if n.stripe? => rect.1.setAttribute \fill, n.stripe
    if n.outline? => node.querySelector(\text).setAttribute \stroke, n.outline
