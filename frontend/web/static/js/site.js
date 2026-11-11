ldc.register('locales', [], function(){
  return {
    "@servebase/navtop": {
      en: {
        login: "登入",
        signup: "註冊",
        settings: "Settings",
        logout: "Logout"
      },
      "zh-TW": {
        login: "登入",
        signup: "註冊",
        settings: "個人設定",
        logout: "登出"
      }
    }
  };
});
ldc.register('corecfg', ['locales'], function(arg$){
  var locales;
  locales = arg$.locales;
  return function(){
    var this$ = this;
    return {
      i18n: {
        locales: locales
      },
      manager: new block.manager({
        registry: function(arg$){
          var ns, name, version, path, type;
          ns = arg$.ns, name = arg$.name, version = arg$.version, path = arg$.path, type = arg$.type;
          console.log("mgr (dec=" + this$.global.version + "): ", {
            ns: ns,
            name: name,
            version: version,
            path: path,
            type: type
          });
          path = path || (type === 'block'
            ? 'index.html'
            : type ? "index.min." + type : 'index.min.js');
          path = path + "?dec=" + (this$.global.version || '');
          if (ns === 'local') {
            if (name === 'error' || name === 'cover') {
              return "/modules/" + name + "/" + path;
            }
            return "/modules/block/" + name + "/" + path;
          }
          return "/assets/lib/" + name + "/" + (version || 'main') + "/" + path;
        }
      }),
      auth: {
        authpanel: {
          ns: 'local',
          name: "authpanel"
        }
      },
      challenge: {
        sitekey: '1x00000000000000000000AA',
        clear: '/__cf-mock/clear'
      }
    };
  };
});