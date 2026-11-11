#!/usr/bin/env lsc
# 把 frontend/web/src/effects/<name>/{index.pug,main.ls} 打包成 static/js/effects.js
#
#   lsc tool/maketext/build-effects.ls        # build 一次
#   lsc tool/maketext/build-effects.ls -w     # 監看變更並重 build
#
# 輸出格式沿用舊站 ( engine/watch.ls ): `var effects = {<name>: {html, js}}`,
# js 是編譯後的原始碼字串, 前端以 eval 取得 `ret` ( 見 src/pug/editor/index.ls ).
require! <[fs path pug livescript chokidar]>

root = path.resolve __dirname, '../../frontend/web'
src = path.join root, 'src/effects'
des = path.join root, 'static/js/effects.js'

build = ->
  config = JSON.parse(fs.read-file-sync path.join(src, 'config.json'))
  order = config.order or []
  names = fs.readdir-sync src
    .filter -> fs.stat-sync(path.join src, it).is-directory!
  # 沿用舊站排序: 不在 order 內的排最前面 ( indexOf = -1 ), order 越後面越前面
  names.sort (a, b) -> order.indexOf(b) - order.indexOf(a)
  obj = {}
  for name in names =>
    dir = path.join src, name
    item = {}
    if fs.exists-sync(f = path.join dir, 'main.ls') =>
      code = livescript.compile fs.read-file-sync(f).toString!, {bare: true}
      ret = null
      eval code
      if ret and ret.debug => continue
      item.js = code
    if fs.exists-sync(f = path.join dir, 'index.pug') =>
      item.html = pug.render-file f
    obj[name] = item
  fs.mkdir-sync path.dirname(des), {recursive: true}
  fs.write-file-sync des, "var effects = #{JSON.stringify(obj)}"
  console.log "[build-effects] #{Object.keys(obj).length} effects -> #{path.relative process.cwd!, des}"

run = -> try build! catch e => console.error "[build-effects] failed:", e.message
run!
if '-w' in process.argv =>
  chokidar.watch src, ignore-initial: true .on \all, run
