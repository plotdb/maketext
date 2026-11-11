# migrate 完成後待處理

servebase 移植 ( `model/v2` ) 完成後，逐項討論。


## 1. landing 效果列表的 render 效能

列表上的圖都是即時 render，又用了大量 svg filter，每次 render 都會卡。

可能方向：

 - 改用 canvas render
 - 以固定文字預先 render 成 png，用戶改字或點選時才即時 render


## 2. 效果的維護方式

先釐清目前效果怎麼維護：`src/effects/<name>/` 下的 jade、ls、svg，加上 `config.json`，由舊 `engine/watch.ls` 打包成 `effects.js`。

目標是擴充到上百組，需要評估能撐到這個規模的結構與工具。


## 3. 效果自帶預設字型

原本的 maketext.io 可以用快選字型一次替換所有圖，但字型本身也可以是效果的一部分。

構想：

 - 每組效果可以有自己的預設字型
 - 用戶快選字型時，先替換掉預設字型
 - 要能一鍵還原回各效果的預設字型
