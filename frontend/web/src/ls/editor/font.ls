# 字型: 由 @xlfont/load 從 xlfont.maketext.io 載入, 以 @xlfont/choose 選字型.
# 選字型的面板在第一次打開時才建立 ( xfc 需要可見的容器才能算預覽的尺寸 ).
XFL-BASE = 'https://xlfont.maketext.io'
FONT-LINKS = "#XFL-BASE/links"
DEFAULT-FONT = 'Sansita One'

font-style = null
apply-font = (font) ->
  window.fontobj = font
  family = "\"#{font.cssName}\""
  # 用 css rule 而不是繼承: 要蓋過 effect 寫在 text 上的 font-family 屬性 ( 例: halftone )
  if !font-style =>
    font-style := document.createElement \style
    document.body.appendChild font-style
  font-style.textContent = "svg text { font-family: #family; }"
  for sel in <[#cooltext .gallery]> => document.querySelector(sel).style.fontFamily = family
  font

# 以名稱載入 xlfont 上的 normal / 400 字型
window.use-font = use-font = (name) ->
  xfl.load {path: "#FONT-LINKS/#{encodeURIComponent name}/normal/400.ttf", name}
    .then apply-font
    .catch (e) -> console.warn "[maketext] failed to load font #name:", e

chooser = null
window.choose-font = ->
  if !chooser =>
    overlay = document.createElement \div
    overlay.className = 'mt-xfc-overlay d-none'
    overlay.innerHTML = document.getElementById(\mt-xfc-tpl).innerHTML
    document.body.appendChild overlay
    hide = -> overlay.classList.add \d-none
    overlay.addEventListener \mousedown, (e) -> if e.target == overlay => hide!
    chooser := {overlay, hide, xfc: new xfc do
      root: overlay.querySelector(\.xfc), meta: "#XFL-BASE/meta", links: FONT-LINKS, init-render: false
    }
    # 取消時 font 為 null
    chooser.xfc.on \choose, (font) ->
      hide!
      if !font => return
      apply-font font
      # 預設字型之外的字型: gallery 縮圖 ( 以預設字型 render ) 失效, 改為即時 render
      editor.gallery.set \font, font.cssName
  chooser.overlay.classList.remove \d-none
  if !chooser.rendered => chooser.rendered = chooser.xfc.init!then -> chooser.xfc.render!

<- $ document .ready
use-font DEFAULT-FONT
