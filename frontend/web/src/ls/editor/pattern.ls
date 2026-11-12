# 圖樣填色: 以 ( 動態 ) gif 取代效果的 fill 顏色
#
# - 只有參數裡有 fill 顏色 ( effect.yaml 的 edit.fill ) 的效果可用. 顏色欄位旁多一個圖樣按鈕 ( decorate ).
# - 在 svg 的 defs 加上 <pattern> ( 一張 gif 拼貼 ), 把效果設成 fill 顏色的 text 改成 url(#pattern).
#   效果的 watch 改顏色時會蓋掉, 因此 editor.update 之後都要再套一次 ( apply ).
#   以 filter 自己上色 ( 只用 SourceAlpha ) 的效果看不到圖樣.
# - 預覽: 瀏覽器不會讓 <pattern> 裡的 gif 動起來, 因此逐格解碼 ( ImageDecoder ) 後自己換格 ( animate ).
#   不支援 ImageDecoder 的瀏覽器只顯示第一格.
# - 內建圖樣由 tool/maketext/build-patterns.ls 產生 ( /assets/pattern/ ), 也可以上傳自己的 gif.
# - 匯出 ( download.ls ): svg 內嵌 gif ( 瀏覽器開啟時會動 ); png / jpg / webp 是第一格;
#   gif 逐格解碼 ( ImageDecoder ) 後逐格 render, 輸出動態 gif.
SVGNS = \http://www.w3.org/2000/svg
ID = \editing-mt-pattern

window.mt-pattern = pattern = do
  # 目前的圖樣: {name, url, width, height}, 沒有則為 null
  cur: null
  list: null
  load-list: ->
    @list or (@list = ld$.fetch '/assets/pattern/index.json', {method: \GET}, {type: \json}
      .then (list) -> list.map -> it <<< url: "/assets/pattern/#{it.name}.gif")
  # 這個效果能不能用圖樣
  usable: ->
    e = editor.effects[editor.effects.type]
    !!(e and e.js and e.js.edit and e.js.edit.fill and e.js.edit.fill.type == \color)
  apply: (svg = document.querySelector '#cooltext svg') ->
    if !svg => return
    old = svg.querySelector "pattern\##ID"
    texts = Array.from(svg.querySelectorAll \text)
    if !(@cur and @usable!) =>
      if old => old.remove!
      fill = editor.config.cur.fill
      for t in texts when t.hasAttribute(\data-mt-pattern) =>
        t.removeAttribute \data-mt-pattern
        if fill => t.setAttribute \fill, fill
      return
    if !(p = old) =>
      defs = svg.querySelector(\defs) or svg.insertBefore(document.createElementNS(SVGNS, \defs), svg.firstChild)
      p = document.createElementNS SVGNS, \pattern
      p.setAttribute \id, ID
      p.setAttribute \patternUnits, \userSpaceOnUse
      p.appendChild document.createElementNS(SVGNS, \image)
      defs.appendChild p
    img = p.querySelector \image
    for k,v of {width: @cur.width, height: @cur.height} =>
      p.setAttribute k, v
      img.setAttribute k, v
    # 用 href ( 不是 xlink:href ): 匯出時以 outerHTML 序列化, xlink 沒宣告 namespace 會變成不合法的 svg
    if !img.getAttribute(\href) => img.setAttribute \href, @cur.url
    # 效果把 fill 顏色設在哪個 text 上: 顏色等於目前的 fill, 或之前已換成圖樣的
    fill = editor.config.cur.fill
    for t in texts when t.hasAttribute(\data-mt-pattern) or (fill and t.getAttribute(\fill) == fill) =>
      t.setAttribute \data-mt-pattern, 1
      t.setAttribute \fill, "url(\##ID)"
  set: (cur) ->
    @cur = cur
    @apply!
    @animate!
    if cur => mt-track \pattern, {pattern: cur.name, effect: editor.effects.type}
    @render-btn!
    # 動態格式 ( mp4 / webm ) 只在有圖樣時出現 ( src/pug/modules/mt/editor.pug 的下載選單 )
    Array.from(document.querySelectorAll '#editor-download-btn [data-anim]').map ~> it.classList.toggle \d-none, !@cur
  # 預覽的動畫: 解碼後的每一格 ( blob url ) 依序換進 <pattern> 的 image
  animate: ->
    clearTimeout @_timer
    cur = @cur
    if !(cur and window.ImageDecoder) => return
    (@_frames = @_frames or {})[cur.url] = @_frames[cur.url] or decode(cur.url).catch(-> [])
    @_frames[cur.url].then (frames) ~>
      if @cur != cur or frames.length < 2 => return
      i = 0
      tick = ~>
        if @cur != cur => return
        if document.body.classList.contains(\editing) and img = document.querySelector "\#cooltext pattern\##ID image" =>
          img.setAttribute \href, frames[i].url
        @_timer = setTimeout tick, frames[i].delay
        i := (i + 1) % frames.length
      tick!
  # 顏色欄位與圖樣按鈕並排 ( .mt-fill ). 有圖樣時 ( .on ) 圖樣按鈕展開、顏色縮成一小塊;
  # 點顏色就回到顏色填色. box: 剛建立還沒放進頁面的 ( decorate )
  render-btn: (box = document.querySelector '#editor-custom-options .mt-fill') ->
    if !box => return
    box.classList.toggle \on, !!@cur
    box.querySelector(\.mt-pattern-btn).style.backgroundImage = if @cur => "url(#{@cur.url})" else ''
  # open-effect ( index.ls ) 建立參數欄位時呼叫: fill 顏色欄位旁加上圖樣按鈕
  decorate: (node, key) ->
    if key != \fill => return
    color = node.querySelector \.color
    box = document.createElement \div
    box.className = \mt-fill
    color.parentNode.insertBefore box, color
    box.appendChild color
    box.insertAdjacentHTML \beforeend, '''
    <div class="mt-pattern-btn" title="fill with an animated pattern"><span class="mt-pattern-label">GIF</span><span class="mt-pattern-clear" title="back to color">&times;</span></div>
    '''
    box.querySelector(\.mt-pattern-btn).addEventListener \click, (e) ~>
      if e.target.closest \.mt-pattern-clear => return @set null
      @pick!
    # 有圖樣時點顏色: 改回顏色填色 ( 顏色選擇器照常打開 )
    color.addEventListener \click, (~> if @cur => @set null), true
    @render-btn box
  pick: ->
    # ldcover 關閉時會把根節點移出 DOM, 不能每次用 querySelector 找; 載入時記下 ( @root )
    root = @root
    @ldcv = @ldcv or new ldcover root: root
    @load-list!then (list) ~>
      grid = root.querySelector \.mt-pattern-grid
      grid.innerHTML = (
        ["""<div class="mt-pattern-item none" data-name="">none</div>"""] ++
        list.map -> """<div class="mt-pattern-item" data-name="#{it.name}" style="background-image:url(#{it.url})"></div>"""
      ).join('')
      @ldcv.toggle true
  # 上傳自己的 gif ( 或其它圖片 ): 以 data url 放進 svg, 匯出也帶得走
  upload: (file) ->
    if !file => return
    fr = new FileReader!
    fr.onload = ~>
      img = new Image!
      img.onload = ~>
        # 太大的圖縮成約 200 單位寬的拼貼
        r = Math.min(1, 200 / Math.max(img.width, img.height))
        @set {name: \upload, url: fr.result, width: img.width * r, height: img.height * r}
        @ldcv.toggle false
      img.src = fr.result
    fr.readAsDataURL file

