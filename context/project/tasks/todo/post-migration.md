# migrate 完成後待處理

servebase 移植 ( `model/v2` ) 完成後，逐項討論。


## 1. landing 效果列表的 render 效能

列表上的圖都是即時 render，又用了大量 svg filter，每次 render 都會卡。

可能方向：

 - 改用 canvas render
 - 以固定文字預先 render 成 png，用戶改字或點選時才即時 render

### 調查 ( 2026-11-11，https://maketext.test，桌機 Chrome )

量測 frame 時間：

 - 捲動：p50 16.7ms、p95 32ms。畫面外的 `.line` 設為 `visibility: hidden`，同時只 render 約 5 行 ( 10 個效果 )
 - 輸入文字：每打一個字 ~250ms 一個 frame
 - 調字級：最長 317ms

單一效果改一次文字都落在 2 個 frame 的量測下限 ( ~33ms )，單看都不重。卡頓來自累加：
`update-text` 與 `editor.update` 每次改動都同步改掉所有 gallery 的 text，畫面內 ~10 個 filter 一起重畫。
另外 `.line` 有 `transition: all 0.3s`，捲動時的 scale / opacity 動畫會讓 filter 在動畫期間逐 frame 重新 raster。

效果複雜度差異大：vintage2 108 個 primitive、liquid 9 組 turbulence + displacement、最簡單的只有 4 個。
擴充到上百組時，可見數量不會變 ( 受 visibility 控制 )，但較重的新效果會拉高每次改動的成本。

方向評估：

 - canvas：Canvas2D 的 `filter: url(#id)` Safari 不支援；把每個效果改寫成 WebGL 成本太高。不建議
 - 預先 render 成圖：首屏最快，但失去「打字即時看到所有效果」這個核心體驗，需要搭配下一項
 - 延遲 + 分段更新：輸入 debounce，只更新畫面內的項目，每個 frame 更新一個，畫面外的等捲到再更新
 - 點陣快取：每個效果 render 完就轉成 img ( smiltool 已有 svg → dataurl )，之後捲動與動畫只動圖片，不再重畫 filter

### 分段更新 ( 2026-11-12，已實作，src/ls/editor/index.ls 的 gallery )

輸入 debounce 120ms 後只更新畫面內的項目，每個 frame 一個；畫面外的捲進畫面時再補。同樣條件下量測：

 - 打字：max 267 → 100ms、p95 250 → 67ms
 - 調字級：max 317 → 99ms
 - 捲動：不變 ( p95 32ms )

剩下 ~100ms 的 frame 是 vintage2、liquid 這類重效果單獨重畫一次的成本，分段無法再降，需要點陣快取。
換字型仍是一次全部重畫 ( 以 css rule 套用 )，尚未處理。

### 預先 render 的縮圖 ( 2026-11-12，已實作 )

gallery 一開始顯示 build 時以固定文字、預設字型 render 的 webp 縮圖 ( tool/maketext/build-thumbs.ls，36 張共 1.1MB，lazy load )，
使用者改了文字 / 字級 / 背景 / 字型後，畫面內的項目才逐一切成即時 render 的 svg ( `.live` )。

 - 捲動 ( 縮圖狀態 )：p95 32 → 17.5ms、max 83 → 17.7ms
 - 首屏不需要 render 任何 filter，也不需要載入效果字型。#3 讓每個效果有自己的字型時，首屏成本不變
 - 瀏覽器內無法直接把 svg 快取成圖：svg 當成 img 時讀不到網頁的字型，要先把文字轉成 path。build 時預先 render 可避開這個問題
 - 縮圖以預設字型 render；#3 實作後，build-thumbs 要改用各效果的預設字型


## 2. 效果的維護方式

先釐清目前效果怎麼維護：`src/effects/<name>/` 下的 jade、ls、svg，加上 `config.json`，由舊 `engine/watch.ls` 打包成 `effects.js`。

目標是擴充到上百組，需要評估能撐到這個規模的結構與工具。

### 描述檔與拆分 ( 2026-11-12，已實作 )

 - 每個效果：`effect.yaml` ( 名稱 / 標籤 / order / debug / edit 參數 ) + `index.pug` ( svg ) + `main.ls` ( 只有 watch )。
   原本 main.ls 的 `ret = do` 裡 name / desc / tags / slug 幾乎全空、init / dom 全空，只搬了有內容的欄位；
   `config.json` 的排序改為各效果的 `order` ( 依當時線上順序，間隔 10 )
 - build-effects.ls 輸出 `static/js/effects/index.js` ( 清單 4KB，隨頁面載入 ) 與 `<name>.js` ( 效果本體，共 160KB )，
   本體在第一次需要即時 render 或打開 editor 時才以 `mteffect.load` 載入，前端不再 eval
 - 轉換後與舊輸出比對：順序、html、edit、watch 編譯結果全部相同；縮圖重產結果與之前逐位元相同

