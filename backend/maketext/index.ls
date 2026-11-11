(backend) <- (->module.exports = it) _
{config, route: {app}} = backend
if config.base != \web => return

require! <[fs path]>

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
