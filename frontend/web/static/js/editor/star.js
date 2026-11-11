var tpl, style, star;
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
    var node;
    this.list = list;
    style.textContent = list.map(function(it){
      return "[data-star=\"" + it + "\"]";
    }).join(',') + (list.length ? '{color:#f5b301 !important;opacity:1 !important}' : '');
    if (node = document.querySelector('.mt-star-filter')) {
      node.classList.toggle('d-none', !list.length);
    }
    if (!list.length && this.filter === 'starred') {
      return this.show('all');
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
  toggle: function(name){
    var this$ = this;
    return this.core().then(function(core){
      return core.auth.ensure();
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
    this.filter = filter;
    Array.from(document.querySelectorAll('[data-star-filter]')).map(function(it){
      return it.classList.toggle('active', it.dataset.starFilter === filter);
    });
    return editor.gallery.show(filter === 'starred' ? this.list : null);
  }
};
if (tpl) {
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
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}