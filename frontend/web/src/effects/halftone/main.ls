# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    Array.from(node.querySelectorAll('stop')).map (d,i) ->
      if n["color" + (3 - i)]? => d.setAttribute('stop-color', n["color" + (3 - i)])
    r = n.size or 3
    p = (if n.spacing? => n.spacing else 1)
    d = r * 2 + p
    c = r + p * 0.5

    node.querySelector \feImage
      ..setAttributeNS \http://www.w3.org/1999/xlink, \href, "data:image/svg+xml;base64," + btoa """
        <svg xmlns="http://www.w3.org/2000/svg" width="1000px" height="1000px">
          <defs>
            <pattern id="pattern" patternUnits="userSpaceOnUse" width="#d" height="#d">
              <circle cx="#{c}" cy="#{c}" r="#{r}" fill="red"/>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(\#pattern)"/>
        </svg>
        """
      ..setAttribute \width, "1000px"
      ..setAttribute \height, "1000px"

    angle = n.direction or 0
    dx = Math.cos(angle * Math.PI / 180) * 0.3
    dy = Math.sin(angle * Math.PI / 180) * 0.3
    [x1, y1] = [0.5 - dx, 0.5 - dy]
    [x2, y2] = [0.5 + dx, 0.5 + dy]
    node.querySelector('linearGradient')
      ..setAttribute \x1, x1
      ..setAttribute \y1, y1
      ..setAttribute \x2, x2
      ..setAttribute \y2, y2
