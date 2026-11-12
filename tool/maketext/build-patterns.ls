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
columns = [0 til SIZE / 8].map -> {p: rand!, k: 1 + Math.floor(rand! * 2)}
glyph = [0 til SIZE / 8].map -> [0 til SIZE / 8].map -> [0 til 16].map -> rand! > 0.45
bits = [0 til 26].map -> {x: rand! * SIZE, y: rand! * SIZE, p: rand!, w: 1.5 + rand! * 2, h: 1 + rand! * 1.5}
balls = [0 til 7].map -> {x: rand! * SIZE, y: rand! * SIZE, r: 4 + rand! * 7}

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

  # 以下: 第二批
  dots: (x, y, t) ->
    # 每格 24, 斜向移動一格
    dx = ((x - 24 * t) %% 24) - 12
    dy = ((y - 24 * t) %% 24) - 12
    mix [255 232 242], [255 77 141], smooth(8 - Math.hypot(dx, dy))
  zigzag: (x, y, t) ->
    zig = 16 * Math.abs(((x / 32) % 1) * 2 - 1)
    band = Math.floor(((y + zig - 32 * t) %% 32) / 16)
    if band => [0 168 150] else [255 210 63]
  fire: (x, y, t) ->
    v = Math.sin(TAU * (x / SIZE + t)) + Math.sin(TAU * (2 * y / SIZE + 2 * t)) + Math.sin(TAU * ((x + 2 * y) / SIZE + t))
    v = (v + 3) / 6
    if v < 0.5 => mix [110 0 0], [255 80 0], v * 2 else mix [255 80 0], [255 230 90], (v - 0.5) * 2
  ocean: (x, y, t) ->
    a = Math.abs Math.sin(TAU * (x / SIZE + 0.2 * Math.sin(TAU * (y / SIZE + t))))
    b = Math.abs Math.sin(TAU * (2 * y / SIZE + 0.2 * Math.sin(TAU * (x / SIZE - t))))
    mix [0 60 130], [170 240 255], Math.pow(1 - a * b, 6)
  galaxy: (x, y, t) ->
    v = Math.sin(TAU * (x / SIZE + t)) + Math.sin(TAU * ((x + y) / SIZE - t)) + Math.sin(TAU * (2 * y / SIZE))
    c = mix [12 6 40], hsl(0.75 + v / 12, 0.8, 0.45), smooth((v + 1) / 4)
    for s in stars
      dx = Math.abs(x - s.x); dx = Math.min(dx, SIZE - dx)
      dy = Math.abs(y - s.y); dy = Math.min(dy, SIZE - dy)
      b = (0.4 + 0.6 * Math.pow(Math.max(0, Math.sin(TAU * (t + s.p))), 2)) * smooth(1.2 - Math.hypot(dx, dy) / s.r)
      c = mix c, [255 255 255], b
    c
  pastel: (x, y, t) -> hsl((x - y) / SIZE + t, 0.75, 0.8)
  matrix: (x, y, t) ->
    col = Math.floor(x / 8)
    {p, k} = columns[col]
    head = (p * SIZE + k * SIZE * t) %% SIZE
    d = (head - y) %% SIZE
    b = Math.max(0, 1 - d / 44)
    # 字元: 8x8 的格子裡亮一部分
    lit = glyph[col][Math.floor(y / 8)][(x % 8 >> 1) + 4 * (y % 8 >> 1)]
    c = mix [0 12 0], [0 255 90], b * (if lit => 1 else 0.25)
    if d < 2 => mix c, [200 255 210], 0.8 else c
  lava: (x, y, t) ->
    v = Math.sin(TAU * (x / SIZE + t)) * Math.cos(TAU * (y / SIZE - t)) + 0.5 * Math.sin(TAU * (2 * (x + y) / SIZE + t))
    c = mix [110 8 0], [255 120 0], smooth(v * 2 + 0.5)
    mix c, [255 230 120], smooth((v - 0.9) * 4)
  aurora: (x, y, t) ->
    b = 0.5 + 0.5 * Math.sin(TAU * (2 * x / SIZE + 0.25 * Math.sin(TAU * (y / SIZE - t)) - t))
    mix [8 16 48], hsl(0.36 + 0.4 * (0.5 + 0.5 * Math.sin(TAU * (y / SIZE + t))), 0.9, 0.55), Math.pow(b, 2)
  shimmer: (x, y, t) ->
    base = mix [176 120 24], [255 214 96], 0.5 + 0.5 * Math.sin(TAU * 2 * (x - y) / SIZE)
    mix base, [255 255 240], 0.85 * Math.pow(Math.max(0, Math.cos(TAU * ((x + y) / SIZE - t))), 12)
  hearts: (x, y, t) ->
    # 每格 48, 心形隨時間脈動
    r = 13 * (1 + 0.15 * Math.sin(TAU * t))
    X = ((x %% 48) - 24) / r
    Y = -((y %% 48) - 22) / r
    v = Math.pow(X * X + Y * Y - 1, 3) - X * X * Y * Y * Y
    if v < 0 => [235 40 100] else [255 214 228]
  confetti: (x, y, t) ->
    c = [255 252 245]
    for s in bits
      dx = Math.abs(x - s.x); dx = Math.min(dx, SIZE - dx)
      cy = (s.y + SIZE * t) %% SIZE
      dy = Math.abs(y - cy); dy = Math.min(dy, SIZE - dy)
      if dx < s.w and dy < s.h => c = hsl(s.p + t, 0.85, 0.55)
    c
  ripples: (x, y, t) ->
    dx = Math.abs(x - 48); dx = Math.min(dx, SIZE - dx)
    dy = Math.abs(y - 48); dy = Math.min(dy, SIZE - dy)
    v = Math.sin(TAU * (Math.hypot(dx, dy) / 16 - t))
    mix [20 90 200], [140 220 255], v * 0.5 + 0.5
  scanline: (x, y, t) ->
    gx = Math.min(x % 16, 16 - x % 16); gy = Math.min(y % 16, 16 - y % 16)
    c = mix [14 6 30], [255 40 200], smooth(1.5 - Math.min(gx, gy))
    dy = Math.abs(y - SIZE * t); dy = Math.min(dy, SIZE - dy)
    mix c, [80 240 255], smooth(1 - dy / 10)
  sunset: (x, y, t) -> hsl(0.95 + 0.12 * (0.5 + 0.5 * Math.sin(TAU * (y / SIZE - t))), 0.9, 0.6)
  camo: (x, y, t) ->
    v = Math.sin(TAU * (x / SIZE + 0.1 * Math.sin(TAU * t))) + Math.sin(TAU * (2 * y / SIZE + x / SIZE)) + 0.6 * Math.sin(TAU * (3 * (x - y) / SIZE + t))
    [[72 84 50] [110 120 70] [150 140 100] [50 45 35]][Math.max(0, Math.min(3, Math.floor((v + 2.6) / 1.3)))]
  marble: (x, y, t) ->
    v = Math.sin(TAU * (2 * x / SIZE + 0.6 * Math.sin(TAU * (y / SIZE + t)) + 0.3 * Math.sin(TAU * (2 * y / SIZE - x / SIZE))))
    c = mix [235 232 228], [200 196 190], 0.5 + 0.5 * Math.sin(TAU * (y / SIZE + t))
    mix c, [70 60 80], Math.pow(1 - Math.abs(v), 8)
  bubbles: (x, y, t) ->
    c = mix [10 70 160], [30 160 220], 0.5 + 0.5 * Math.sin(TAU * y / SIZE)
    for s in balls
      dx = Math.abs(x - s.x); dx = Math.min(dx, SIZE - dx)
      cy = (s.y - SIZE * t) %% SIZE
      dy = Math.abs(y - cy); dy = Math.min(dy, SIZE - dy)
      d = Math.hypot(dx, dy)
      c = mix c, [220 245 255], smooth(1.4 - Math.abs(d - s.r)) * 0.9
      # 左上的反光
      c = mix c, [255 255 255], smooth(1.2 - Math.hypot(dx + s.r * 0.4, (y - cy) + s.r * 0.4))
    c
  zebra: (x, y, t) ->
    v = Math.sin(TAU * (3 * x / SIZE + 0.35 * Math.sin(TAU * (2 * y / SIZE + t)) - t))
    mix [250 250 245], [20 20 20], smooth(v * 3 + 0.5)
  argyle: (x, y, t) ->
    # 菱格
    u = Math.abs(((x + y) %% 48) - 24); w = Math.abs(((x - y) %% 48) - 24)
    c = if (Math.floor((x + y) / 48) + Math.floor((x - y + SIZE) / 48)) % 2 => [40 90 160] else [200 60 70]
    if Math.min(u, w) < 1 => [250 240 220] else c

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