尚未做：開發用的效果預覽頁 ( 新增 / 調整效果時用 )。


## 3. 效果自帶預設字型

原本的 maketext.io 可以用快選字型一次替換所有圖，但字型本身也可以是效果的一部分。

構想：

 - 每組效果可以有自己的預設字型
 - 用戶快選字型時，先替換掉預設字型
 - 要能一鍵還原回各效果的預設字型

### 實作 ( 2026-11-12 )

 - `effect.yaml` 的 `font`：xlfont 上的字型名稱 ( normal / 400 ) 或 `<名稱>/<style>/<weight>.ttf`，沒寫用 build-effects.ls 的 DEFAULT-FONT ( Sansita One )。
   目前所有效果都還沒設定，維持原本的 Sansita One
 - 縮圖以各效果自己的字型 render，首屏不載入任何效果字型
 - 效果切成即時 render 或打開 editor 時才載入它的字型，等字型檔載入完才切換，避免 filter 以替代字型多畫一次
 - 字型選擇器選的字型套到所有效果 ( gallery 依版本逐一重畫 )，「↺」還原回各效果的字型；下載時用該效果實際使用的字型轉 path
 - 原本以全域 css rule `svg text { font-family }` 套字型，改為對各容器內的 text 設 inline style ( 同樣能蓋過效果寫在屬性上的字型 )

待決定：各效果要配什麼字型。


## 效果獨立頁、收藏、下載格式 ( 2026-11-12 )

 - 效果獨立頁 `/effect/<name>/`：說明取自 `effect.yaml` 的 `desc`，og:image 為 `static/assets/og/<name>.jpg` ( 1200 x 630，build-thumbs.ls 產生 )
 - 收藏 ( star )：表格 `config/web/db/star.sql`，API `/api/star` ( backend/maketext/index.ls )。
   servebase core 只在第一次按收藏時才載入 ( `modules/mt/core.pug` 的 template + `ls/editor/star.ls` )，首頁不多載
 - 下載：SVG 與 PNG / JPG / WEBP / GIF ( 靜態，gifenc 以 dynamic import 載入 )。不支援輸出 webp 的瀏覽器 ( Safari ) 不顯示 WEBP
 - GA 事件 ( `mt-track`，ls/editor/util.ls )：`effect_select` ( from: gallery / effect_page )、`download` ( format )、`star` / `unstar`、
   `font_chooser_open`、`palette_picker_open`

待處理：

 - srcbuild：改 `//- module` 的 styl / pug 時，引用它的頁面不會重 build，要 touch 頁面 ( 例：`styl/mt/index.styl`、`pug/index.pug` )
 - HTML 沒有 Cache-Control 的問題已在 `config/web/nginx/config.ngx` 補上 no-cache，servebase 的範本也需要同樣的調整


## 效果編號 ( 2026-11-12 )

 - `effect.yaml` 的 `order` 改為 `no` ( 效果編號，頁面上顯示為 #37 )。舊站原有的 36 個為 1 ~ 36 ( 依原順序 )，之後新增的從 37 起
 - 列表：新效果 ( no > 36，build-effects.ls 的 LEGACY ) 在前、編號大的在最上面，接著是舊效果依原順序。新增效果時用目前最大編號 + 1
 - GA 改送 GA4 ( G-9220DQ9M90 )，不再送已停用的 UA

## 移除 v1 舊資源的 fallback ( 約 2026-12 )

2026-11-12 上線時，舊的靜態版 HTML 沒帶 Cache-Control，瀏覽器會自行快取約一天，期間會去要新版沒有的舊資源，畫面就沒有樣式。
因此在正式機 nginx 加了 `config/web/nginx/production-v1-assets.ngx` 這段，從 `server-v1/static` 提供 `/css/pack/`、`/js/pack/`、舊字型等。
等 nginx log 裡不再有這些路徑的請求，就把這段從 `/etc/nginx/sites-available/maketext.io.ngx` 拿掉，再刪除 mwb 上的 `server-v1`（約 1.1GB）。
