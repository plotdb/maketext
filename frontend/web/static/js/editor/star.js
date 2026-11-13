var tpl, style, star, n, wrap, bar;
tpl = document.querySelector('#mt-core-scripts');
style = document.createElement('style');
document.head.appendChild(style);
star = window.mtStar = {
  list: [],
  filter: 'all',
  has: function(name){
    return in$(name, this.list);
  },
  set: function(list){
    var n;
    this.list = list;
    style.textContent = list.map(function(it){
      return "[data-star=\"" + it + "\"]";
    }).join(',') + (list.length ? '{color:#f5b301 !important;opacity:1 !important}' : '');
    if (n = document.querySelector('[data-star-filter=starred] .mt-count')) {
      n.textContent = list.length || '';
    }
    if (this.filter === 'starred') {
      return this.show('starred');
    }
  },
  fetch: function(){
    var this$ = this;
    return ld$.fetch('/api/star', {
      method: 'GET'
    }, {
      type: 'json'
    }).then(function(list){
      list == null && (list = []);
      return this$.set(list);
    });
  },
  core: function(){
    var that;
    if (that = this._core) {
      return that;
    }
    return this._core = new Promise(function(res, rej){
      var s;
      s = document.createElement('script');
      s.src = tpl.content.querySelector('script').getAttribute('src');
      s.onload = res;
      s.onerror = rej;
      return document.body.appendChild(s);
    }).then(function(){
      var this$ = this;
      return new Promise(function(res, rej){
        ldc.register(['core'], function(arg$){
          var core;
          core = arg$.core;
          return core.init().then(function(){
            return res(core);
          });
        });
        return ldc.init();
      })['catch'](function(e){
        this$._core = null;
        return Promise.reject(e);
      });
    });
  },
  panel: function(core){
    var a, this$ = this;
    a = core.auth;
    if (a._authpanel) {
      return Promise.resolve();
    }
    return this._panel = this._panel || a.get().then(function(g){
      var v;
      if (g && g.user && g.user.key) {
        return;
      }
      v = (/\?v=[^&]*/.exec(tpl.content.querySelector('script').getAttribute('src')) || [''])[0];
      return core.manager.debundle({
        url: "/assets/bundle/auth.min.html" + v
      })['catch'](function(e){
        return console.warn("[maketext] auth bundle:", e);
      }).then(function(){
        return core.manager.from({
          ns: 'local',
          name: 'authpanel'
        }, {
          autoTransform: 'i18n',
          root: document.body,
          data: {
            auth: a,
            zmgr: core.zmgr
          }
        });
      }).then(function(p){
        return a._authpanel = p['interface'];
      });
    })['catch'](function(e){
      this$._panel = null;
      return console.warn("[maketext] authpanel preload:", e);
    });
  },
  preload: function(){
    var this$ = this;
    return this.core().then(function(core){
      return this$.panel(core);
    })['catch'](function(e){
      return console.warn("[maketext] core preload:", e);
    });
  },
  toggle: function(name){
    var this$ = this;
    return this.core().then(function(core){
      return this$.panel(core).then(function(){
        return core.auth.ensure();
      });
    }).then(function(){
      return this$.fetch();
    }).then(function(){
      var add;
      add = !this$.has(name);
      mtTrack(add ? 'star' : 'unstar', {
        effect: name
      });
      return ld$.fetch("/api/star/" + encodeURIComponent(name), {
        method: add ? 'PUT' : 'DELETE'
      }, {
        type: 'json'
      }).then(function(){
        return this$.set(add
          ? this$.list.concat([name])
          : this$.list.filter(function(it){
            return it !== name;
          }));
      });
    })['catch'](function(e){
      if (e && e.id === 1000) {
        return;
      }
      return console.warn("[maketext] star:", e);
    });
  },
  show: function(filter){
    var n;
    this.filter = filter;
    Array.from(document.querySelectorAll('[data-star-filter]')).map(function(it){
      return it.classList.toggle('active', it.dataset.starFilter === filter);
    });
    editor.gallery.show(filter === 'starred' ? this.list : null);
    if (n = document.querySelector('.mt-star-empty')) {
      return n.classList.toggle('d-none', !(filter === 'starred' && !this.list.length));
    }
  }
};
if (tpl) {
  if (n = document.querySelector('[data-star-filter=all] .mt-count')) {
    n.textContent = Object.keys(effects).length;
  }
  if (wrap = document.querySelector('.mt-star-filter-wrap')) {
    bar = wrap.querySelector('.mt-star-filter');
    document.addEventListener('scroll', function(){
      return bar.classList.toggle('fixed', wrap.getBoundingClientRect().top < (window.innerWidth <= 576 ? 150 : 84));
    });
  }
  document.addEventListener('click', function(e){
    var n;
    if (n = e.target.closest('[data-star]')) {
      e.preventDefault();
      return star.toggle(n.dataset.star);
    }
    if (n = e.target.closest('[data-star-filter]')) {
      e.preventDefault();
      return star.show(n.dataset.starFilter);
    }
  });
  idle(function(){
    return star.fetch()['catch'](function(e){
      return console.warn("[maketext] star:", e);
    });
  }, 1000);
  idle(function(){
    return star.preload();
  }, 4000);
  document.addEventListener('pointerover', function(e){
    if (e.target.closest('[data-star], [data-star-filter]')) {
      return star.preload();
    }
  });
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}