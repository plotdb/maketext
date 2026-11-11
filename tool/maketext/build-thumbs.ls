#!/usr/bin/env lsc
# 以固定文字與各效果的預設字型 ( effect.yaml 的 font ) 預先 render 每個效果的 gallery 縮圖,
# 輸出到 frontend/web/static/assets/thumb/<name>.webp
#
#   lsc tool/maketext/build-thumbs.ls [name ...]   # 不給名稱就全部重產
#
# 需要先 build effects ( build-effects.ls ) 與 css ( dev server 或 srcbuild ), 並可連到 xlfont.maketext.io.
# 依賴放在 tool/maketext/package.json ( 根目錄的 package.json 屬於 servebase, 改了會與上游衝突 ), 先在此目錄 npm install.
#
# 縮圖比例與桌機版 gallery 的格子相同 ( 490 x 160 ), 以 2 倍解析度輸出. 前端以 object-fit: contain 顯示,
# 並把效果 svg 的背景色設在容器上, 窄版面多出來的邊會是同一個顏色 ( 見 src/ls/editor/index.ls ).
require! <[fs path http puppeteer]>

root = path.resolve __dirname, '../../frontend/web/static'
des = path.join root, 'assets/thumb'
[W, H, SCALE] = [490, 160, 2]
FONT-LINKS = 'https://xlfont.maketext.io/links'

mime = '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif'
serve = -> new Promise (res) ->
  server = http.create-server (req, rsp) ->
    f = path.join root, decodeURIComponent(req.url.split('?').0)
    if !(f.indexOf(root) == 0 and fs.exists-sync(f) and fs.stat-sync(f).is-file!) => return rsp.end!
    rsp.write-head 200, {'Content-Type': mime[path.extname f] or 'application/octet-stream'}
    fs.create-read-stream(f).pipe rsp
  server.listen 0, '127.0.0.1', -> res server

page-html = (url) -> """
<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="#url/css/mt/index.css">
<style>
html, body { margin: 0; background: transparent; }
\#box { width: #{W}px; height: #{H}px; }
\#box svg { display: block; }
</style>
<script src="#url/js/effects/index.js"></script>
</head><body><div id="box"></div></body></html>
"""

main = ->>
  # 以 lsc 執行時 argv[2] 是這支腳本本身
  names = process.argv.slice(2).filter -> !/\.ls$/.test(it)
  fs.mkdir-sync des, {recursive: true}
  server = await serve!
  url = "http://127.0.0.1:#{server.address!port}"
  browser = await puppeteer.launch!
  try
    page = await browser.new-page!
    await page.set-viewport {width: W, height: H, device-scale-factor: SCALE}
    # 以 goto 取得同源, 讓 feImage 等相對網址可以載入
    await page.goto "#url/"
    await page.set-content page-html(url), {wait-until: \networkidle0}
    list = await page.evaluate -> Object.keys(effects)
    if names.length => list = list.filter -> it in names
    for name in list =>
      # 在頁面內執行 ( 會被序列化 ): 不可用到 LiveScript 的輔助函式 ( 例: `in` ), 字型路徑規則同 src/ls/editor/font.ls
      render = (name, links) ->
        font = effects[name].font
        fpath = if font.indexOf('/') >= 0 => font else "#font/normal/400.ttf"
        face = new FontFace(font, "url(\"#links/#{encodeURI fpath}\")")
        Promise.all [mteffect.load(name), face.load!]
          .then ([e]) ->
            document.fonts.add face
            box = document.querySelector('#box')
            box.innerHTML = e.html.replace '<svg', "<svg width='100%' height='100%'"
            Array.from(box.querySelectorAll 'svg text').map -> it.style.fontFamily = "\"#font\""
      await page.evaluate render, name, FONT-LINKS
      # 等 feImage 等資源載入與 filter render
      await page.wait-for-network-idle {idle-time: 100}
      await new Promise -> set-timeout it, 100
      box = await page.$ '#box'
      await box.screenshot {path: path.join(des, "#name.webp"), type: \webp, quality: 85, omit-background: true}
      console.log "[build-thumbs] #name"
  finally
    await browser.close!
    server.close!
  console.log "[build-thumbs] done -> #{path.relative process.cwd!, des}"

main!catch (e) -> console.error "[build-thumbs] failed:", e; process.exit 1
