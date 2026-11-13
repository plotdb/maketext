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
    if (n = document.querySelector '[data-star-filter=starred] .mt-count') => n.textContent = list.length or ''
    # 收藏頁裡取消到一個不剩時顯示空的提示 ( 不跳回全部 )
    if @filter == \starred => @show \starred
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
  # 登入面板 ( block, src/pug/modules/block/authpanel ) 要串連載入多層 html / js / css, 正式站約 4 秒;
  # 事先建好 ( 不顯示 ), 按收藏時就能馬上跳出. 同 @servebase/auth 的 ui.authpanel, 但不顯示 loader.
  # 已登入的不需要 ( 也避免觸發面板裡的 consent 檢查 )
  panel: (core) ->
    a = core.auth
    if a._authpanel => return Promise.resolve!
    @_panel = @_panel or a.get!then (g) ->
      if g and g.user and g.user.key => return
      # 面板用到的 block 與相依的 js / css 打包成一個檔 ( bundle.json 的 block.auth ), 一次載入,
      # 不必逐層抓. 版本參數沿用 core script 的 ?v=
      v = (/\?v=[^&]*/.exec(tpl.content.querySelector(\script).getAttribute(\src)) or [''])[0]
      core.manager.debundle {url: "/assets/bundle/auth.min.html#v"}
        .catch (e) -> console.warn "[maketext] auth bundle:", e
        # 與 src/ls/site.ls 的 auth.authpanel 相同
        .then -> core.manager.from {ns: \local, name: \authpanel}, {autoTransform: \i18n, root: document.body, data: {auth: a, zmgr: core.zmgr}}
        .then (p) -> a._authpanel = p.interface
    .catch (e) ~>
      @_panel = null
      console.warn "[maketext] authpanel preload:", e
  preload: -> @core!then((core) ~> @panel core).catch (e) -> console.warn "[maketext] core preload:", e
  toggle: (name) ->
    @core!
      # 預載還沒完成時等它, 不要另外再建一個面板
      .then (core) ~> @panel(core).then -> core.auth.ensure!
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
    if (n = document.querySelector \.mt-star-empty) => n.classList.toggle \d-none, !(filter == \starred and !@list.length)

if tpl =>
  if (n = document.querySelector '[data-star-filter=all] .mt-count') => n.textContent = Object.keys(effects).length
  # 篩選列捲過收合的編輯列 ( 84px, 窄螢幕 150px, 同 gallery.styl ) 時固定在它下方
  if (wrap = document.querySelector \.mt-star-filter-wrap) =>
    bar = wrap.querySelector \.mt-star-filter
    document.addEventListener \scroll, ->
      bar.classList.toggle \fixed, wrap.getBoundingClientRect!top < (if window.innerWidth <= 576 => 150 else 84)
  document.addEventListener \click, (e) ->
    if (n = e.target.closest '[data-star]') =>
      e.prevent-default!
      return star.toggle n.dataset.star
    if (n = e.target.closest '[data-star-filter]') =>
      e.prevent-default!
      star.show n.dataset.star-filter

  idle (-> star.fetch!catch (e) -> console.warn "[maketext] star:", e), 1000
  # 預載登入面板: 閒置時, 或游標移到收藏 / 篩選上時 ( 比閒置早就提前開始 )
  idle (-> star.preload!), 4000
  document.addEventListener \pointerover, (e) ->
    if e.target.closest('[data-star], [data-star-filter]') => star.preload!
