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
        return svg.parentNode.removeChild(svg);
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
          return it.textContent = text;
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
      return it.textContent = value;
    });
    textInput.value = value;
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
  document.querySelector('#text-input').addEventListener('keyup', function(){
    return updateText(this);
  });
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
      return it.textContent = document.querySelector('#text-input').value || 'Hello World';
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
        node = document.querySelector('#landing input');
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
  return Array.from(document.querySelectorAll('#font-size-slider .up.irs-input')).map(function(d, i){
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
      var svg, crop, b, k, v, results$ = [];
      if (!((svg = this$.svg()) && (crop = svg.querySelector('.mt-crop')))) {
        return;
      }
      if (!(b = this$.box(svg))) {
        return crop.setAttribute('width', 0);
      }
      for (k in b) {
        v = b[k];
        results$.push(crop.setAttribute(k, v));
      }
      return results$;
    }, 60);
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
  var cooltext, end, n;
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
  if (n = document.querySelector('#export-padding')) {
    n.value = frame.opt.padding;
    n.addEventListener('input', function(){
      return frame.setOpt('padding', Math.max(0, +n.value || 0));
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
var loadFont, RASTER, backgroundColor, blobToDataurl, gifenc, gifencLoad, gifBlob, loadImage, dataurlCache, inlineImages, decodeFrames;
loadFont = function(){
  return mtFont.of(editor.effects.type).then(function(f){
    return f.getotf();
  }).then(function(otf){
    return {
      getD: function(text, arg$){
        var fontSize;
        fontSize = arg$.fontSize;
        return otf.getPath(text, 0, 0, fontSize).toPathData();
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
          var textbox, fontSize, textValue, d, g1, g2, path, parent, i$, ref$, len$, name, that, pbox, x, y, width, height;
          textbox = text.getBBox();
          fontSize = getComputedStyle(text).fontSize;
          fontSize = +(/(\d+)/.exec(fontSize) || [0, 64])[1];
          textValue = text.textContent || 'Hello World';
          d = tts.getD(textValue, {
            fontSize: fontSize
          });
          g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
          g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
          path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          parent = text.parentNode;
          path.setAttribute('d', d);
          for (i$ = 0, len$ = (ref$ = ['fill', 'stroke', 'stroke-width']).length; i$ < len$; ++i$) {
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
          parent.removeChild(text);
          pbox = path.getBBox();
          x = -path.getBBox().width * 0.5 - path.getBBox().x + textbox.width * 0.5 + textbox.x;
          y = path.getBBox().height * 0.5 + textbox.height * 0.5 + textbox.y;
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
    var that, blob, url, x$, ref$;
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
    document.querySelector('#download img').setAttribute('src', url);
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
    if (format === 'gif' && mtPattern.cur && window.ImageDecoder) {
      return this.animatedGif();
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
  animatedGif: function(){
    var fmt, hint, hintText, progress, local, this$ = this;
    mtTrack('download', {
      format: 'gif',
      effect: editor.effects.type,
      animated: true
    });
    fmt = RASTER.gif;
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
      var ref$, svg, text, width, height, frames, canvas, ctx, bk, image;
      ref$ = arg$[0], svg = ref$.svg, text = ref$.text, width = ref$.width, height = ref$.height, frames = arg$[1];
      local.text = text;
      local.width = width;
      local.height = height;
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d');
      bk = backgroundColor();
      image = svg.querySelector("pattern image");
      return gifencLoad().then(function(arg$){
        var GIFEncoder, quantize, applyPalette, enc, render;
        GIFEncoder = arg$.GIFEncoder, quantize = arg$.quantize, applyPalette = arg$.applyPalette;
        enc = GIFEncoder();
        render = function(i){
          if (i >= frames.length) {
            return;
          }
          progress("rendering frame " + (i + 1) + " / " + frames.length + " ...");
          image.setAttribute('href', frames[i].url);
          return smiltool.svgToDataurl(svg.outerHTML).then(function(url){
            return loadImage(url);
          }).then(function(img){
            var data, palette;
            ctx.fillStyle = bk;
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            data = ctx.getImageData(0, 0, width, height).data;
            palette = quantize(data, 256);
            enc.writeFrame(applyPalette(data, palette), width, height, {
              palette: palette,
              delay: frames[i].delay
            });
            return render(i + 1);
          });
        };
        return render(0).then(function(){
          enc.finish();
          return new Blob([enc.bytes()], {
            type: fmt.type
          });
        });
      });
    }).then(function(blob){
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
        type: fmt.type
      }, ref$.width = local.width, ref$.height = local.height, ref$));
    })['catch'](function(e){
      console.warn("[maketext] gif:", e);
      return progress("failed to render the animated GIF.");
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