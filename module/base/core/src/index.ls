servebase =
  # last resort if we don't have inited core.
  reset: -> auth.reset!
  corectx: (cb) ->
    new Promise (res, rej) ->
      ret = ldc.register <[core]>, (o) ->
        o.core.init!
          .then -> if cb => cb.apply o.core, [o]
          .then res
          .catch rej
      ldc.init ret
  config: (o = {}) ->
    if @_inited =>
      console.warn """
      [@servebase/core] `servebase.config` is called after `@servebase/core` is initialized.
      [@servebase/core] This may lead to inconsistent behavior.
      """
    @_cfg = o
  _i18n-init: ->
    # TODO to optimize, we may delay or completely ignore i18n, since not every service need i18n
    # TODO we should at least provide a dummy i18n so i18n.t will work
    @i18n = i18n = if @_cfg.{}i18n.driver => that else if i18next? => i18next else undefined
    @hint.{}i18n.placeholder = @_cfg.i18n.placeholder or false
    if !i18n? => return Promise.resolve!
    block.i18n.use i18n
    i18ncfg = {
      supportedLngs: <[en zh-TW]>
      fallbackNS: '', defaultNS: ''
      # pitfall: Namespaced key with spaces doesn't work
      # workaround: explicitly provide separator
      #  - https://github.com/i18next/i18next/issues/1670
      keySeparator: '.', nsSeparator: ':'
    }
    if @_cfg.i18n.cfg => i18ncfg = i18ncfg <<< @_cfg.i18n.cfg
    # we have a typo in `supportedLngs` (missing `s`) for a long time, and we fixed it.
    # `supportedLng` for backward compatibility, we manually copy it.
    if i18ncfg.supportedLng =>
      i18ncfg.supportedLngs = i18ncfg.supportedLng
      delete i18ncfg.supportedLng
    # auto construct fallbacklng with object-based style if not provided.
    # fallback order is determined by supportedLngs
    if !i18ncfg.fallbackLng =>
      i18ncfg.fallbackLng = Object.fromEntries(
        i18ncfg.supportedLngs.map (lng) -> [lng, i18ncfg.supportedLngs.filter(-> it != lng)]
      ) <<< default: i18ncfg.supportedLngs
    Promise.resolve!
      .then -> i18n.init i18ncfg
      .then -> if i18nextBrowserLanguageDetector? => i18n.use i18nextBrowserLanguageDetector
      .then ~>
        for ns, obj of (@_cfg.i18n.locales or {}) =>
          for lng, res of obj => i18n.add-resource-bundle lng, ns, res, true, true
        lng = (
          (if httputil? => (httputil.qs(\lng) or httputil.cookie(\lng)) else null) or
          navigator.language or navigator.userLanguage or ''
        )
        if httputil? and httputil.qs(\setlng) =>
          lng = httputil.qs(\setlng)
          httputil.cookie \lng, lng, {path: \/}
        if !(lng in i18ncfg.supportedLngs) =>
          lng = if /-/.exec(lng) and (lng.split(\-).0 in (i18ncfg.supportedLngs)) => lng.split(\-).0
          else i18ncfg.supportedLngs.0 or \en
        console.log "[@servebase/core][i18n] use language: ", lng
        i18n.changeLanguage lng
      .then ->
        i18n.on \languageChanged, (lng) ->
          if httputil? =>
            console.log "[@servebase/core][i18n] language changed to #lng / cookie updated"
            httputil.cookie \lng, lng, {path: \/}
          else
            console.log "[@servebase/core][i18n] language changed to #lng / no httputil, skip cookie update"
        block.i18n.use i18n
  _init: (o) ->
    # _init is usually called with provided context (the core context, instead of `servebase`),
    # so we have to access `servebase` directly with its name.
    servebase._inited = true
    if o? => servebase._cfg = o
    @_cfg = servebase._cfg or {}
    # similarly, corecfg will be called with `this` as its context
    # so it can access core context.
    if typeof(@_cfg) == \function => @_cfg = @_cfg!
    @ <<< global: {}, user: {}
    # cloudflare challenge: wrap ld$.fetch before any api call. config from corecfg, not
    # /api/auth/info - that api may be the one challenged. see @servebase/captcha challenge.ls
    @challenge = new captcha.cfchallenge(@_cfg.challenge or {})
    @challenge.wrap ld$
    @ <<<
      hint: {} # additional hints for config and status.
      zmgr: new zmgr!
      manager: @_cfg.manager or new block.manager do
        registry: ({ns, url, name, version, path, type}) ->
          if url => return that
          path = path or if type == \block => \index.html
          else if type => "index.min.#type" else 'index.min.js'
          if ns == \local =>
            if name in <[error cover]> => return "/modules/#name/#{path or 'index.html'}"
            return "/modules/block/#name/#{path or 'index.html'}"
          "/assets/lib/#{name}/#{version or 'main'}/#{path}"
    ldcover.zmgr @zmgr
    # prepare i18n as early as possible so modules won't accidentally use the uninited one.
    # e.g., ldcvmgr setup i18n related code when script is loaded - this may lead to issues
    # if we switch our i18n module later.
    # The best way is to implement in a way that switching module won't affect configs before,
    # which may need a certain degree of abstraction.
    <~ servebase._i18n-init.apply @ .then _
    @ <<<
      loader: new ldloader class-name: "ldld full", auto-z: true, base-z: null, zmgr: @zmgr.scope zmgr.splash
      captcha: new captcha manager: @manager, zmgr: @zmgr.scope zmgr.splash
      ldcvmgr: new ldcvmgr(
        manager: @manager
        error-cover: {ns: \local, name: "error", path: "0.html"}
        zmgr: @zmgr
      )

    # last resort when errors keep coming ( see melt down below ). a plain DOM splash
    # instead of `alert`, which blocks the whole page ( and browser automation ) once per error.
    # not relying on `ldcvmgr.fatal` since ldcvmgr version is decided by downstream projects.
    # the splash is built once and reused - re-attached if it's gone ( e.g. body wiped out ).
    # always returns a never-resolved Promise so callers stop right here.
    # customizable via corecfg `fatal`: a function ( called once ), or {message, action}.
    fatal = node: null, called: false
    @fatal = (e) ~>
      ret = new Promise (res, rej) ->
      cfg = @_cfg.fatal or {}
      if typeof(cfg) == \function =>
        if fatal.called => return ret
        fatal.called = true
        try
          cfg.call @, e
        catch e2
          console.error e2
        return ret
      if fatal.node =>
        if !document.body.contains(fatal.node) => document.body.appendChild fatal.node
        return ret
      zh = /^zh/.exec((@i18n and @i18n.language) or navigator.language or '')
      node = document.createElement \div
      node.className = \servebase-fatal
      node.setAttribute \style, [
        "position:fixed", "top:0", "left:0", "width:100%", "height:100%"
        "z-index:2147483647", "display:flex", "align-items:center"
        "justify-content:center", "background:rgba(0,0,0,0.5)"
        "font-family:sans-serif", "color:#333"
      ].join(';')
      box = document.createElement \div
      box.setAttribute \style, [
        "max-width:20rem", "margin:1rem", "padding:1.5rem", "border-radius:0.5rem"
        "background:white", "box-shadow:0 0.5rem 2rem rgba(0,0,0,0.3)", "text-align:center"
      ].join(';')
      msg = document.createElement \div
      msg.setAttribute \style, "margin-bottom:1.5rem;line-height:1.5"
      msg.textContent = cfg.message or if zh => "發生錯誤，請重新載入頁面後再試一次。"
      else "Something is wrong. Please reload and try again."
      btn = document.createElement \button
      btn.setAttribute \type, \button
      btn.setAttribute \style, [
        "padding:0.5rem 1.5rem", "border:none", "border-radius:0.25rem"
        "background:#333", "color:white", "cursor:pointer", "font-size:1rem"
      ].join(';')
      btn.textContent = cfg.action or if zh => "重新載入" else "Reload"
      btn.addEventListener \click, -> location.reload!
      box.appendChild msg
      box.appendChild btn
      node.appendChild box
      fatal.node = node
      document.body.appendChild node
      ret

    ethr = t: 0, c: 0
    err = new lderror.handler handler: (n, e) ~>
      # once melted down, stay there: no more error covers under the splash.
      if fatal.node or fatal.called => return @fatal e
      /*
      melt down mechanism - prevent infinite errors. errors limited to 4 in 500ms / 11 in 2s
      any unhandled error/rejection may trigger this handler again, which causes infinite errors
      e.g., Promise.reject(Promise.reject(new Error())) in @plotdb/block `_fetch`
      generate an additional rejection which is impossible to be caught.
      this bug in @plotdb/block is fixed, however in case of any possible bugs in the future -
      melt down mechanism is required.
      */
      t = Date.now!
      if ethr.t < t - 2000 => ethr <<< t: t, c: 0
      else if !ethr.t => ethr <<< t: t, c: 0
      else if ethr.t > t - 2000 and ethr.c > 10 or ethr.t > t - 500 and ethr.c > 3 =>
        return @fatal e
      ethr.c = (ethr.c or 0) + 1
      @ldcvmgr.get {ns: \local, name: \error, path: "#n.html"}, e
    @error = (e) -> err e
    @error.ignore = ->
      ids = Array.from(arguments)
      (e) -> if !(lderror.id(e) in ids) => return Promise.reject e

    @ <<<
      erratum: new erratum handler: err
      auth: new auth do
        ldcvmgr: @ldcvmgr
        manager: @manager
        zmgr: @zmgr
        loader: @loader
        authpanel: if @_cfg.auth => @_cfg.auth.authpanel else null

    if ldc? => ldc.action \ldcvmgr, @ldcvmgr

    @update = (g) -> @ <<< {global: g, user: (g.user or {})}
    @auth.on \error, @error
    @auth.on \logout, -> window.location.replace '/'

    @manager.init!
      .then ~>
        # PERF TODO block.i18n.use and manager.init are quite fast.
        # we may provide an anonymous initialization
        # to prevent fetching at loading time to speed up FCP.
        @auth.get!
      .then (g) ~>
        @global = g
        @user = g.user
        @captcha.init g.captcha
      .then ~>
        @auth.on \update, (g) ~> @update g
        # prepare authpanel. involving @plotdb/block creation.
        # should delay until we really have to trigger ui
        @

ldc.register \core, <[corecfg]>, ({corecfg}) ->
  if corecfg? => servebase.config corecfg
  init: proxise.once (o) -> servebase._init.apply @, [o]

if module? => module.exports = servebase
# merge rather than replace: this bundle is loaded with `defer`, so anything the page
# put on window.servebase from an inline script ( e.g. pugutil's +register-global )
# ran earlier and would otherwise be wiped out here.
else if window? =>
  window.servebase = (window.servebase or {}) <<< servebase
  # one object: code above uses both `@` and `servebase`.
  servebase = window.servebase
