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