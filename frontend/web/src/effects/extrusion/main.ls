# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    if n.fill != o.fill => node.querySelector('text').setAttribute \fill, n.fill
    if n.extrusion? => node.querySelector('feFlood').setAttribute \flood-color, n.extrusion
    if n.offset =>
      node.querySelector('feOffset')
        ..setAttribute(\dx, n.offset * 0.5)
        ..setAttribute(\dy, n.offset * 0.5)
      conv = node.querySelector 'feConvolveMatrix'
      conv.setAttribute \order, "#{n.offset},#{n.offset}"
      conv.setAttribute(\kernelMatrix, [i for i from 0 til n.offset].map((i)-> 
        [j for j from 0 til n.offset].map((j)-> if i == j => 1 else 0).join(' ')
      ).join(' '))
