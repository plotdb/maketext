
window.convert = do
  prepare: -> new Promise (res, rej) ->
    svg = document.querySelector '#cooltext svg' .cloneNode true
    svg.setAttribute(\width, '500px')
    svg.setAttribute(\height, '150px')
    style = document.createElement("style")
    style.textContent = """
    text {
      font-size: 60px;
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
    text = svg.querySelector('text')
    text-value = text.textContent or 'Hello World'
    d = tts.getD text-value
    path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute \d, d
    for name in <[fill stroke stroke-width filter]> =>
      if text.getAttribute(name) => path.setAttribute name, that
    text.parentNode.insertBefore(path, text)
    text.parentNode.removeChild(text)
    [pbox, box] = [path.getBBox!, {width: 500, height: 150}]
    x = ( box.width - pbox.width ) * 0.5 - pbox.x
    y = ( box.height - pbox.height ) * 0.5 - pbox.y
    path.setAttribute("transform", "translate(#x, #y)")
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
      .then ->
        smiltool.url-to-dataurl it, 500, 150
      .then ->
        smiltool.dataurl-to-blob it
      .then ~>
        @download {blob: it, name: text-value, postfix: \png}
