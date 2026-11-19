require! <[fs path lderror @servebase/backend/aux]>
(backend) <- (->module.exports = it) _
{config, db, route: {app, api}} = backend
if config.base != \web => return

# 效果資料由 tool/maketext/build-effects.ls 產生. 檔案改變 ( 重新 build ) 時才重新讀取
meta-file = path.join __dirname, '../../frontend/web/static/js/effects/meta.json'
cache = mtime: 0, data: {}
effects = ->
  mtime = fs.stat-sync(meta-file).mtime-ms
  if mtime != cache.mtime => cache <<< {mtime, data: JSON.parse(fs.read-file-sync meta-file)}
  cache.data

# 單一效果的獨立頁. 不存在的效果交給後面的 404
# 有自己網址 ( effect.yaml 的 page, 例: /font-to-svg/ ) 的效果轉到該網址
app.get \/effect/:name, (req, res, next) ->
  if !(effect = effects![req.params.name]) => return next!
  if effect.page => return res.redirect 301, effect.page
  res.render \effect/index.pug, {effect}

# 有自己網址的效果的獨立頁. 網址少了結尾的 / 時補上
app.get '*', (req, res, next) ->
  if /\./.test(req.path) => return next!
  p = req.path.replace(/\/?$/, '/')
  if !(effect = [v for k, v of effects! when v.page == p].0) => return next!
  if req.path != p => return res.redirect 301, p
  res.render \effect/index.pug, {effect}

# 收藏 ( star ): 需登入. 表格見 config/web/db/100.star.sql
# 未登入時清單回空陣列 ( 每頁都會問, 不當成錯誤 )
api.get \/star, (req, res) ->
  if !(req.user and req.user.key) => return res.send []
  db.query "select effect from star where owner = $1 order by createdtime", [req.user.key]
    .then (r = {}) -> res.send r.[]rows.map (.effect)

api.put \/star/:name, aux.signedin, (req, res) ->
  if !effects![name = req.params.name] => return lderror.reject 404
  db.query "insert into star (owner, effect) values ($1, $2) on conflict do nothing", [req.user.key, name]
    .then -> res.send {}

api.delete \/star/:name, aux.signedin, (req, res) ->
  db.query "delete from star where owner = $1 and effect = $2", [req.user.key, req.params.name]
    .then -> res.send {}

# sitemap: 固定頁面 + 每個效果的獨立頁 + 文章 ( static/articles/<name>/ )
articles-dir = path.join __dirname, '../../frontend/web/static/articles'
app.get \/sitemap.xml, (req, res) ->
  urls = <[/ /fancy/ /privacy /tos]>
  urls ++= [(v.page or "/effect/#k/") for k, v of effects!]
  urls ++= fs.readdir-sync(articles-dir)
    .filter -> fs.exists-sync path.join(articles-dir, it, 'index.html')
    .map -> "/articles/#it/"
  res.type \application/xml .send """
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  #{urls.map(-> "  <url><loc>https://maketext.io#it</loc></url>").join('\n')}
  </urlset>
  """
