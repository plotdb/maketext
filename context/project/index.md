# maketext.io

酷字產生器 ( cool text generator ) 與 fancy text 產生器，基於 servebase。

 - 站台：`frontend/web`
 - 頁面：`/` ( 首頁兼 editor )、`/fancy/`、`/api/editor/0.1/` ( 嵌入用 editor，仍有外部用戶，網址需維持 )
 - maketext 自己的 pug 模組在 `frontend/web/src/pug/modules/mt/`，有獨立 layout，不用 `/base.pug` ( 原因見其檔頭 )
 - 字型：`@xlfont/load` + `@xlfont/choose`，來源 `https://xlfont.maketext.io`
 - 效果：`frontend/web/src/effects/<name>/`，以 `lsc tool/maketext/build-effects.ls [-w]` 打包成 `static/js/effects.js`
 - gallery 縮圖：`lsc tool/maketext/build-thumbs.ls [name ...]` 以 headless Chrome 預先 render 到 `static/assets/thumb/<name>.webp`，改了效果後要重產。依賴在 `tool/maketext/package.json`，先在該目錄 `npm install`

servebase 本身的說明見 `context/servebase/`。

工作項目見 `tasks/`。
