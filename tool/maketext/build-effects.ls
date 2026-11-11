#!/usr/bin/env lsc
# 打包 frontend/web/src/effects/<name>/ 下的效果
#
#   lsc tool/maketext/build-effects.ls        # build 一次
#   lsc tool/maketext/build-effects.ls -w     # 監看變更並重 build
#
# 每個效果一個資料夾:
#
#  - effect.yaml: 效果描述
#    - name: 顯示名稱 ( 選用 )
#    - desc, tags: 說明與標籤 ( 選用 )
#    - order: 排序, 小的在前. 以 10 為間隔, 方便插入
#    - debug: true 時不打包
#    - font: 預設字型, xlfont.maketext.io 上的字型名稱 ( 使用 normal / 400 ), 或 `<名稱>/<style>/<weight>.ttf`
#      沒寫則用 DEFAULT-FONT. 使用者以字型選擇器選的字型會蓋過它, 可一鍵還原 ( src/ls/editor/font.ls )
#    - edit: 可調參數, { <key>: {name, type: color | number, default, min, max, step} }
#  - index.pug: 效果的 svg ( viewBox 0 0 500 150 ), 可 include 同目錄的檔案
#  - main.ls: `module.exports = watch: (n, o, node) -> ...`, 參數變化時更新 svg
#
# 輸出到 frontend/web/static/js/effects/:
#
#  - index.js: 效果清單 `effects` ( 依 order 排序, 含字型 / 背景色 / 版本 hash ) 與載入器 `mteffect`.
#    清單很小, 隨頁面載入; gallery 一開始只顯示縮圖 ( build-thumbs.ls ), 不需要效果本體
#  - <name>.js: 效果本體 ( svg 與 watch ), 第一次需要即時 render 時才以 mteffect.load(name) 載入
#  - meta.json: 給後端的效果資料 ( 獨立頁 /effect/<name>/, 見 backend/maketext/index.ls ), 依 order 排序
require! <[fs path crypto pug livescript js-yaml chokidar]>

root = path.resolve __dirname, '../../frontend/web'
src = path.join root, 'src/effects'
des = path.join root, 'static/js/effects'
DEFAULT-FONT = 'Sansita One'

# 載入器: 效果本體以 script 載入, 檔案內呼叫 mteffect.register 把 html / edit / watch 掛回 effects[name]
loader = '''
var mteffect = {
  _p: {},
  register: function(name, data, fn) {
    var m = {exports: {}}, e = effects[name] || (effects[name] = {});
    fn(m);
    e.html = data.html;
    e.js = {edit: data.edit, watch: m.exports.watch};
  },
  load: function(name) {
    var e = effects[name];
    if (!e) { return Promise.reject(new Error("effect not found: " + name)); }
    if (e.html) { return Promise.resolve(e); }
    if (this._p[name]) { return this._p[name]; }
    return this._p[name] = new Promise(function(res, rej) {
      var s = document.createElement("script");
      s.src = "/js/effects/" + name + ".js?v=" + e.v;
      s.onload = function() { res(e); };
      s.onerror = function() { delete mteffect._p[name]; rej(new Error("failed to load effect: " + name)); };
      document.head.appendChild(s);
    });
  }
};
'''

build = ->
  list = fs.readdir-sync src
    .filter -> fs.exists-sync path.join(src, it, 'effect.yaml')
    .map (name) ->
      dir = path.join src, name
      {name, dir, meta: js-yaml.safe-load(fs.read-file-sync path.join(dir, 'effect.yaml')) or {}}
    .filter -> !it.meta.debug
  list.sort (a, b) -> (a.meta.order ? 0) - (b.meta.order ? 0) or (if a.name > b.name => 1 else -1)
  fs.mkdir-sync des, {recursive: true}
  index = {}
  meta-out = {}
  for {name, dir, meta} in list =>
    html = pug.render-file path.join(dir, 'index.pug')
    code = if fs.exists-sync(f = path.join dir, 'main.ls') =>
      livescript.compile fs.read-file-sync(f).toString!, {bare: true}
    else ''
    body = "mteffect.register(#{JSON.stringify name}, #{JSON.stringify {html, edit: meta.edit or {}}}, function(module) {\n#code\n});\n"
    fs.write-file-sync path.join(des, "#name.js"), body
    # 背景色: 縮圖 object-fit: contain 時容器補同色 ( src/ls/editor/index.ls )
    bk = (/^<svg[^>]*style="background:\s*([^;"]+)/.exec(html) or [])[1] or ''
    index[name] = {bk, font: meta.font or DEFAULT-FONT, v: crypto.create-hash(\md5).update(body).digest(\hex).slice(0, 8)}
    for k in <[name tags]> => if meta[k] => index[name][k] = meta[k]
    # 顯示名稱: 沒寫 name 時由資料夾名稱轉, 例: retro-chrome -> Retro Chrome
    label = meta.name or name.split('-').map(-> it.0.toUpperCase! + it.slice 1).join(' ')
    meta-out[name] = {key: name, label, desc: meta.desc or '', tags: meta.tags or [], font: index[name].font}
  # 清掉已移除或改為 debug 的效果
  for f in fs.readdir-sync(des) => if !(f in <[index.js meta.json]>) and !index[f.replace(/\.js$/, '')] => fs.unlink-sync path.join(des, f)
  fs.write-file-sync path.join(des, 'meta.json'), JSON.stringify(meta-out)
  fs.write-file-sync path.join(des, 'index.js'), "var effects = #{JSON.stringify index};\n#loader"
  console.log "[build-effects] #{list.length} effects -> #{path.relative process.cwd!, des}"

run = -> try build! catch e => console.error "[build-effects] failed:", e.message
run!
if '-w' in process.argv =>
  chokidar.watch src, ignore-initial: true .on \all, run
