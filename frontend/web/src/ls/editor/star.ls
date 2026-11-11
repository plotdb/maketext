# 收藏 ( star ): 登入後可收藏效果, 首頁可只看收藏的效果. 後端見 backend/maketext/index.ls 的 /api/star
#
# - 收藏清單以 GET /api/star 取得, 未登入時是空的, 不需要 servebase core
# - 第一次按收藏時才載入 servebase core ( src/pug/modules/mt/core.pug ), 未登入就跳出登入面板.
#   core 也負責在 ld$.fetch 帶上 csrf token, 寫入 ( PUT / DELETE ) 前一定要先初始化
# - gallery 的項目會被 clusterize 依原始 html 重建, 收藏的標示不寫在 DOM 上,
#   而是產生一段 css ( 以 data-star 選擇 ), 重建後仍然有效
# 沒有 core 的頁面 ( /api/editor/0.1/ ) 不提供收藏
tpl = document.querySelector \#mt-core-scripts

style = document.createElement \style
document.head.appendChild style

star = window.mt-star = do
  list: []
  filter: \all
  has: (name) -> name in @list
  set: (list) ->
    @list = list
    style.textContent = list.map(-> "[data-star=\"#it\"]").join(',') + (if list.length => '{color:#f5b301 !important;opacity:1 !important}' else '')
    if (node = document.querySelector \.mt-star-filter) => node.classList.toggle \d-none, !list.length
    if !list.length and @filter == \starred => @show \all
  fetch: -> ld$.fetch \/api/star, {method: \GET}, {type: \json} .then (list = []) ~> @set list
  # servebase core, 第一次用到時才載入
  core: ->
    if @_core => return that
    @_core = new Promise (res, rej) ->
      s = document.createElement \script
      s.src = tpl.content.querySelector(\script).getAttribute \src
      s.onload = res
      s.onerror = rej
      document.body.appendChild s
    .then -> new Promise (res, rej) ->
      ldc.register <[core]>, ({core}) -> core.init!then -> res core
      # ldc 平常在 DOMContentLoaded 時初始化, 這裡是之後才載入的, 要自己呼叫
      ldc.init!
    .catch (e) ~>
      @_core = null
      Promise.reject e
  toggle: (name) ->
    @core!
      .then (core) -> core.auth.ensure!
      # 剛登入時重新取得這個帳號的收藏
      .then ~> @fetch!
      .then ~>
        add = !@has(name)
        mt-track (if add => \star else \unstar), {effect: name}
        ld$.fetch "/api/star/#{encodeURIComponent name}", {method: (if add => \PUT else \DELETE)}, {type: \json}
          .then ~> @set(if add => @list ++ [name] else @list.filter(-> it != name))
      .catch (e) ->
        # 關掉登入面板時是 1000 ( 未登入 ), 不是錯誤
        if e and e.id == 1000 => return
        console.warn "[maketext] star:", e
  show: (filter) ->
    @filter = filter
    Array.from(document.querySelectorAll '[data-star-filter]').map -> it.classList.toggle \active, it.dataset.starFilter == filter
    editor.gallery.show(if filter == \starred => @list else null)

if tpl =>
  document.addEventListener \click, (e) ->
    if (n = e.target.closest '[data-star]') =>
      e.prevent-default!
      return star.toggle n.dataset.star
    if (n = e.target.closest '[data-star-filter]') =>
      e.prevent-default!
      star.show n.dataset.star-filter

  idle (-> star.fetch!catch (e) -> console.warn "[maketext] star:", e), 1000
