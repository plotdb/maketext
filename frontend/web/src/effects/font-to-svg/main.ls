# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. fill opacity 為 0 時只剩外框 ( 給切割機用 ),
# 此時外框寬度至少 1, 才不會什麼都看不到
module.exports = do
  watch: (n, o, node) ->
    if !(text = node.querySelector \text) => return
    sw = +n.strokeWidth or 0
    if !(+n.fillOpacity) and !sw => sw = 1
    text.setAttribute \fill, n.fill or '#222'
    text.setAttribute \fill-opacity, (if n.fillOpacity? => n.fillOpacity else 1)
    text.setAttribute \stroke, n.stroke or '#000'
    text.setAttribute \stroke-width, sw
