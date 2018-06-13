
window.convert = do
  prepare: -> new Promise (res, rej) ->
    svg = document.querySelector '#cooltext svg' .cloneNode true
    svg-width = document.querySelector '#cooltext' .getBoundingClientRect!width
    text-box = document.querySelector '#cooltext text' .getBoundingClientRect!
    svg.setAttribute \width, "#{svg-width}px"
    svg.setAttribute \height, \170px
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
      dominant-baseline: central;
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
    fontSize = getComputedStyle(text).fontSize
    fontSize = +(/(\d+)/.exec(fontSize) or [0,64]).1
    text-value = text.textContent or 'Hello World'
    d = tts.getD text-value, {fontSize}
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
    pbox = path.getBBox!
    box = {width: text-box.width * 1.2 + 20, height: text-box.height * 1.2 + 20}
    x = ( box.width - pbox.width ) * 0.5 - pbox.x
    y = ( box.height - pbox.height ) * 0.5 - pbox.y
    g2.setAttribute("transform", "translate(#x, #y)")
    svg.setAttribute \viewBox, "0 0 #{box.width} #{box.height}"
    svg.setAttribute \width, "#{box.width}px"
    svg.setAttribute \height, "#{box.height}px"
    res {svg: svg, text: text-value, width: box.width, height: box.height} #svg-width}

  download: (option = {}) ->
    $(\#download).modal \show

    if option.blob => blob = that
    else if option.content => blob = new Blob [option.content], {type: option.type}
    else null
    url = URL.createObjectURL blob
    document.querySelector('#download img').setAttribute \src, url
    document.querySelector('#download .result').style.height = "#{option.height}px"
    document.querySelector('#download .btn')
      ..setAttribute \href, url
      ..setAttribute \download, "#{option.name or 'output'}.#{option.postfix or 'png'}"

  svg: ->
    @prepare!
      .then ({svg, text, width, height}) ~>
        @download {width, height, content: svg.outerHTML, type: 'image/svg+xml', name: text, postfix: \svg}
  png: ->
    [text-value, box] = ['', {width: 500, height: 150}]
    @prepare!
      .then ({svg, text, width, height}) ->
        text-value := text
        box <<< {width, height}
        smiltool.svg-to-dataurl svg.outerHTML
      .then -> smiltool.url-to-dataurl it, box.width, box.height
      .then -> smiltool.dataurl-to-blob it
      .then ~> @download {width: box.width, height: box.height, blob: it, name: text-value, postfix: \png}
