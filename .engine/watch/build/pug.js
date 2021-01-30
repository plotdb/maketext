// Generated by LiveScript 1.6.0
(function(){
  var fs, fsExtra, pug, livescript, stylus, path, jsYaml, marked, aux, cwd, lc, mdOptions, resolve, pugExtapi, main;
  fs = require('fs');
  fsExtra = require('fs-extra');
  pug = require('pug');
  livescript = require('livescript');
  stylus = require('stylus');
  path = require('path');
  jsYaml = require('js-yaml');
  marked = require('marked');
  aux = require('./aux');
  cwd = path.resolve(process.cwd());
  lc = {
    i18n: {}
  };
  mdOptions = {
    html: {
      breaks: true,
      renderer: new marked.Renderer()
    }
  };
  marked.setOptions(mdOptions.html);
  resolve = function(fn, src, opt){
    var e;
    if (!/^@/.exec(fn)) {
      return path.resolve(path.join(path.dirname(src), fn));
    }
    try {
      if (/^@\//.exec(fn)) {
        return require.resolve(fn.replace(/^@\//, ""));
      } else if (/^@static\//.exec(fn)) {
        return path.resolve(path.join(path.dirname(src), fn.replace(/^@static/, '/../../static/')));
      }
    } catch (e$) {
      e = e$;
      throw new Error("no such file or directory: " + fn);
    }
  };
  pugExtapi = {
    plugins: [{
      resolve: resolve
    }],
    filters: {
      'lsc': function(text, opt){
        return livescript.compile(text, {
          bare: true,
          header: false
        });
      },
      'lson': function(text, opt){
        return livescript.compile(text, {
          bare: true,
          header: false,
          json: true
        });
      },
      'stylus': function(text, opt){
        return stylus(text).set('filename', 'inline').define('index', function(a, b){
          a = (a.string || a.val).split(' ');
          return new stylus.nodes.Unit(a.indexOf(b.val));
        }).render();
      },
      'md': function(text, opt){
        return marked(text);
      }
    },
    md: marked,
    yaml: function(it){
      return jsYaml.safeLoad(fs.readFileSync(it));
    },
    yamls: function(dir){
      var ret;
      ret = fs.readdirSync(dir).map(function(it){
        return dir + "/" + it;
      }).filter(function(it){
        return /\.yaml$/.exec(it);
      }).map(function(it){
        var e;
        try {
          return jsYaml.safeLoad(fs.readFileSync(it));
        } catch (e$) {
          e = e$;
          return console.log("[ERROR@" + it + "]: ", e);
        }
      });
      return ret;
    }
  };
  main = {
    opt: function(opt){
      opt == null && (opt = {});
      if (opt.i18n) {
        pugExtapi.i18n = function(it){
          return opt.i18n.t(it);
        };
        (pugExtapi.filters || (pugExtapi.filters = {})).i18n = function(t, o){
          return opt.i18n.t(t);
        };
        return lc.i18n = opt.i18n;
      }
    },
    map: function(list){
      return list.filter(function(it){
        return /^src\/pug/.exec(it);
      }).map(function(it){
        return {
          src: it,
          des: path.normalize(it.replace(/^src\/pug/, "static/").replace(/\.pug$/, ".html"))
        };
      });
    },
    compile: function(src, opt){
      opt == null && (opt = {});
      return pug.compile(fs.readFileSync(src).toString(), import$(import$({
        filename: src,
        basedir: path.join(cwd, 'src/pug/')
      }, pugExtapi), opt));
    },
    build: function(list){
      var _, lngs, ref$, consume;
      list = this.map(list);
      _ = function(lng){
        var intl, p, that, ref$;
        lng == null && (lng = '');
        intl = lng ? path.join("intl", lng) : '';
        p = lc.i18n.changeLanguage
          ? lc.i18n.changeLanguage((that = lng)
            ? that
            : ((ref$ = lc.i18n).options || (ref$.options = {})).fallbackLng)
          : Promise.resolve();
        return p.then(function(){
          var i$, ref$, len$, ref1$, src, des, desv, desh, code, t1, desvdir, ret, t2, desdir, e, results$ = [];
          for (i$ = 0, len$ = (ref$ = list).length; i$ < len$; ++i$) {
            ref1$ = ref$[i$], src = ref1$.src, des = ref1$.des;
            desv = des.replace('static/', path.join('.view', intl) + "/").replace(/\.html$/, '.js');
            desh = des.replace('static/', path.join('static', intl) + "/");
            if (!fs.existsSync(src) || aux.newer(desv, src)) {
              continue;
            }
            code = fs.readFileSync(src).toString();
            try {
              t1 = Date.now();
              if (/^\/\/- ?module ?/.exec(code)) {
                continue;
              }
              if (fs.existsSync(src) && !aux.newer(desv, src)) {
                desvdir = path.dirname(desv);
                fsExtra.ensureDirSync(desvdir);
                ret = pug.compileClient(code, import$({
                  filename: src,
                  basedir: path.join(cwd, 'src/pug/')
                }, pugExtapi));
                ret = " (function() { " + ret + "; module.exports = template; })() ";
                fs.writeFileSync(desv, ret);
                t2 = Date.now();
                console.log("[BUILD] " + src + " --> " + desv + " ( " + (t2 - t1) + "ms )");
              }
              if (!/^\/\/- ?(view|module) ?/.exec(code)) {
                desdir = path.dirname(desh);
                fsExtra.ensureDirSync(desdir);
                fs.writeFileSync(desh, pug.render(code, import$({
                  filename: src,
                  basedir: path.join(cwd, 'src/pug/')
                }, pugExtapi)));
                t2 = Date.now();
                results$.push(console.log("[BUILD] " + src + " --> " + desh + " ( " + (t2 - t1) + "ms )"));
              }
            } catch (e$) {
              e = e$;
              console.log(("[BUILD] " + src + " failed: ").red);
              results$.push(console.log(e.message.toString().red));
            }
          }
          return results$;
        });
      };
      lngs = [''].concat(((ref$ = lc.i18n).options || (ref$.options = {})).lng || []);
      consume = function(i){
        i == null && (i = 0);
        if (i >= lngs.length) {
          return;
        }
        return _(lngs[i]).then(function(){
          return consume(i + 1);
        });
      };
      consume();
    },
    unlink: function(list){
      var i$, len$, ref$, src, des, e, results$ = [];
      list = this.map(list);
      for (i$ = 0, len$ = list.length; i$ < len$; ++i$) {
        ref$ = list[i$], src = ref$.src, des = ref$.des;
        try {
          if (fs.existsSync(des)) {
            fs.unlinkSync(des);
            console.log(("[BUILD] " + src + " --> " + des + " deleted.").yellow);
          }
          des = des.replace('static/', '.view/').replace(/\.html$/, '.js');
          if (fs.existsSync(des)) {
            fs.unlinkSync(des);
            results$.push(console.log(("[BUILD] " + src + " --> " + des + " deleted.").yellow));
          }
        } catch (e$) {
          e = e$;
          results$.push(console.log(e));
        }
      }
      return results$;
    },
    extapi: pugExtapi
  };
  module.exports = main;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
