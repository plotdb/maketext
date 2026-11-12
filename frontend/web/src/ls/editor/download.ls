
# 正在編輯的效果實際使用的字型 ( font.ls: 使用者選的字型, 或效果自己的預設字型 ).
# 文字轉成 path 時用它的 opentype 字形外框,
# 介面同舊版用的 text-to-svg: getD(text, {fontSize}) 以 (0, 0) 為 baseline 起點
load-font = ->
  mt-font.of(editor.effects.type).then (f) -> f.getotf!
  .then (otf) ->
    getD: (text, {fontSize}) -> otf.getPath(text, 0, 0, fontSize).toPathData!

window.convert = do
  prepare: -> new Promise (res, rej) ->
    # 匯出範圍與倍率 ( layout.ls ): 文字外框加 padding, 拖曳的位移在範圍內移動文字
    live = document.querySelector '#cooltext svg'
    box = mt-frame.box(live) or {x: 0, y: 0, width: 500, height: 150}
    scale = +mt-frame.opt.scale or 1
    svg = live.cloneNode true
    if (n = svg.querySelector \.mt-crop) => n.remove!
    svg-width = document.querySelector '#cooltext' .getBoundingClientRect!width

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

    (tts) <- load-font!then _
    (text, i) <~ Array.from(svg.querySelectorAll(\text)).map _
    #text = svg.querySelector('text')

    textbox = text.getBBox!

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
    if text.getAttribute(\filter) => g1.setAttribute \filter, that
    parent.removeChild(text)
    pbox = path.getBBox!

    x = -path.getBBox!width * 0.5 - path.getBBox!x + textbox.width * 0.5 + textbox.x
    y = path.getBBox!height * 0.5                  + textbox.height * 0.5 + textbox.y

    g2.setAttribute("transform", "translate(#x, #y)")
    [width, height] = [box.width, box.height].map -> Math.round(it * scale)
    svg.setAttribute \viewBox, [box.x, box.y, box.width, box.height].join(' ')
    svg.setAttribute \preserveAspectRatio, \xMidYMid
    svg.setAttribute \width, "#{width}px"
    svg.setAttribute \height, "#{height}px"
    res {svg, text: text-value, width, height}

  download: (option = {}) ->
    $(\#download).modal \show

    if option.blob => blob = that
    else if option.content => blob = new Blob [option.content], {type: option.type}
    else null
    url = URL.createObjectURL blob
    document.querySelector('#download img').setAttribute \src, url
    document.querySelector('#download .btn')
      ..setAttribute \href, url
      ..setAttribute \download, "#{option.name or 'output'}.#{option.postfix or 'png'}"
    maketext.editor.fire \image.ready, {url} <<< option{name, type, dataurl}

  svg: ->
    mt-track \download, {format: \svg, effect: editor.effects.type}
    local = {}
    @prepare!
      .then (ret = {}) ~>
        local <<< ret{svg, text, width, height}
        smiltool.svg-to-dataurl """<?xml version="1.0" encoding="utf-8"?>#{local.svg.outerHTML}"""
      .then ~>
        @download {
          dataurl: it
          name: local.text, content: local.svg.outerHTML,
          type: 'image/svg+xml', postfix: \svg
        } <<< local{width, height}
  # 點陣格式 ( 下載按鈕旁的下拉選單, src/pug/modules/mt/editor.pug ). API 使用者會用到 png ( 見 index.ls 的說明 )
  png: -> @raster \png
  raster: (format = \png) ->
    if !(fmt = RASTER[format]) => return
    mt-track \download, {format, effect: editor.effects.type}
    local = {}
    @prepare!
      .then ({svg, text, width, height}) ->
        local <<< {text, width, height}
        smiltool.svg-to-dataurl svg.outerHTML
      .then (url) -> new Promise (res, rej) ->
        img = new Image!
        img.onload = -> res img
        img.onerror = rej
        img.src = url
      .then (img) ->
        canvas = document.createElement \canvas
        canvas <<< local{width, height}
        ctx = canvas.getContext \2d
        # 沒有透明的格式先鋪上 editor 的背景色 ( gif 只有全透明 / 不透明, 半透明的光暈會有鋸齒, 也鋪底 )
        if fmt.opaque =>
          ctx.fillStyle = background-color!
          ctx.fillRect 0, 0, local.width, local.height
        ctx.drawImage img, 0, 0, local.width, local.height
        if format == \gif => return gif-blob(ctx, local.width, local.height)
        new Promise (res) -> canvas.toBlob res, fmt.type, 0.92
      .then (blob) -> blob-to-dataurl(blob).then (dataurl) -> {blob, dataurl}
      .then ({blob, dataurl}) ~>
        @download {
          dataurl, blob, name: local.text, postfix: fmt.ext, type: fmt.type
        } <<< local{width, height}

RASTER =
  png: {type: 'image/png', ext: \png}
  jpg: {type: 'image/jpeg', ext: \jpg, opaque: true}
  webp: {type: 'image/webp', ext: \webp}
  gif: {type: 'image/gif', ext: \gif, opaque: true}

# 匯出時的底色: editor 設定的背景, 沒有 ( 透明 ) 時用白色
background-color = ->
  c = getComputedStyle(document.querySelector '#cooltext svg').backgroundColor
  if !c or c == \transparent or /rgba\(.*,\s*0\)$/.exec(c) => '#fff' else c

blob-to-dataurl = (blob) -> new Promise (res, rej) ->
  fr = new FileReader!
  fr.onload = -> res fr.result
  fr.onerror = rej
  fr.readAsDataURL blob

# 靜態 gif: 以 gifenc 編碼. 只有選 gif 時才載入 ( esm, 以 dynamic import 載入 )
gifenc = null
gif-blob = (ctx, w, h) ->
  gifenc := gifenc or (new Function('u', 'return import(u)'))('/assets/lib/gifenc/main/gifenc.esm.js')
  gifenc.then ({GIFEncoder, quantize, applyPalette}) ->
    {data} = ctx.getImageData 0, 0, w, h
    palette = quantize data, 256
    enc = GIFEncoder!
    enc.writeFrame applyPalette(data, palette), w, h, {palette}
    enc.finish!
    new Blob [enc.bytes!], {type: 'image/gif'}

# 瀏覽器不支援輸出 webp ( 例: Safari, toBlob 會改給 png ) 時不提供這個選項
if !/^data:image\/webp/.exec(document.createElement(\canvas).toDataURL 'image/webp') =>
  document.addEventListener \DOMContentLoaded, ->
    Array.from(document.querySelectorAll '#editor-download-btn [data-type=webp]').map -> it.remove!
