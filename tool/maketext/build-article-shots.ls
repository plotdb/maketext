#!/usr/bin/env lsc
# 文章 /articles/awesome-text-makers/ 用的網站截圖:
#
#  - 每個網站一張小縮圖 ( 清單上的 thumbnail ): <slug>.webp, 640 x 400 ( 1280 x 800 的畫面縮成一半; 封面拼貼也用它 )
#  - 前幾個網站拼成的封面圖 ( 文章開頭的圖, 也是 og:image ): cover.webp / cover.jpg, 1200 x 630
#
# 輸出到 frontend/web/static/assets/img/articles/awesome-text-makers/
#
#   lsc tool/maketext/build-article-shots.ls [slug ...]   # 不給 slug 就全部重截, 並重做封面
#
# 網站清單與文章 ( src/pug/articles/awesome-text-makers/index.pug ) 的 slug 對應, 增減網站時兩邊都要改.
# 有些網站擋 headless 瀏覽器 ( Cloudflare ), 截到的是驗證頁: 手動截 1280 x 800 的畫面, 縮成 640 x 400 存成 <slug>.webp,
# 再以 `--cover` 只重做封面 ( 2026-11: textstudio / fontmeme / loading-text / adobe-express 是手動截的;
# canva 未登入的頁面擋 headless, 登入後的畫面有個人資料不能用, 改用只有站名的圖 ). 不要偽裝 user agent 繞過阻擋.
# maketext 自己的頁面截 MAKETEXT ( 預設本機的 https://maketext.test ).
require! <[fs path puppeteer]>

des = path.resolve __dirname, '../../frontend/web/static/assets/img/articles/awesome-text-makers'
MAKETEXT = process.env.MAKETEXT or 'https://maketext.test'
[W, H] = [1280, 800]

sites =
  cooltext: 'https://cooltext.com/'
  flamingtext: 'https://flamingtext.com/'
  'maketext': "#MAKETEXT/"
  textstudio: 'https://www.textstudio.com/'
  textcraft: 'https://textcraft.net/'
  fontmeme: 'https://fontmeme.com/'
  'google-font-to-svg-path': 'https://danmarshall.github.io/google-font-to-svg-path/'
  'text-to-svg': 'https://text-to-svg.com/'
  'maketext-font-to-svg': "#MAKETEXT/font-to-svg/"
  'loading-text': 'https://loading.io/animation/text/'
  textanim: 'https://textanim.com/'
  glowtxt: 'https://glowtxt.com/'
  lingojam: 'https://lingojam.com/FancyTextGenerator'
  fsymbols: 'https://fsymbols.com/'
  'maketext-fancy': "#MAKETEXT/fancy/"
  yaytext: 'https://yaytext.com/'
  coolsymbol: 'https://coolsymbol.com/'
  canva: 'https://www.canva.com/'
  'adobe-express': 'https://www.adobe.com/express/'
  kittl: 'https://www.kittl.com/'
  mockofun: 'https://www.mockofun.com/'

# 封面拼貼用的網站 ( 文章前段的幾個 )
COVER = <[cooltext flamingtext maketext textstudio textcraft fontmeme]>

shot = (browser, slug, url) ->>
  page = await browser.new-page!
  await page.set-viewport {width: W, height: H, device-scale-factor: 0.5}
  # maketext 自己的頁面不顯示 cookie 提示列 ( src/pug/modules/mt/cookie.pug )
  if url.indexOf(MAKETEXT) == 0 =>
    await page.evaluate-on-new-document -> try localStorage.setItem \mt-cookie-consent, Date.now! catch e
  try
    await page.goto url, {wait-until: \networkidle2, timeout: 45000}
  catch e
    console.warn "[shots] #slug: #{e.message} ( 照樣截圖 )"
  await new Promise -> set-timeout it, 2000
  await page.screenshot {path: path.join(des, "#slug.webp"), type: \webp, quality: 80}
  await page.close!
  console.log "[shots] #slug"

cover = (browser) ->>
  img = (slug) -> "data:image/webp;base64,#{fs.read-file-sync(path.join des, "#slug.webp").toString(\base64)}"
  cells = COVER.map((s) -> """<div class="c"><img src="#{img s}"></div>""").join('')
  html = """
  <!doctype html><html><head><meta charset="utf-8"><style>
  html, body { margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; position: relative;
    background: linear-gradient(135deg, \#2f4a7f, \#0a7b8d); font-family: Helvetica, Arial, sans-serif; }
  .grid { position: absolute; left: -60px; top: -40px; width: 1320px; display: grid;
    grid-template-columns: repeat(3, 1fr); gap: 24px; transform: rotate(-6deg); }
  .c { border-radius: 8px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,.35); background: \#fff; }
  .c img { display: block; width: 100%; }
  .t { position: absolute; white-space: nowrap; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center;
    background: rgba(255,255,255,.94); padding: 28px 48px; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,.3); }
  .t b { display: block; font-size: 64px; color: \#222; letter-spacing: -1px; }
  .t span { display: block; margin-top: 8px; font-size: 26px; color: \#0a7b8d; }
  </style></head><body><div class="grid">#cells#cells</div>
  <div class="t"><b>Awesome Text Makers</b><span>#{Object.keys(sites).length} text effect websites you won't want to miss</span></div>
  </body></html>"""
  page = await browser.new-page!
  await page.set-viewport {width: 1200, height: 630}
  await page.set-content html, {wait-until: \load}
  await page.screenshot {path: path.join(des, 'cover.webp'), type: \webp, quality: 85}
  await page.screenshot {path: path.join(des, 'cover.jpg'), type: \jpeg, quality: 85}
  await page.close!
  console.log "[shots] cover"

main = ->>
  fs.mkdir-sync des, {recursive: true}
  # lsc 執行時 argv 含 script 本身
  args = process.argv.slice(2).filter -> !/\.ls$/.test(it)
  only-cover = '--cover' in args
  names = args.filter -> it != '--cover'
  browser = await puppeteer.launch {accept-insecure-certs: true}
  try
    if !only-cover =>
      for slug, url of sites when !names.length or slug in names => await shot browser, slug, url
    if only-cover or !names.length => await cover browser
  finally
    await browser.close!

main!catch (e) ->
  console.error "[shots] failed:", e
  process.exit 1
