#!/usr/bin/env lsc
# 產生文字填色用的動態 gif 圖樣 ( src/ls/editor/pattern.ls )
#
#   lsc tool/maketext/build-patterns.ls
#
# 每個圖樣是一個 f(x, y, t) -> [r, g, b] ( x, y: 0 ~ SIZE, t: 0 ~ 1 ). 函式對 x / y 以 SIZE 為週期、
# 對 t 以 1 為週期, 因此可以無縫拼貼, 也可以無縫循環. 輸出到 frontend/web/static/assets/pattern/<name>.gif,
# 清單 ( 名稱 / 尺寸 ) 寫到同目錄的 index.json.
require! <[fs path]>
{GIFEncoder, quantize, applyPalette} = require '../../frontend/web/node_modules/gifenc/dist/gifenc.js'

SIZE = 96
FRAMES = 24
DELAY = 60
outdir = path.join __dirname, '../../frontend/web/static/assets/pattern'
TAU = Math.PI * 2

hsl = (h, s, l) ->
  h = ((h % 1) + 1) % 1
  f = (n) ->
    k = (n + h * 12) % 12
    a = s * Math.min(l, 1 - l)
    255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))
  [f(0), f(8), f(4)]
mix = (a, b, v) -> [0 1 2].map (i) -> a[i] + (b[i] - a[i]) * v
smooth = (v) -> Math.max(0, Math.min(1, v))

# 固定的亂數 ( 每次 build 結果相同 )
seed = 7
rand = -> seed := (seed * 16807) % 2147483647; seed / 2147483647
stars = [0 til 18].map -> {x: rand! * SIZE, y: rand! * SIZE, p: rand!, r: 1.5 + rand! * 2}

patterns =
  stripes: (x, y, t) ->
    v = Math.sin(TAU * (2 * (x + y) / SIZE - t))
    mix [255 64 129], [255 214 0], smooth(v * 3 + 0.5)
  rainbow: (x, y, t) -> hsl((x + y) / SIZE - t, 0.9, 0.55)
  plasma: (x, y, t) ->
    v = Math.sin(TAU * (x / SIZE + t)) + Math.sin(TAU * (2 * y / SIZE - t)) + Math.sin(TAU * ((x + y) / SIZE + t))
    hsl(v / 6 + t, 0.85, 0.55)
  waves: (x, y, t) ->
    v = Math.sin(TAU * (3 * y / SIZE + 0.15 * Math.sin(TAU * (x / SIZE + t)) - t))
    mix [20 70 180], [80 220 255], smooth(v * 0.5 + 0.5)
  checker: (x, y, t) ->
    s = t * 24
    c = (Math.floor((x + s) / 12) + Math.floor((y + s) / 12)) % 2
    if c => [40 40 40] else [250 250 250]
  sparkle: (x, y, t) ->
    c = mix [255 190 40], [200 120 0], (Math.sin(TAU * (y / SIZE + t)) * 0.5 + 0.5)
    for s in stars
      # 以 SIZE 為週期的距離, 星星跨過邊界也能拼貼
      dx = Math.abs(x - s.x); dx = Math.min(dx, SIZE - dx)
      dy = Math.abs(y - s.y); dy = Math.min(dy, SIZE - dy)
      b = Math.pow(Math.max(0, Math.sin(TAU * (t + s.p))), 4) * smooth(1 - Math.hypot(dx, dy) / s.r)
      c = mix c, [255 255 255], b
    c

fs.mkdir-sync outdir, {recursive: true}
index = []
for name, f of patterns
  enc = GIFEncoder!
  for i from 0 til FRAMES
    t = i / FRAMES
    data = new Uint8Array(SIZE * SIZE * 4)
    for y from 0 til SIZE => for x from 0 til SIZE
      [r, g, b] = f x + 0.5, y + 0.5, t
      o = (y * SIZE + x) * 4
      data[o] = r; data[o + 1] = g; data[o + 2] = b; data[o + 3] = 255
    palette = quantize data, 256
    enc.write-frame applyPalette(data, palette), SIZE, SIZE, {palette, delay: DELAY}
  enc.finish!
  fs.write-file-sync path.join(outdir, "#name.gif"), Buffer.from(enc.bytes!)
  index.push {name, width: SIZE, height: SIZE}
fs.write-file-sync path.join(outdir, \index.json), JSON.stringify(index)
console.log "[build-patterns] #{index.length} patterns -> #outdir"
