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
app.get \/effect/:name, (req, res, next) ->
  if !(effect = effects![req.params.name]) => return next!
  res.render \effect/index.pug, {effect}

# 收藏 ( star ): 需登入. 表格見 config/web/db/star.sql
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
