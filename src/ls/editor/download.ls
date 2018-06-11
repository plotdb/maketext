
window.convert = do
  prepare: -> new Promise (res, rej) ->
    svg = document.querySelector '#cooltext svg' .cloneNode true
    svg.setAttribute(\width, '600px')
    svg.setAttribute(\height, '170px')
    feImages = Array.from( svg.querySelectorAll \feImage )
      .map (d,i) ->
        href = d.getAttributeNS(\http://www.w3.org/1999/xlink, \href) or d.getAttribute(\href)
        ret = /^(data:image\/svg\+xml[^,]*?),([^]+)$/gm.exec(href)
        if ret and !/base64/.exec(ret.1) =>
          href = "#{ret.1};base64,#{btoa(ret.2)}"
          d.setAttributeNS \http://www.w3.org/1999/xlink, \href, href

    style = document.createElement("style")
    style.textContent = """
    text {
      font-size: 64px;
      font-family: Arial Black;
      dominant-baseline: middle;
      text-anchor: middle;
    }
    """
    svg.appendChild(style)
    node = document.querySelector('#svg-work-area') 
    if !node =>
      node = document.createElement("div")
      node.setAttribute(\id, 'svg-work-area')
      document.body.appendChild(node)
    node.appendChild(svg)

    (e, tts) <~ text-to-svg.load "/assets/fonts/ttf/#{window.fontname or 'ArialBlack'}-Regular.ttf"
    (text, i) <~ Array.from(svg.querySelectorAll(\text)).map _
    text = svg.querySelector('text')
    text-value = text.textContent or 'Hello World'
    d = tts.getD text-value
    g1 = document.createElementNS("http://www.w3.org/2000/svg", "g")
    g2 = document.createElementNS("http://www.w3.org/2000/svg", "g")
    path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    parent = text.parentNode
    path.setAttribute \d, d
    for name in <[fill stroke stroke-width]> =>
      if text.getAttribute(name) => path.setAttribute name, that
    parent.insertBefore(g1, text)
    # put path in two g, one for filter, one for transform.
    # this can fix some issue in firefox / safari when using feImage
    g1.appendChild(g2)
    g2.appendChild(path)
    g1.setAttribute \filter, text.getAttribute(\filter)
    parent.removeChild(text)
    [pbox, box] = [path.getBBox!, {width: 500, height: 150}]
    x = ( box.width - pbox.width ) * 0.5 - pbox.x
    y = ( box.height - pbox.height ) * 0.5 - pbox.y
    g2.setAttribute("transform", "translate(#x, #y)")
    res {svg: svg, text: text-value}

  download: (option = {}) ->
    $(\#download).modal \show

    if option.blob => blob = that
    else if option.content => blob = new Blob [option.content], {type: option.type}
    else null
    url = URL.createObjectURL blob
    document.querySelector('#download .result')
      ..style.backgroundImage = "url(#{url})"
    document.querySelector('#download .btn')
      ..setAttribute \href, url
      ..setAttribute \download, "#{option.name or 'output'}.#{option.postfix or 'png'}"

  svg: ->
    @prepare!
      .then ({svg, text}) ~>
        @download {content: svg.outerHTML, type: 'image/svg+xml', name: text, postfix: \svg}
  png: ->
    text-value = ''
    @prepare!
      .then ({svg, text}) ->
        text-value := text
        smiltool.svg-to-dataurl svg.outerHTML
      .then -> smiltool.url-to-dataurl it, 600, 170
      .then -> smiltool.dataurl-to-blob it
      .then ~> @download {blob: it, name: text-value, postfix: \png}
