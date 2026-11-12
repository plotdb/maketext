history.scrollRestoration = 'manual';
$(document).ready(function(){
  var svgHtml, editor, gallery, updateText, scrollto, hasStar, galleryRows, initSlider, initColorpicker, openEffect, clusterize, maketext, queries;
  svgHtml = function(e){
    return e.html.replace("<svg", "<svg width='100%' height='100%'");
  };
  window.editor = editor = {
    effects: effects,
    toggle: function(v){
      var svg;
      if (v == null) {
        v = !document.body.classList.contains('editing');
      }
      document.body.classList[!v ? 'remove' : 'add']('editing');
      if (!v) {
        svg = document.querySelector('#cooltext svg');
        svg.parentNode.removeChild(svg);
        return document.querySelector('#cooltext').style.height = '';
      }
    },
    config: {
      cur: {
        fontSize: 64
      },
      old: {}
    }
  };
  gallery = {
    state: {
      fontSize: 64,
      font: null
    },
    ver: 0,
    queue: [],
    timer: null,
    running: false
  };
  gallery.stale = function(item){
    return +(item.dataset.v || 0) !== this.ver;
  };
  gallery.sync = function(item){
    var ver, type, this$ = this;
    ver = this.ver;
    type = item.dataset.type;
    return Promise.all([
      mteffect.load(type), mtFont.of(type)['catch'](function(){
        return null;
      })
    ]).then(function(arg$){
      var e, font, inner, ref$, text, fontSize, background;
      e = arg$[0], font = arg$[1];
      inner = item.querySelector('.inner');
      if (!inner.querySelector('svg')) {
        inner.insertAdjacentHTML('beforeend', svgHtml(e));
      }
      if (font) {
        mtFont.apply(item, font);
      }
      item.classList.add('live');
      ref$ = this$.state, text = ref$.text, fontSize = ref$.fontSize, background = ref$.background;
      if (text != null) {
        Array.from(item.querySelectorAll('text')).map(function(it){
          return mtSetText(it, text);
        });
      }
      if (fontSize != null) {
        Array.from(item.querySelectorAll('text')).map(function(it){
          return it.style.fontSize = fontSize + "px";
        });
      }
      if (background != null) {
        item.querySelector('svg').style.background = background;
      }
      return item.dataset.v = ver;
    })['catch'](function(e){
      return console.warn("[maketext] gallery:", e);
    });
  };
  gallery.fallback = function(img){
    var item;
    item = img.closest('.item');
    item.dataset.v = -1;
    return this.enqueue(item.closest('.line'));
  };
  gallery.enqueue = function(line){
    var i$, ref$, len$, item;
    for (i$ = 0, len$ = (ref$ = Array.from(line.querySelectorAll('.item'))).length; i$ < len$; ++i$) {
      item = ref$[i$];
      if (this.stale(item) && !in$(item, this.queue)) {
        this.queue.push(item);
      }
    }
    return this.run();
  };
  gallery.run = function(){
    var step, this$ = this;
    if (this.running) {
      return;
    }
    this.running = true;
    step = function(){
      var item;
      while ((item = this$.queue.shift()) && !this$.stale(item)) {}
      if (!item) {
        return this$.running = false;
      }
      return this$.sync(item).then(function(){
        return requestAnimationFrame(step);
      });
    };
    return requestAnimationFrame(step);
  };
  gallery.set = function(k, v){
    var this$ = this;
    if (this.state[k] === v) {
      return;
    }
    this.state[k] = v;
    this.ver++;
    clearTimeout(this.timer);
    return this.timer = setTimeout(function(){
      return Array.from(document.querySelectorAll('.gallery .line')).filter(function(it){
        return it.style.visibility === 'visible';
      }).map(function(it){
        return this$.enqueue(it);
      });
    }, 120);
  };
  editor.gallery = gallery;
  updateText = function(node){
    var textInput, value;
    node = node || document.querySelector('#text-input');
    textInput = document.querySelector('#text-input');
    value = node.value || 'Hello World!';
    gallery.set('text', value);
    Array.from(document.querySelectorAll('#cooltext text')).map(function(it){
      return mtSetText(it, value);
    });
    if (textInput.value !== value && node !== textInput) {
      textInput.value = value;
    }
    return mtFrame.refresh();
  };
  window.scrollto = scrollto = function(node){
    return $('html,body').animate({
      scrollTop: $(node).offset().top
    }, 300);
  };
  document.querySelector('#landing input').addEventListener('keyup', function(e){
    if (e.keyCode === 13) {
      scrollto('#top');
    }
    return updateText(this);
  });
  document.querySelector('#text-input').addEventListener('input', function(){
    return updateText(this);
  });
  (function(){
    var n;
    n = document.querySelector('#text-input');
    n.addEventListener('focus', function(){
      return n.parentNode.classList.add('open');
    });
    return n.addEventListener('blur', function(){
      return n.parentNode.classList.remove('open');
    });
  })();
  editor.update = function(name, value){
    var svg;
    this.config.old = JSON.parse(JSON.stringify(this.config.cur));
    this.config.cur[name] = value;
    svg = document.querySelector('#cooltext svg');
    if (document.body.classList.contains('editing')) {
      this.effects[effects.type].js.watch(this.config.cur, this.config.old, svg);
      if (name === 'background') {
        svg.style.background = value;
      }
      if (name === 'fontSize') {
        Array.from(svg.querySelectorAll('text')).map(function(it){
          return it.style.fontSize = value + "px";
        });
      }
      mtPattern.apply(svg);
      mtFrame.refresh();
      return;
    }
    if (name === 'fontSize' || name === 'background') {
      return gallery.set(name, value);
    }
  };
  hasStar = !!document.querySelector('#mt-core-scripts');
  galleryRows = function(keys){
    var list, res$, i$, ref$, k, len$, html, to$, i, code, j$, j, d, thumb, link, star, num;
    res$ = [];
    for (i$ = 0, len$ = (ref$ = keys || (fn$())).length; i$ < len$; ++i$) {
      k = ref$[i$];
      if (effects[k]) {
        res$.push([k, effects[k]]);
      }
    }
    list = res$;
    html = [];
    for (i$ = 0, to$ = list.length; i$ < to$; i$ += 2) {
      i = i$;
      code = "";
      for (j$ = 0; j$ <= 1; ++j$) {
        j = j$;
        d = list[i + j];
        if (!d) {
          break;
        }
        thumb = "<img class=\"thumb\" src=\"/assets/thumb/" + d[0] + ".webp\" loading=\"lazy\" alt=\"" + d[0] + "\"\nonerror=\"editor.gallery.fallback(this)\">";
        link = "<a class=\"mt-effect-link\" href=\"/effect/" + d[0] + "/\" title=\"" + d[0] + " text effect\">&#8599;</a>";
        star = !hasStar
          ? ''
          : "<a class=\"mt-star\" href=\"#\" data-star=\"" + d[0] + "\" title=\"star\">&#9733;</a>";
        num = "<span class=\"mt-effect-no\">&#35;" + d[1].no + "</span>";
        code += "<div class=\"item\" data-type=\"" + d[0] + "\"><div class=\"inner\" style=\"background:" + d[1].bk + "\">" + thumb + "</div>" + num + star + link + "</div>";
      }
      html.push("<div class=\"line\" style=\"visibility:hidden\">" + code + "</div>");
    }
    return html;
    function fn$(){
      var results$ = [];
      for (k in effects) {
        results$.push(k);
      }
      return results$;
    }
  };
  gallery.show = function(keys){
    clusterize.update(galleryRows(keys));
    return document.dispatchEvent(new Event('scroll'));
  };
  initSlider = function(node, key, value){
    var n, x$;
    n = node.querySelector('.irs-input');
    n.setAttribute('data-name', key);
    x$ = $(n);
    x$.val(value['default']) || 0;
    x$.ionRangeSlider({
      min: value.min || 0,
      max: value.max || 100,
      step: value.step || 1,
      onChange: function(data){
        return editor.update(key, data.from);
      }
    });
    return x$;
  };
  initColorpicker = function(node, key, value){
    var ldcp;
    ldcp = new ldcolorpicker(node.querySelector('input'));
    return ldcp.on('change', function(it){
      var c;
      c = ldcolor.web(it);
      editor.update(key, c);
      return node.querySelector('.inner').style.background = c;
    });
  };
  document.querySelector('.gallery').addEventListener('click', function(e){
    var target, type;
    target = e.target;
    if (!(target && target.classList && target.classList.contains('item'))) {
      return;
    }
    type = target.getAttribute('data-type');
    if (!type) {
      return;
    }
    mtTrack('effect_select', {
      effect: type,
      from: 'gallery'
    });
    return mteffect.load(type).then(function(e){
      return openEffect(type, e);
    })['catch'](function(e){
      return console.warn("[maketext] editor:", e);
    });
  });
  window.openEffect = function(type){
    var node;
    if ((node = document.querySelector('#landing input')).value) {
      updateText(node);
    }
    mtTrack('effect_select', {
      effect: type,
      from: 'effect_page'
    });
    return mteffect.load(type).then(function(e){
      return openEffect(type, e);
    })['catch'](function(e){
      return console.warn("[maketext] editor:", e);
    });
  };
  openEffect = function(type, e){
    var html, svg, bkcolor, effect, options, colors, k, v, ref$, node, ref1$, results$ = [];
    html = svgHtml(e);
    html = html.replace(/id="([^"]+)"/g, 'id="editing-$1"');
    html = html.replace(/url\(#([^)]+)\)/g, 'url(#editing-$1)');
    document.querySelector('#cooltext').innerHTML = html;
    svg = document.querySelector('#cooltext svg');
    mtFrame.init(svg);
    mtFont.of(type).then(function(f){
      return mtFont.apply(document.querySelector('#cooltext'), f);
    })['catch'](function(e){
      return console.warn("[maketext] font:", e);
    });
    bkcolor = getComputedStyle(svg).backgroundColor || '#fff';
    Array.from(svg.querySelectorAll('feImage')).map(function(d, i){
      var href, ref$, w, h;
      href = d.getAttributeNS('http://www.w3.org/1999/xlink', 'href') || d.getAttribute('href');
      if (/^data:image/.exec(href)) {
        return;
      }
      ref$ = [d.getAttribute('width'), d.getAttribute('height')].map(function(it){
        return (/(\d+)/.exec(it) || [0, 1024])[1];
      }), w = ref$[0], h = ref$[1];
      return smiltool.urlToDataurl(href, w, h).then(function(it){
        return d.setAttributeNS('http://www.w3.org/1999/xlink', 'href', it);
      });
    });
    editor.toggle(true);
    Array.from(document.querySelectorAll('#cooltext text')).map(function(it){
      return mtSetText(it, document.querySelector('#text-input').value || 'Hello World');
    });
    editor.effects.type = type;
    effect = editor.effects[type];
    options = document.querySelector('#editor-custom-options');
    options.innerHTML = '';
    if (effect.js && effect.js.edit) {
      colors = (function(){
        var ref$, results$ = [];
        for (k in ref$ = effect.js.edit) {
          v = ref$[k];
          results$.push(v);
        }
        return results$;
      }()).filter(function(it){
        return it.type === 'color';
      }).map(function(it){
        return it['default'];
      });
      for (k in ref$ = effect.js.edit) {
        v = ref$[k];
        node = document.querySelector("#editor-option-sample-" + v.type);
        if (!node) {
          continue;
        }
        node = node.cloneNode(true);
        if (v.type === 'color') {
          node.querySelector('label').textContent = v.name;
          node.querySelector('input').setAttribute('name', k);
          initColorpicker(node, k, v);
          mtPattern.decorate(node, k);
        } else if (v.type === 'number') {
          node.querySelector('label').textContent = v.name;
          node.querySelector('input').setAttribute('name', k, v);
          initSlider(node, k, v);
        }
        options.appendChild(node);
      }
      setPalette([bkcolor].concat(colors));
      for (k in ref$ = effect.js.edit) {
        v = ref$[k];
        editor.update(k, v['default']);
      }
    } else {
      options.innerHTML = "<div class='col-sm'><div class='empty'></div></div>";
      setPalette([bkcolor]);
    }
    for (k in ref$ = (ref1$ = editor.config).cur || (ref1$.cur = {})) {
      v = ref$[k];
      results$.push(editor.update(k, v));
    }
    return results$;
  };
  clusterize = new Clusterize({
    rows: galleryRows(),
    scrollElem: document.querySelector('body'),
    contentElem: document.querySelector('#gallery'),
    rows_in_block: 10
  });
  document.addEventListener('scroll', function(e){
    var scrolltop, editor, height;
    scrolltop = document.scrollingElement.scrollTop;
    editor = document.querySelector('#editor');
    if (scrolltop > 200) {
      editor.classList.add('on');
    } else {
      editor.classList.remove('on');
    }
    height = window.innerHeight;
    return Array.from(document.querySelectorAll('.gallery .line')).map(function(d, i){
      var box;
      box = d.getBoundingClientRect();
      if (box.y + box.height < 0 || box.y > height) {
        d.style.visibility = 'hidden';
      } else {
        d.style.visibility = 'visible';
        gallery.enqueue(d);
      }
      if (box.y + box.height < 0 || box.y + box.height / 3 > height) {
        d.style.opacity = 0;
        return d.style.transform = "scale(0.9)";
      } else {
        d.style.opacity = 1;
        return d.style.transform = "scale(1)";
      }
    });
  });
  /*
  # API Functionality
   * Export Input
     -  t: [text input]
           auto fill text input and scroll into gallery
     -  s: [font size]
           pre-set font size
  
   * Export events:
     - image.ready / fired when use click SVG/PNG button
       - type: ANY(image/png image/svg+xml)
       - name: [name]
  
   * Eventbus usage example:
     - maketext.editor.on \image.ready, -> console.log it
  
   DOM that is expected to be used by API user:
     editor-download-btn
       .btn[data-type=svg]
       .btn[data-type=png]
  
  */
  window.maketext = maketext = {
    editor: {
      input: function(it){
        var node;
        document.querySelector('#landing input').value = it;
        node = document.querySelector('#text-input');
        node.value = it;
        return updateText(node);
      },
      evtHandler: {},
      on: function(n, cb){
        var ref$;
        return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
      },
      fire: function(n){
        var v, res$, i$, to$, ref$, len$, cb;
        res$ = [];
        for (i$ = 1, to$ = arguments.length; i$ < to$; ++i$) {
          res$.push(arguments[i$]);
        }
        v = res$;
        for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
          cb = ref$[i$];
          cb.apply(this, v);
        }
        return window.postMessage({
          n: n,
          data: v
        }, '*');
      }
    }
  };
  queries = (window.location.search || "?").substring(1).split('&').map(function(it){
    return it.split('=');
  }).filter(function(it){
    return it[0];
  });
  queries.filter(function(it){
    return it[0] === 't';
  }).slice(0, 1).map(function(it){
    maketext.editor.input(decodeURIComponent(it[1]));
    return scrollto('#top');
  });
  queries.filter(function(it){
    return it[0] === 's' && !isNaN(+it[1]);
  }).slice(0, 1).map(function(it){
    return $('#font-size-slider .up.irs-input').val(+it[1]);
  });
  Array.from(document.querySelectorAll('input[data-toggle="colorpicker"]')).map(function(it){
    return new ldcolorpicker(it);
  });
  Array.from(document.querySelectorAll('#font-size-slider .up.irs-input')).map(function(d, i){
    var v, x$;
    editor.update('fontSize', v = +d.value || 64);
    x$ = $(d);
    x$.val(v);
    x$.ionRangeSlider({
      onChange: function(data){
        return editor.update('fontSize', data.from);
      },
      max: 200
    });
    return x$;
  });
  return function(){
    var q, i$, ref$, len$, ref1$, k, v, m;
    q = {};
    for (i$ = 0, len$ = (ref$ = queries).length; i$ < len$; ++i$) {
      ref1$ = ref$[i$], k = ref1$[0], v = ref1$[1];
      q[decodeURIComponent(k)] = decodeURIComponent((v || '').replace(/\+/g, ' '));
    }
    if (!((q.d || q.edit) && (m = /^\/effect\/([^\/]+)/.exec(location.pathname)) && effects[m[1]])) {
      return;
    }
    return Promise.all([mteffect.load(m[1]), mtShare.parse(q)]).then(function(arg$){
      var e, s;
      e = arg$[0], s = arg$[1];
      if (!s) {
        return;
      }
      openEffect(m[1], e);
      return mtShare.apply(s, !!q.d);
    })['catch'](function(e){
      return console.warn("[maketext] share:", e);
    });
  }();
});
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}