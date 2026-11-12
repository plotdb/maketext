var LINEHEIGHT;
window.idle = function(cb, timeout){
  var run;
  timeout == null && (timeout = 2000);
  run = function(){
    if (window.requestIdleCallback) {
      return requestIdleCallback(cb, {
        timeout: timeout
      });
    } else {
      return setTimeout(cb, 200);
    }
  };
  if (document.readyState === 'complete') {
    return run();
  } else {
    return window.addEventListener('load', run);
  }
};
window.mtTrack = function(name, params){
  params == null && (params = {});
  if (typeof gtag === 'function') {
    return gtag('event', name, params);
  }
};
LINEHEIGHT = 1.2;
window.mtSetText = function(node, value){
  var lines, x, i$, len$, i, line, t, results$ = [];
  lines = (value + "").split(/\r?\n/);
  node.dataset.mtText = value;
  if (lines.length < 2) {
    return node.textContent = value;
  }
  node.textContent = '';
  x = node.getAttribute('x') || 0;
  for (i$ = 0, len$ = lines.length; i$ < len$; ++i$) {
    i = i$;
    line = lines[i$];
    t = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    t.setAttribute('x', x);
    t.setAttribute('dy', (i === 0 ? -(lines.length - 1) / 2 * LINEHEIGHT : LINEHEIGHT) + "em");
    t.textContent = line || ' ';
    results$.push(node.appendChild(t));
  }
  return results$;
};
window.mtTextLines = function(node){
  var ref$;
  return (((ref$ = node.dataset.mtText) != null
    ? ref$
    : node.textContent) + "").split(/\r?\n/);
};
window.mtLineHeight = LINEHEIGHT;
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
$(document).ready(function(){
  var pals, setPalette, palette, picker, getPicker;
  pals = palettes.map(function(arg$){
    var name, colors;
    name = arg$[0], colors = arg$[1];
    return {
      name: name,
      colors: colors
    };
  });
  window.setPalette = setPalette = function(colors, name){
    name == null && (name = 'Palette');
    colors = colors.map(function(it){
      return ldcolor.web(it);
    });
    document.querySelector('#palette-btn label').textContent = name;
    document.querySelector('#palette-btn .palette').innerHTML = colors.map(function(it){
      return "<div class=\"color\" style=\"background:" + it + "\"></div>";
    }).join('');
    return Array.from(document.querySelectorAll("#editor *[data-toggle='colorpicker']")).map(function(d, i){
      var ldcp;
      ldcp = d.getColorPicker();
      ldcp.setPalette({
        colors: colors.map(function(it){
          return {
            hex: it
          };
        })
      });
      ldcp.setIdx(i % colors.length);
      return ldcp.fire('change', ldcp.getColor('hsl'));
    });
  };
  palette = pals[Math.floor(Math.random() * pals.length)];
  setPalette(palette.colors, palette.name);
  picker = null;
  getPicker = function(){
    return picker || (picker = new ldpp({
      root: document.querySelector('#palette-picker .ldpp'),
      ldcv: true,
      useVscroll: true,
      palettes: pals
    }));
  };
  idle(function(){
    return getPicker();
  }, 2000);
  window.pickPalette = function(){
    mtTrack('palette_picker_open');
    return getPicker().get().then(function(pal){
      if (!(pal && pal.colors && pal.colors.length)) {
        return;
      }
      return setPalette(pal.colors.map(function(c){
        return c.value || c;
      }), pal.name);
    });
  };
  return Array.from(document.querySelectorAll('.color input[data-toggle="colorpicker"]')).map(function(d, i){
    var ldcp, name;
    ldcp = d.getColorPicker();
    name = d.getAttribute('name');
    return ldcp.on('change', function(it){
      var c;
      c = ldcolor.web(it);
      editor.update(name, c);
      return d.parentNode.querySelector('.inner').style.background = c;
    });
  });
});
var XFLBASE, FONTLINKS, fontPath, loaded, load, mtFont, chooser, getChooser;
XFLBASE = 'https://xlfont.maketext.io';
FONTLINKS = XFLBASE + "/links";
fontPath = function(name){
  if (in$('/', name)) {
    return name;
  } else {
    return name + "/normal/400.ttf";
  }
};
loaded = {};
load = function(name){
  var that;
  if (that = loaded[name]) {
    return that;
  }
  return loaded[name] = xfl.load({
    path: FONTLINKS + "/" + encodeURI(fontPath(name)),
    name: name
  }).then(function(f){
    return document.fonts.load("64px \"" + f.cssName + "\"").then(function(){
      return f;
    });
  })['catch'](function(e){
    delete loaded[name];
    return Promise.reject(e);
  });
};
window.mtFont = mtFont = {
  override: null,
  load: load,
  of: function(type){
    var f;
    if (!(f = this.override)) {
      return load(effects[type].font);
    }
    return document.fonts.load("64px \"" + f.cssName + "\"").then(function(){
      return f;
    });
  },
  apply: function(node, font){
    return Array.from(node.querySelectorAll('svg text')).map(function(it){
      return it.style.fontFamily = "\"" + font.cssName + "\"";
    });
  },
  setOverride: function(font){
    this.override = font;
    document.querySelector('#font-name').textContent = font ? font.cssName : 'Choose ...';
    document.querySelector('#font-reset').classList.toggle('d-none', !font);
    editor.gallery.set('font', font ? font.cssName : null);
    if (document.body.classList.contains('editing')) {
      return this.of(editor.effects.type).then(function(f){
        return mtFont.apply(document.querySelector('#cooltext'), f);
      });
    }
  }
};
window.resetFont = function(){
  return mtFont.setOverride(null);
};
chooser = null;
getChooser = function(){
  var overlay, hide;
  if (chooser) {
    return chooser;
  }
  overlay = document.createElement('div');
  overlay.className = 'mt-xfc-overlay mt-xfc-hidden';
  overlay.innerHTML = document.getElementById('mt-xfc-tpl').innerHTML;
  document.body.appendChild(overlay);
  hide = function(){
    return overlay.classList.add('mt-xfc-hidden');
  };
  overlay.addEventListener('mousedown', function(e){
    if (e.target === overlay) {
      return hide();
    }
  });
  chooser = {
    overlay: overlay,
    hide: hide,
    xfc: new xfc({
      root: overlay.querySelector('.xfc'),
      meta: XFLBASE + "/meta",
      links: FONTLINKS,
      initRender: false
    })
  };
  chooser.xfc.on('choose', function(font){
    hide();
    if (font) {
      return mtFont.setOverride(font);
    }
  });
  chooser.rendered = chooser.xfc.init().then(function(){
    return chooser.xfc.render();
  });
  chooser.rendered['catch'](function(e){
    return console.warn("[maketext] font chooser:", e);
  });
  return chooser;
};
window.chooseFont = function(){
  mtTrack('font_chooser_open');
  return getChooser().overlay.classList.remove('mt-xfc-hidden');
};
idle(function(){
  return getChooser();
}, 2000);
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
var SVGNS, NONGRAPHIC, loadOpt, frame, drag;
SVGNS = 'http://www.w3.org/2000/svg';
NONGRAPHIC = ['defs', 'style', 'filter', 'linearGradient', 'radialGradient', 'pattern', 'mask', 'clipPath', 'symbol', 'title', 'desc', 'metadata', 'script'];
loadOpt = function(){
  var e;
  try {
    return JSON.parse(localStorage.getItem('mt-export') || '{}');
  } catch (e$) {
    e = e$;
    return {};
  }
};
window.mtFrame = frame = {
  offset: {
    x: 0,
    y: 0
  },
  opt: import$({
    padding: 20,
    scale: 1
  }, loadOpt()),
  svg: function(){
    return document.querySelector('#cooltext svg');
  },
  init: function(svg){
    var g, i$, ref$, len$, n, crop;
    g = document.createElementNS(SVGNS, 'g');
    g.setAttribute('class', 'mt-offset');
    for (i$ = 0, len$ = (ref$ = Array.from(svg.childNodes)).length; i$ < len$; ++i$) {
      n = ref$[i$];
      if (!(n.nodeType === 1 && in$(n.localName, NONGRAPHIC))) {
        g.appendChild(n);
      }
    }
    svg.appendChild(g);
    svg.dataset.vb = svg.getAttribute('viewBox') || '0 0 500 150';
    crop = document.createElementNS(SVGNS, 'rect');
    crop.setAttribute('class', 'mt-crop');
    svg.appendChild(crop);
    this.offset = {
      x: 0,
      y: 0
    };
    return this.apply();
  },
  box: function(svg){
    var ctm, rs, ref$, x1, y1, x2, y2, p;
    svg == null && (svg = this.svg());
    if (!(svg && (ctm = svg.getScreenCTM()))) {
      return null;
    }
    rs = Array.from(svg.querySelectorAll('text')).map(function(it){
      return it.getBoundingClientRect();
    }).filter(function(it){
      return it.width && it.height;
    });
    if (!rs.length) {
      return null;
    }
    ref$ = [
      Math.min.apply(Math, rs.map(function(it){
        return it.left;
      })), Math.min.apply(Math, rs.map(function(it){
        return it.top;
      }))
    ], x1 = ref$[0], y1 = ref$[1];
    ref$ = [
      Math.max.apply(Math, rs.map(function(it){
        return it.right;
      })), Math.max.apply(Math, rs.map(function(it){
        return it.bottom;
      }))
    ], x2 = ref$[0], y2 = ref$[1];
    ref$ = [x1, x2].map(function(it){
      return (it - ctm.e) / ctm.a;
    }), x1 = ref$[0], x2 = ref$[1];
    ref$ = [y1, y2].map(function(it){
      return (it - ctm.f) / ctm.d;
    }), y1 = ref$[0], y2 = ref$[1];
    p = +this.opt.padding || 0;
    return {
      x: x1 - p - this.offset.x,
      y: y1 - p - this.offset.y,
      width: x2 - x1 + 2 * p,
      height: y2 - y1 + 2 * p
    };
  },
  apply: function(){
    var svg, g, btn;
    if (!(svg = this.svg())) {
      return;
    }
    if (g = svg.querySelector('.mt-offset')) {
      g.setAttribute('transform', "translate(" + this.offset.x + "," + this.offset.y + ")");
    }
    if (btn = document.querySelector('#editor-reset-offset')) {
      btn.classList.toggle('d-none', !(this.offset.x || this.offset.y));
    }
    return this.refresh();
  },
  refresh: function(){
    var this$ = this;
    clearTimeout(this._timer);
    return this._timer = setTimeout(function(){
      var svg, crop, b, k, v;
      if (!((svg = this$.svg()) && (crop = svg.querySelector('.mt-crop')))) {
        return;
      }
      if (!(b = this$.box(svg))) {
        return crop.setAttribute('width', 0);
      }
      for (k in b) {
        v = b[k];
        crop.setAttribute(k, v);
      }
      return this$.fit(svg, b);
    }, 60);
  },
  fit: function(svg, b){
    var ref$, x, y, w, h, y1, y2, n;
    ref$ = svg.dataset.vb.split(/[\s,]+/).map(function(it){
      return +it;
    }), x = ref$[0], y = ref$[1], w = ref$[2], h = ref$[3];
    y1 = Math.min(y, b.y - 10);
    y2 = Math.max(y + h, b.y + b.height + 10);
    svg.setAttribute('viewBox', [x, y1, w, y2 - y1].join(' '));
    if (n = document.querySelector('#cooltext')) {
      return n.style.height = Math.round(170 * (y2 - y1) / h) + "px";
    }
  },
  reset: function(){
    this.offset = {
      x: 0,
      y: 0
    };
    return this.apply();
  },
  setOpt: function(k, v){
    var e;
    this.opt[k] = v;
    try {
      localStorage.setItem('mt-export', JSON.stringify(this.opt));
    } catch (e$) {
      e = e$;
      null;
    }
    return this.refresh();
  }
};
drag = null;
document.addEventListener('DOMContentLoaded', function(){
  var cooltext, end, n, x$;
  if (cooltext = document.querySelector('#cooltext')) {
    cooltext.addEventListener('pointerdown', function(e){
      var svg, ctm;
      if (!(document.body.classList.contains('editing') && (svg = frame.svg()) && (ctm = svg.getScreenCTM()))) {
        return;
      }
      drag = {
        x: e.clientX,
        y: e.clientY,
        o: import$({}, frame.offset),
        s: ctm.a
      };
      cooltext.setPointerCapture(e.pointerId);
      cooltext.classList.add('dragging');
      return e.preventDefault();
    });
    cooltext.addEventListener('pointermove', function(e){
      if (!drag) {
        return;
      }
      frame.offset = {
        x: drag.o.x + (e.clientX - drag.x) / drag.s,
        y: drag.o.y + (e.clientY - drag.y) / drag.s
      };
      return frame.apply();
    });
    end = function(e){
      if (!drag) {
        return;
      }
      drag = null;
      cooltext.classList.remove('dragging');
      return mtTrack('offset', {
        effect: editor.effects.type
      });
    };
    cooltext.addEventListener('pointerup', end);
    cooltext.addEventListener('pointercancel', end);
  }
  if (document.fonts) {
    document.fonts.addEventListener('loadingdone', function(){
      return frame.refresh();
    });
  }
  if (n = document.querySelector('#export-padding-slider .irs-input input')) {
    x$ = $(n);
    x$.val(frame.opt.padding);
    x$.ionRangeSlider({
      min: 0,
      max: 200,
      step: 1,
      onChange: function(data){
        return frame.setOpt('padding', data.from);
      }
    });
  }
  if (n = document.querySelector('#export-scale')) {
    n.value = frame.opt.scale + "";
    return n.addEventListener('change', function(){
      return frame.setOpt('scale', +n.value) || 1;
    });
  }
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
var SVGNS, ID, pattern, gifFrames;
SVGNS = 'http://www.w3.org/2000/svg';
ID = 'editing-mt-pattern';
window.mtPattern = pattern = {
  cur: null,
  list: null,
  loadList: function(){
    return this.list || (this.list = ld$.fetch('/assets/pattern/index.json', {
      method: 'GET'
    }, {
      type: 'json'
    }).then(function(list){
      return list.map(function(it){
        return it.url = "/assets/pattern/" + it.name + ".gif", it;
      });
    }));
  },
  usable: function(){
    var e;
    e = editor.effects[editor.effects.type];
    return !!(e && e.js && e.js.edit && e.js.edit.fill && e.js.edit.fill.type === 'color');
  },
  apply: function(svg){
    var old, texts, fill, i$, len$, t, p, defs, img, k, ref$, v, results$ = [];
    svg == null && (svg = document.querySelector('#cooltext svg'));
    if (!svg) {
      return;
    }
    old = svg.querySelector("pattern#" + ID);
    texts = Array.from(svg.querySelectorAll('text'));
    if (!(this.cur && this.usable())) {
      if (old) {
        old.remove();
      }
      fill = editor.config.cur.fill;
      for (i$ = 0, len$ = texts.length; i$ < len$; ++i$) {
        t = texts[i$];
        if (t.hasAttribute('data-mt-pattern')) {
          t.removeAttribute('data-mt-pattern');
          if (fill) {
            t.setAttribute('fill', fill);
          }
        }
      }
      return;
    }
    if (!(p = old)) {
      defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS(SVGNS, 'defs'), svg.firstChild);
      p = document.createElementNS(SVGNS, 'pattern');
      p.setAttribute('id', ID);
      p.setAttribute('patternUnits', 'userSpaceOnUse');
      p.appendChild(document.createElementNS(SVGNS, 'image'));
      defs.appendChild(p);
    }
    img = p.querySelector('image');
    for (k in ref$ = {
      width: this.cur.width,
      height: this.cur.height
    }) {
      v = ref$[k];
      p.setAttribute(k, v);
      img.setAttribute(k, v);
    }
    if (img.dataset.src !== this.cur.url) {
      img.dataset.src = this.cur.url;
      img.setAttribute('href', this.cur.url);
    }
    fill = editor.config.cur.fill;
    for (i$ = 0, len$ = texts.length; i$ < len$; ++i$) {
      t = texts[i$];
      if (t.hasAttribute('data-mt-pattern') || (fill && t.getAttribute('fill') === fill)) {
        t.setAttribute('data-mt-pattern', 1);
        results$.push(t.setAttribute('fill', "url(#" + ID + ")"));
      }
    }
    return results$;
  },
  set: function(cur){
    var this$ = this;
    this.cur = cur;
    this.apply();
    this.animate();
    if (cur) {
      mtTrack('pattern', {
        pattern: cur.name,
        effect: editor.effects.type
      });
    }
    this.renderBtn();
    return Array.from(document.querySelectorAll('#editor-download-btn [data-anim]')).map(function(it){
      return it.classList.toggle('d-none', !this$.cur);
    });
  },
  animate: function(){
    var cur, this$ = this;
    clearTimeout(this._timer);
    cur = this.cur;
    if (!(cur && window.ImageDecoder)) {
      return;
    }
    (this._frames = this._frames || {})[cur.url] = this._frames[cur.url] || gifFrames(cur.url)['catch'](function(e){
      console.warn("[maketext] pattern frames:", e);
      return [];
    });
    return this._frames[cur.url].then(function(frames){
      var i, tick;
      if (this$.cur !== cur || frames.length < 2) {
        return;
      }
      i = 0;
      tick = function(){
        var img;
        if (this$.cur !== cur) {
          return;
        }
        if (document.body.classList.contains('editing') && (img = document.querySelector("#cooltext pattern#" + ID + " image"))) {
          img.setAttribute('href', frames[i].url);
        }
        this$._timer = setTimeout(tick, frames[i].delay);
        return i = (i + 1) % frames.length;
      };
      return tick();
    });
  },
  renderBtn: function(box){
    box == null && (box = document.querySelector('#editor-custom-options .mt-fill'));
    if (!box) {
      return;
    }
    box.classList.toggle('on', !!this.cur);
    return box.querySelector('.mt-pattern-btn').style.backgroundImage = this.cur ? "url(" + this.cur.url + ")" : '';
  },
  decorate: function(node, key){
    var color, box, this$ = this;
    if (key !== 'fill') {
      return;
    }
    color = node.querySelector('.color');
    box = document.createElement('div');
    box.className = 'mt-fill';
    color.parentNode.insertBefore(box, color);
    box.appendChild(color);
    box.insertAdjacentHTML('beforeend', '<div class="mt-pattern-btn" title="fill with an animated pattern"><span class="mt-pattern-label">GIF</span><span class="mt-pattern-clear" title="back to color">&times;</span></div>');
    box.querySelector('.mt-pattern-btn').addEventListener('click', function(e){
      if (e.target.closest('.mt-pattern-clear')) {
        return this$.set(null);
      }
      return this$.pick();
    });
    color.addEventListener('click', function(){
      if (this$.cur) {
        return this$.set(null);
      }
    }, true);
    return this.renderBtn(box);
  },
  pick: function(){
    var root, this$ = this;
    root = this.root;
    this.ldcv = this.ldcv || new ldcover({
      root: root
    });
    return this.loadList().then(function(list){
      var grid;
      grid = root.querySelector('.mt-pattern-grid');
      grid.innerHTML = (["<div class=\"mt-pattern-item none\" data-name=\"\">none</div>"].concat(list.map(function(it){
        return "<div class=\"mt-pattern-item\" data-name=\"" + it.name + "\" style=\"background-image:url(" + it.url + ")\"></div>";
      }))).join('');
      return this$.ldcv.toggle(true);
    });
  },
  upload: function(file){
    var fr, this$ = this;
    if (!file) {
      return;
    }
    fr = new FileReader();
    fr.onload = function(){
      var img;
      img = new Image();
      img.onload = function(){
        var r;
        r = Math.min(1, 200 / Math.max(img.width, img.height));
        this$.set({
          name: 'upload',
          url: fr.result,
          width: img.width * r,
          height: img.height * r
        });
        return this$.ldcv.toggle(false);
      };
      return img.src = fr.result;
    };
    return fr.readAsDataURL(file);
  }
};
gifFrames = function(url){
  return fetch(url).then(function(r){
    return r.blob();
  }).then(function(blob){
    return blob.arrayBuffer().then(function(data){
      return {
        data: data,
        type: blob.type || 'image/gif'
      };
    });
  }).then(function(arg$){
    var data, type, dec;
    data = arg$.data, type = arg$.type;
    dec = new ImageDecoder({
      data: data,
      type: type
    });
    return Promise.all([dec.tracks.ready, dec.completed]).then(function(){
      var count, frames, step;
      count = Math.min(60, dec.tracks.selectedTrack.frameCount || 1);
      frames = [];
      step = function(i){
        if (i >= count) {
          return frames;
        }
        return dec.decode({
          frameIndex: i
        }).then(function(arg$){
          var image, canvas, delay;
          image = arg$.image;
          canvas = document.createElement('canvas');
          canvas.width = image.displayWidth;
          canvas.height = image.displayHeight;
          canvas.getContext('2d').drawImage(image, 0, 0);
          delay = Math.max(20, Math.round((image.duration || 100000) / 1000));
          image.close();
          return new Promise(function(res){
            return canvas.toBlob(res);
          }).then(function(b){
            frames.push({
              url: URL.createObjectURL(b),
              delay: delay
            });
            return step(i + 1);
          });
        });
      };
      return step(0);
    });
  });
};
document.addEventListener('DOMContentLoaded', function(){
  var root;
  if (!(root = pattern.root = document.querySelector('#pattern-picker'))) {
    return;
  }
  root.addEventListener('click', function(e){
    var n, name;
    if (!(n = e.target.closest('.mt-pattern-item'))) {
      return;
    }
    name = n.dataset.name;
    return pattern.loadList().then(function(list){
      pattern.set(name ? list.find(function(it){
        return it.name === name;
      }) : null);
      return pattern.ldcv.toggle(false);
    });
  });
  return root.querySelector('input[type=file]').addEventListener('change', function(){
    pattern.upload(this.files[0]);
    return this.value = '';
  });
});
var loadFont, RASTER, backgroundColor, blobToDataurl, gifenc, gifencLoad, gifBlob, loadImage, dataurlCache, inlineImages, decodeFrames, ANIMATED, mediabunny, mediabunnyLoad, videoSink, webpAnimate;
loadFont = function(){
  return mtFont.of(editor.effects.type).then(function(f){
    return f.getotf();
  }).then(function(otf){
    return {
      getD: function(lines, arg$){
        var fontSize;
        fontSize = arg$.fontSize;
        return lines.map(function(line, i){
          var x;
          x = -otf.getAdvanceWidth(line, fontSize) / 2;
          return otf.getPath(line, x, i * fontSize * mtLineHeight, fontSize).toPathData();
        }).join(' ');
      }
    };
  });
};
window.convert = {
  prepare: function(){
    return new Promise(function(res, rej){
      var live, box, scale, svg, n, svgWidth, feImages, style, node;
      live = document.querySelector('#cooltext svg');
      box = mtFrame.box(live) || {
        x: 0,
        y: 0,
        width: 500,
        height: 150
      };
      scale = +mtFrame.opt.scale || 1;
      svg = live.cloneNode(true);
      svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
      if (n = svg.querySelector('.mt-crop')) {
        n.remove();
      }
      if (mtPattern.cur && (n = svg.querySelector('pattern image'))) {
        n.setAttribute('href', mtPattern.cur.url);
      }
      svgWidth = document.querySelector('#cooltext').getBoundingClientRect().width;
      svg.setAttribute('width', svgWidth + "px");
      svg.setAttribute('height', '170px');
      feImages = Array.from(svg.querySelectorAll('feImage')).map(function(d, i){
        var href, ret;
        href = d.getAttributeNS('http://www.w3.org/1999/xlink', 'href') || d.getAttribute('href');
        ret = /^(data:image\/svg\+xml[^,]*?),([^]+)$/gm.exec(href);
        if (ret && !/base64/.exec(ret[1])) {
          href = ret[1] + ";base64," + btoa(ret[2]);
          return d.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href);
        }
      });
      style = document.createElement("style");
      style.textContent = "text {\n  font-size: 64px;\n  font-family: Arial Black;\n  dominant-baseline: central;\n  text-anchor: middle;\n}";
      svg.appendChild(style);
      node = document.querySelector('#svg-work-area');
      if (!node) {
        node = document.createElement("div");
        node.setAttribute('id', 'svg-work-area');
        document.body.appendChild(node);
      }
      node.appendChild(svg);
      return Promise.all([loadFont(), inlineImages(svg)]).then(function(arg$){
        var tts;
        tts = arg$[0];
        return Array.from(svg.querySelectorAll('text')).map(function(text, i){
          var textbox, fontSize, lines, textValue, d, g1, g2, path, parent, i$, ref$, len$, name, that, pbox, x, y, width, height;
          textbox = text.getBBox();
          fontSize = getComputedStyle(text).fontSize;
          fontSize = +(/(\d+)/.exec(fontSize) || [0, 64])[1];
          lines = mtTextLines(text);
          textValue = lines.join(' ').trim() || 'Hello World';
          d = tts.getD(lines, {
            fontSize: fontSize
          });
          g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
          g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
          path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          parent = text.parentNode;
          path.setAttribute('d', d);
          for (i$ = 0, len$ = (ref$ = ['fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'stroke-linejoin', 'paint-order', 'mask']).length; i$ < len$; ++i$) {
            name = ref$[i$];
            if (that = text.getAttribute(name)) {
              path.setAttribute(name, that);
            }
          }
          parent.insertBefore(g1, text);
          g1.appendChild(g2);
          g2.appendChild(path);
          if (that = text.getAttribute('filter')) {
            g1.setAttribute('filter', that);
          }
          if (that = text.getAttribute('transform')) {
            g1.setAttribute('transform', that);
          }
          parent.removeChild(text);
          pbox = path.getBBox();
          x = -path.getBBox().width * 0.5 - path.getBBox().x + textbox.width * 0.5 + textbox.x;
          y = -path.getBBox().height * 0.5 - path.getBBox().y + textbox.height * 0.5 + textbox.y;
          g2.setAttribute("transform", "translate(" + x + ", " + y + ")");
          ref$ = [box.width, box.height].map(function(it){
            return Math.round(it * scale);
          }), width = ref$[0], height = ref$[1];
          svg.setAttribute('viewBox', [box.x, box.y, box.width, box.height].join(' '));
          svg.setAttribute('preserveAspectRatio', 'xMidYMid');
          svg.setAttribute('width', width + "px");
          svg.setAttribute('height', height + "px");
          return res({
            svg: svg,
            text: textValue,
            width: width,
            height: height
          });
        });
      });
    });
  },
  download: function(option){
    var that, blob, url, img, video, x$, ref$;
    option == null && (option = {});
    $('#download').modal('show');
    if (that = option.blob) {
      blob = that;
    } else if (option.content) {
      blob = new Blob([option.content], {
        type: option.type
      });
    } else {
      null;
    }
    url = URL.createObjectURL(blob);
    img = document.querySelector('#download img');
    video = document.querySelector('#download video');
    img.classList.toggle('d-none', !!option.video);
    video.classList.toggle('d-none', !option.video);
    if (option.video) {
      video.src = url;
    } else {
      video.removeAttribute('src');
      img.setAttribute('src', url);
    }
    x$ = document.querySelector('#download .btn');
    x$.setAttribute('href', url);
    x$.setAttribute('download', (option.name || 'output') + "." + (option.postfix || 'png'));
    return maketext.editor.fire('image.ready', (ref$ = {
      url: url
    }, ref$.name = option.name, ref$.type = option.type, ref$.dataurl = option.dataurl, ref$));
  },
  svg: function(){
    var local, this$ = this;
    mtTrack('download', {
      format: 'svg',
      effect: editor.effects.type
    });
    local = {};
    return this.prepare().then(function(ret){
      ret == null && (ret = {});
      local.svg = ret.svg;
      local.text = ret.text;
      local.width = ret.width;
      local.height = ret.height;
      return smiltool.svgToDataurl("<?xml version=\"1.0\" encoding=\"utf-8\"?>" + local.svg.outerHTML);
    }).then(function(it){
      var ref$;
      return this$.download((ref$ = {
        dataurl: it,
        name: local.text,
        content: local.svg.outerHTML,
        type: 'image/svg+xml',
        postfix: 'svg'
      }, ref$.width = local.width, ref$.height = local.height, ref$));
    });
  },
  png: function(){
    return this.raster('png');
  },
  raster: function(format){
    var fmt, local, this$ = this;
    format == null && (format = 'png');
    if (!(fmt = RASTER[format])) {
      return;
    }
    if ((format === 'gif' || format === 'webp') && mtPattern.cur && window.ImageDecoder) {
      return this.animated(format);
    }
    mtTrack('download', {
      format: format,
      effect: editor.effects.type
    });
    local = {};
    return this.prepare().then(function(arg$){
      var svg, text, width, height;
      svg = arg$.svg, text = arg$.text, width = arg$.width, height = arg$.height;
      local.text = text;
      local.width = width;
      local.height = height;
      return smiltool.svgToDataurl(svg.outerHTML);
    }).then(function(url){
      return new Promise(function(res, rej){
        var img;
        img = new Image();
        img.onload = function(){
          return res(img);
        };
        img.onerror = rej;
        return img.src = url;
      }).then(function(img){
        var canvas, ctx;
        canvas = document.createElement('canvas');
        canvas.width = local.width;
        canvas.height = local.height;
        ctx = canvas.getContext('2d');
        if (fmt.opaque) {
          ctx.fillStyle = backgroundColor();
          ctx.fillRect(0, 0, local.width, local.height);
        }
        ctx.drawImage(img, 0, 0, local.width, local.height);
        if (format === 'gif') {
          return gifBlob(ctx, local.width, local.height);
        }
        return new Promise(function(res){
          return canvas.toBlob(res, fmt.type, 0.92);
        });
      }).then(function(blob){
        return blobToDataurl(blob).then(function(dataurl){
          return {
            blob: blob,
            dataurl: dataurl
          };
        });
      });
    }).then(function(arg$){
      var blob, dataurl, ref$;
      blob = arg$.blob, dataurl = arg$.dataurl;
      return this$.download((ref$ = {
        dataurl: dataurl,
        blob: blob,
        name: local.text,
        postfix: fmt.ext,
        type: fmt.type
      }, ref$.width = local.width, ref$.height = local.height, ref$));
    });
  },
  video: function(format){
    if (mtPattern.cur) {
      return this.animated(format);
    }
  },
  animated: function(format){
    var fmt, hint, hintText, progress, local, this$ = this;
    mtTrack('download', {
      format: format,
      effect: editor.effects.type,
      animated: true
    });
    fmt = ANIMATED[format];
    hint = document.querySelector('#download small');
    hintText = hint.textContent;
    progress = function(t){
      return hint.textContent = t;
    };
    $('#download').modal('show');
    document.querySelector('#download img').removeAttribute('src');
    progress("rendering ...");
    local = {};
    return Promise.all([this.prepare(), decodeFrames(mtPattern.cur.url)]).then(function(arg$){
      var ref$, svg, text, width, height, frames, total, canvas, ctx, bk, image;
      ref$ = arg$[0], svg = ref$.svg, text = ref$.text, width = ref$.width, height = ref$.height, frames = arg$[1];
      if (fmt.video) {
        ref$ = [width, height].map(function(it){
          return Math.ceil(it / 2) * 2;
        }), width = ref$[0], height = ref$[1];
      }
      local.text = text;
      local.width = width;
      local.height = height;
      if (fmt.video) {
        total = frames.reduce(function(a, f){
          return a + f.delay;
        }, 0);
        frames = (function(){
          var i$, to$, results$ = [];
          for (i$ = 0, to$ = Math.max(1, Math.ceil(3000 / total)); i$ < to$; ++i$) {
            results$.push(i$);
          }
          return results$;
        }()).reduce(function(a){
          return a.concat(frames);
        }, []);
      }
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d');
      bk = backgroundColor();
      image = svg.querySelector("pattern image");
      return fmt.sink(width, height).then(function(sink){
        var render;
        render = function(i){
          if (i >= frames.length) {
            return;
          }
          progress("rendering frame " + (i + 1) + " / " + frames.length + " ...");
          image.setAttribute('href', frames[i].url);
          return smiltool.svgToDataurl(svg.outerHTML).then(function(url){
            return loadImage(url);
          }).then(function(img){
            ctx.clearRect(0, 0, width, height);
            if (fmt.opaque) {
              ctx.fillStyle = bk;
              ctx.fillRect(0, 0, width, height);
            }
            ctx.drawImage(img, 0, 0, width, height);
            return sink.add(canvas, frames[i].delay);
          }).then(function(){
            return render(i + 1);
          });
        };
        return render(0).then(function(){
          progress("encoding ...");
          return sink.finish();
        });
      });
    }).then(function(blob){
      if (!blob) {
        return Promise.reject(new Error(format + " is not supported by this browser"));
      }
      if (fmt.video) {
        return {
          blob: blob,
          dataurl: null
        };
      }
      return blobToDataurl(blob).then(function(dataurl){
        return {
          blob: blob,
          dataurl: dataurl
        };
      });
    }).then(function(arg$){
      var blob, dataurl, ref$;
      blob = arg$.blob, dataurl = arg$.dataurl;
      progress(hintText);
      return this$.download((ref$ = {
        dataurl: dataurl,
        blob: blob,
        name: local.text,
        postfix: fmt.ext,
        type: fmt.type,
        video: fmt.video
      }, ref$.width = local.width, ref$.height = local.height, ref$));
    })['catch'](function(e){
      console.warn("[maketext] " + format + ":", e);
      return progress("failed to render the animated " + format.toUpperCase() + ": " + (e.message || e));
    });
  }
};
RASTER = {
  png: {
    type: 'image/png',
    ext: 'png'
  },
  jpg: {
    type: 'image/jpeg',
    ext: 'jpg',
    opaque: true
  },
  webp: {
    type: 'image/webp',
    ext: 'webp'
  },
  gif: {
    type: 'image/gif',
    ext: 'gif',
    opaque: true
  }
};
backgroundColor = function(){
  var c;
  c = getComputedStyle(document.querySelector('#cooltext svg')).backgroundColor;
  if (!c || c === 'transparent' || /rgba\(.*,\s*0\)$/.exec(c)) {
    return '#fff';
  } else {
    return c;
  }
};
blobToDataurl = function(blob){
  return new Promise(function(res, rej){
    var fr;
    fr = new FileReader();
    fr.onload = function(){
      return res(fr.result);
    };
    fr.onerror = rej;
    return fr.readAsDataURL(blob);
  });
};
gifenc = null;
gifencLoad = function(){
  return gifenc = gifenc || new Function('u', 'return import(u)')('/assets/lib/gifenc/main/gifenc.esm.js');
};
gifBlob = function(ctx, w, h){
  return gifencLoad().then(function(arg$){
    var GIFEncoder, quantize, applyPalette, data, palette, enc;
    GIFEncoder = arg$.GIFEncoder, quantize = arg$.quantize, applyPalette = arg$.applyPalette;
    data = ctx.getImageData(0, 0, w, h).data;
    palette = quantize(data, 256);
    enc = GIFEncoder();
    enc.writeFrame(applyPalette(data, palette), w, h, {
      palette: palette
    });
    enc.finish();
    return new Blob([enc.bytes()], {
      type: 'image/gif'
    });
  });
};
if (!/^data:image\/webp/.exec(document.createElement('canvas').toDataURL('image/webp'))) {
  document.addEventListener('DOMContentLoaded', function(){
    return Array.from(document.querySelectorAll('#editor-download-btn [data-type=webp]')).map(function(it){
      return it.remove();
    });
  });
}
loadImage = function(url){
  return new Promise(function(res, rej){
    var img;
    img = new Image();
    img.onload = function(){
      return res(img);
    };
    img.onerror = rej;
    return img.src = url;
  });
};
dataurlCache = {};
inlineImages = function(svg){
  return Promise.all(Array.from(svg.querySelectorAll('image')).map(function(img){
    var href;
    href = img.getAttributeNS('http://www.w3.org/1999/xlink', 'href') || img.getAttribute('href');
    if (!href || /^data:/.exec(href)) {
      return;
    }
    return (dataurlCache[href] || (dataurlCache[href] = fetch(href).then(function(it){
      return it.blob();
    }).then(blobToDataurl))).then(function(url){
      if (img.hasAttribute('href')) {
        return img.setAttribute('href', url);
      } else {
        return img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', url);
      }
    });
  }));
};
decodeFrames = function(url){
  return fetch(url).then(function(r){
    return r.blob();
  }).then(function(blob){
    return blob.arrayBuffer().then(function(data){
      return {
        data: data,
        type: blob.type || 'image/gif'
      };
    });
  }).then(function(arg$){
    var data, type, dec;
    data = arg$.data, type = arg$.type;
    dec = new ImageDecoder({
      data: data,
      type: type
    });
    return Promise.all([dec.tracks.ready, dec.completed]).then(function(){
      var count, canvas, frames, step;
      count = Math.min(60, dec.tracks.selectedTrack.frameCount || 1);
      canvas = document.createElement('canvas');
      frames = [];
      step = function(i){
        if (i >= count) {
          return frames;
        }
        return dec.decode({
          frameIndex: i
        }).then(function(arg$){
          var image;
          image = arg$.image;
          canvas.width = image.displayWidth;
          canvas.height = image.displayHeight;
          canvas.getContext('2d').drawImage(image, 0, 0);
          frames.push({
            url: canvas.toDataURL(),
            delay: Math.max(20, Math.round((image.duration || 100000) / 1000))
          });
          image.close();
          return step(i + 1);
        });
      };
      return step(0);
    });
  });
};
ANIMATED = {
  gif: {
    type: 'image/gif',
    ext: 'gif',
    opaque: true,
    sink: function(w, h){
      return gifencLoad().then(function(arg$){
        var GIFEncoder, quantize, applyPalette, enc;
        GIFEncoder = arg$.GIFEncoder, quantize = arg$.quantize, applyPalette = arg$.applyPalette;
        enc = GIFEncoder();
        return {
          add: function(canvas, delay){
            var data, palette;
            data = canvas.getContext('2d').getImageData(0, 0, w, h).data;
            palette = quantize(data, 256);
            return enc.writeFrame(applyPalette(data, palette), w, h, {
              palette: palette,
              delay: delay
            });
          },
          finish: function(){
            enc.finish();
            return new Blob([enc.bytes()], {
              type: 'image/gif'
            });
          }
        };
      });
    }
  },
  webp: {
    type: 'image/webp',
    ext: 'webp',
    sink: function(w, h){
      return Promise.resolve({
        frames: [],
        add: function(canvas, delay){
          var this$ = this;
          return new Promise(function(res){
            return canvas.toBlob(res, 'image/webp', 0.9);
          }).then(function(b){
            return b.arrayBuffer();
          }).then(function(buf){
            return this$.frames.push({
              data: new Uint8Array(buf),
              delay: delay
            });
          });
        },
        finish: function(){
          return webpAnimate(this.frames, w, h);
        }
      });
    }
  },
  mp4: {
    type: 'video/mp4',
    ext: 'mp4',
    video: true,
    opaque: true,
    sink: function(w, h){
      return videoSink('mp4', w, h);
    }
  },
  webm: {
    type: 'video/webm',
    ext: 'webm',
    video: true,
    sink: function(w, h){
      return videoSink('webm', w, h);
    }
  }
};
mediabunny = null;
mediabunnyLoad = function(){
  return mediabunny = mediabunny || fetch('/assets/lib/mediabunny/main/mediabunny.min.mjs').then(function(r){
    if (r.ok) {
      return r.text();
    } else {
      return Promise.reject(new Error("cannot load mediabunny ( " + r.status + " )"));
    }
  }).then(function(code){
    return new Function('u', 'return import(u)')(URL.createObjectURL(new Blob([code], {
      type: 'text/javascript'
    })));
  })['catch'](function(e){
    mediabunny = null;
    return Promise.reject(e);
  });
};
videoSink = function(format, w, h){
  var codec;
  if (!window.VideoEncoder) {
    return Promise.resolve({
      add: function(){},
      finish: function(){
        return null;
      }
    });
  }
  codec = format === 'mp4' ? 'avc' : 'vp9';
  return mediabunnyLoad().then(function(M){
    return M.canEncodeVideo(codec, {
      width: w,
      height: h
    }).then(function(ok){
      var canvas, ctx, output, source, t, started;
      if (!ok) {
        return {
          add: function(){},
          finish: function(){
            return null;
          }
        };
      }
      canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      ctx = canvas.getContext('2d');
      output = new M.Output({
        format: format === 'mp4'
          ? new M.Mp4OutputFormat({
            fastStart: 'in-memory'
          })
          : new M.WebMOutputFormat(),
        target: new M.BufferTarget()
      });
      source = new M.CanvasSource(canvas, {
        codec: codec,
        quality: M.QUALITY_HIGH,
        alpha: format === 'mp4' ? 'discard' : 'keep'
      });
      output.addVideoTrack(source);
      t = 0;
      started = output.start();
      return {
        add: function(src, delay){
          return started.then(function(){
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(src, 0, 0);
            return source.add(t / 1000, delay / 1000).then(function(){
              return t = t + delay;
            });
          });
        },
        finish: function(){
          return started.then(function(){
            return output.finalize();
          }).then(function(){
            return new Blob([output.target.buffer], {
              type: format === 'mp4' ? 'video/mp4' : 'video/webm'
            });
          });
        }
      };
    });
  });
};
webpAnimate = function(frames, w, h){
  var u24, u32, str, chunk, imageChunks, body, i$, len$, f;
  u24 = function(v){
    return [v & 255, v >> 8 & 255, v >> 16 & 255];
  };
  u32 = function(v){
    return [v & 255, v >> 8 & 255, v >> 16 & 255, v >> 24 & 255];
  };
  str = function(s){
    var i$, i, results$ = [];
    for (i$ = 0; i$ < 4; ++i$) {
      i = i$;
      results$.push(s.charCodeAt(i));
    }
    return results$;
  };
  chunk = function(id, data){
    var out;
    out = str(id).concat(u32(data.length), Array.from(data));
    if (data.length % 2) {
      out.push(0);
    }
    return out;
  };
  imageChunks = function(bytes){
    var out, o, id, size, end;
    out = [];
    o = 12;
    while (o + 8 <= bytes.length) {
      id = String.fromCharCode(bytes[o], bytes[o + 1], bytes[o + 2], bytes[o + 3]);
      size = bytes[o + 4] | bytes[o + 5] << 8 | bytes[o + 6] << 16 | bytes[o + 7] << 24;
      end = o + 8 + size + size % 2;
      if (id === 'ALPH' || id === 'VP8 ' || id === 'VP8L') {
        out = out.concat(Array.from(bytes.subarray(o, end)));
      }
      o = end;
    }
    return out;
  };
  body = str('WEBP');
  body = body.concat(chunk('VP8X', [0x12, 0, 0, 0].concat(u24(w - 1), u24(h - 1))));
  body = body.concat(chunk('ANIM', [0, 0, 0, 0, 0, 0]));
  for (i$ = 0, len$ = frames.length; i$ < len$; ++i$) {
    f = frames[i$];
    body = body.concat(chunk('ANMF', u24(0).concat(u24(0), u24(w - 1), u24(h - 1), u24(f.delay), [0x02], imageChunks(f.data))));
  }
  return new Blob([new Uint8Array(str('RIFF').concat(u32(body.length), body))], {
    type: 'image/webp'
  });
};