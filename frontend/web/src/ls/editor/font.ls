# 字型: 由 @xlfont/load 從 xlfont.maketext.io 載入, 以 @xlfont/choose 選字型.
#
# 每個效果有自己的預設字型 ( effect.yaml 的 font, 見 tool/maketext/build-effects.ls ).
# 使用者以字型選擇器選的字型 ( override ) 套用到所有效果, 按「還原」回到各效果自己的字型.
# 字型在效果需要即時 render 時才載入 ( gallery 一開始顯示的是以各自字型預先 render 的縮圖 ).
# 選字型的面板在第一次打開時才建立 ( xfc 需要可見的容器才能算預覽的尺寸 ).
XFL-BASE = 'https://xlfont.maketext.io'
FONT-LINKS = "#XFL-BASE/links"

# effect.yaml 的 font: 名稱 ( 用 normal / 400 ) 或 `<名稱>/<style>/<weight>.ttf`
font-path = (name) -> if '/' in name => name else "#name/normal/400.ttf"

loaded = {}
load = (name) ->
  if loaded[name] => return that
  # 等字型檔真的載入再回傳, 避免 filter 先以替代字型畫一次, 字型到了再重畫
  loaded[name] = xfl.load {path: "#FONT-LINKS/#{encodeURI font-path(name)}", name}
    .then (f) -> document.fonts.load("64px \"#{f.cssName}\"").then -> f
    .catch (e) ->
      delete loaded[name]
      Promise.reject e

window.mt-font = mt-font = do
  override: null
  load: load
  # 效果實際使用的字型
  of: (type) ->
    if !(f = @override) => return load(effects[type].font)
    document.fonts.load("64px \"#{f.cssName}\"").then -> f
  # 套到容器內 svg 的文字. 用 inline style: 要蓋過效果寫在 text 上的 font-family 屬性 ( 例: halftone )
  apply: (node, font) ->
    Array.from(node.querySelectorAll 'svg text').map -> it.style.fontFamily = "\"#{font.cssName}\""
  set-override: (font) ->
    @override = font
    document.querySelector(\#font-name).textContent = if font => font.cssName else 'Choose ...'
    document.querySelector(\#font-reset).classList.toggle \d-none, !font
    # gallery 依版本逐一以新字型重新 render; 還原時已切成即時 render 的項目也要改回各自的字型
    editor.gallery.set \font, (if font => font.cssName else null)
    if document.body.classList.contains(\editing) =>
      @of(editor.effects.type).then (f) -> mt-font.apply document.querySelector(\#cooltext), f

window.reset-font = -> mt-font.set-override null

# 字型面板在頁面載入後的空檔就先建立並 render ( 預載字型清單與預覽圖 ), 打開時不用再等.
# 收起時用 visibility 而不是 display: none, xfc 需要有尺寸的容器才能算預覽的大小
chooser = null
get-chooser = ->
  if chooser => return chooser
  overlay = document.createElement \div
  overlay.className = 'mt-xfc-overlay mt-xfc-hidden'
  overlay.innerHTML = document.getElementById(\mt-xfc-tpl).innerHTML
  document.body.appendChild overlay
  hide = -> overlay.classList.add \mt-xfc-hidden
  overlay.addEventListener \mousedown, (e) -> if e.target == overlay => hide!
  chooser := {overlay, hide, xfc: new xfc do
    root: overlay.querySelector(\.xfc), meta: "#XFL-BASE/meta", links: FONT-LINKS, init-render: false
  }
  # 取消時 font 為 null
  chooser.xfc.on \choose, (font) ->
    hide!
    if font => mt-font.set-override font
  chooser.rendered = chooser.xfc.init!then -> chooser.xfc.render!
  chooser.rendered.catch (e) -> console.warn "[maketext] font chooser:", e
  chooser

window.choose-font = ->
  mt-track \font_chooser_open
  get-chooser!overlay.classList.remove \mt-xfc-hidden

idle (-> get-chooser!), 2000
