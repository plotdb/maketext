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


## 2. 效果的維護方式

先釐清目前效果怎麼維護：`src/effects/<name>/` 下的 jade、ls、svg，加上 `config.json`，由舊 `engine/watch.ls` 打包成 `effects.js`。

目標是擴充到上百組，需要評估能撐到這個規模的結構與工具。


## 3. 效果自帶預設字型

原本的 maketext.io 可以用快選字型一次替換所有圖，但字型本身也可以是效果的一部分。

構想：

 - 每組效果可以有自己的預設字型
 - 用戶快選字型時，先替換掉預設字型
 - 要能一鍵還原回各效果的預設字型