# gif 逐格解碼成 blob url 與每格的時間 ( ms ). 最多 60 格
decode = (url) ->
  # 整個檔案讀完再解碼: 給 stream 的話 frameCount 會是當下已收到的格數
  fetch(url).then (r) -> r.blob!
  .then (blob) -> blob.arrayBuffer!then (data) -> {data, type: blob.type or 'image/gif'}
  .then ({data, type}) ->
    dec = new ImageDecoder {data, type}
    Promise.all([dec.tracks.ready, dec.completed]).then ->
      count = Math.min(60, dec.tracks.selectedTrack.frameCount or 1)
      frames = []
      step = (i) ->
        if i >= count => return frames
        dec.decode({frameIndex: i}).then ({image}) ->
          canvas = document.createElement \canvas
          canvas <<< {width: image.displayWidth, height: image.displayHeight}
          canvas.getContext(\2d).drawImage image, 0, 0
          delay = Math.max(20, Math.round((image.duration or 100000) / 1000))
          image.close!
          new Promise (res) -> canvas.toBlob res
            .then (b) ->
              frames.push {url: URL.createObjectURL(b), delay}
              step i + 1
      step 0

<- document.addEventListener \DOMContentLoaded, _
if !(root = pattern.root = document.querySelector \#pattern-picker) => return
root.addEventListener \click, (e) ->
  if !(n = e.target.closest \.mt-pattern-item) => return
  name = n.dataset.name
  pattern.load-list!then (list) ->
    pattern.set(if name => list.find(-> it.name == name) else null)
    pattern.ldcv.toggle false
root.querySelector('input[type=file]').addEventListener \change, ->
  pattern.upload @files.0
  @value = ''
