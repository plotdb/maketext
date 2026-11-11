# 參數 ( effect.yaml 的 edit ) 變化時更新 svg. n: 新的參數值, o: 舊的參數值, node: 效果的 svg 容器
module.exports = do
  watch: (n,o, node) ->
    image = node.querySelector \feImage
    box = node.querySelector \text .getBBox!

    [w, h] = [box.width, box.height]
    [x1,y1] = [0,0]
    [x2,y2]= [box.width, box.height * 0.45]
    [xc,yc] = [box.width * 0.5, box.height * 0.65]

    image.setAttributeNS \http://www.w3.org/1999/xlink, \href, "data:image/svg+xml;base64," + btoa """
    <svg xmlns="http://www.w3.org/2000/svg" width="#{w}px" height="#{h}px" viewBox="0 0 #w #h">
    <defs>
      <linearGradient id="reflect-gradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#{n.reflect}" stop-opacity="0.0"/>
        <stop offset="0.3" stop-color="#{n.reflect}" stop-opacity="0.0"/>
        <stop offset="1" stop-color="#{n.reflect}" stop-opacity="0.9"/>
      </linearGradient>
    </defs>
    <path d="M#x1 #y1 L#x1 #y2 Q#xc #yc #x2 #y2 L#x2 #y1 Z" fill="url(\#reflect-gradient)"/>
    </svg>
    """

    if n.reflect? => Array.from(node.querySelectorAll('stop')).map -> it.setAttribute \stop-color, n.reflect
    if n.fill != o.fill => node.querySelector \text .setAttribute \fill, n.fill
    if n.shadow? => node.querySelector \feFlood .setAttribute \flood-color, n.shadow
