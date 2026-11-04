module.exports =
  pkg:
    extend: {name: '@servebase/auth', path: 'index.html'}
  interface: ->
    p = @parent.interface!
    f = (a,b) ~>
      Promise.resolve!
        .then -> p(a,b)
        .then (g) ~>
          if !(g and g.user.key) => return
          # @servebase/consent is under developmenet. may change any time
          # 同意過 ( localStorage 或 server 有紀錄 ) 就不再問; 否則跳出鎖定的 cover ( block consent-cookie ),
          # 按同意後才回到登入流程, 並記錄下來.
          o = {ns: \local, name: \consent-cookie}
          c = new consent {manager: @core.manager, global: g}
          # 用 ldcvmgr 顯示 ( 套用 i18n, 跟其它 cover 共用 z-index 管理 ), 不用 consent 內建的 prompt
          c.prompt = ~>
            @core.ldcvmgr.get o
              .then (r) -> if !r => lderror.reject 1018 else c._keep o
          c.ensure o .then -> return g
  init: (o) ->
    ({core}) <~ servebase.corectx _
    @manager = o.manager
    @core = core
