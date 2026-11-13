# 版本參數: 沿用載入這個檔 ( core 的打包 ) 的 ?v=, 給登入面板的 bundle 網址用 ( 部署後不會拿到舊的 )
# document.currentScript 只在 script 執行當下有值, 要在最上層取
ver = ((document.currentScript and /\?v=[^&]*/.exec(document.currentScript.src)) or [''])[0]

ldc.register \locales, <[]>, ->
  "@servebase/navtop":
    en:
      login: "Login"
      signup: "Sign Up"
      settings: "Settings"
      logout: "Logout"
    "zh-TW":
      login: "登入"
      signup: "註冊"
      settings: "個人設定"
      logout: "登出"


ldc.register \corecfg, <[locales]>, ({locales}) -> ->
  # corecfg function will be run in `core` context.
  # site defaults to en: core falls back to `navigator.language` when there is no `lng` cookie,
  # so seed the cookie. explicit choices ( ?lng= / ?setlng= ) still override.
  if httputil? and !httputil.cookie(\lng) => httputil.cookie \lng, \en, {path: \/}
  i18n: locales: locales
  manager: new block.manager registry: ({ns, name, version, path, type}) ~>
    # access @global.version in core context
    # only customized core will show following registry detail
    console.log "mgr (dec=#{@global.version}): ", {ns, name, version, path, type}
    path = path or if type == \block => \index.html
    else if type => "index.min.#type" else 'index.min.js'
    path = "#{path}?dec=#{@global.version or ''}"
    if ns == \local =>
      if name in <[error cover]> => return "/modules/#name/#path"
      return "/modules/block/#name/#path"
    "/assets/lib/#{name}/#{version or 'main'}/#path"
  # login / signup panel: src/pug/modules/block/authpanel
  auth:
    authpanel: {ns: \local, name: "authpanel"}
    # 面板與相依的 js / css 打包成一個檔 ( bundle.json 的 block.auth ), 一次載入
    bundle: "/assets/bundle/auth.min.html#ver"
  # cloudflare challenge ( turnstile pre-clearance ), see @servebase/captcha src/challenge.ls.
  # only the dev mock ( backend/engine/cf-challenge-mock.ls, on when config.dev.cf-challenge-mock is set )
  # is wired up here: cloudflare's test sitekey ( always passes ) and the mock's clear endpoint.
  # production ( maketext.io ) has no pre-clearance widget yet, so it gets none.
  challenge: if /\.test$/.test(location.hostname) => {sitekey: \1x00000000000000000000AA, clear: \/__cf-mock/clear}
