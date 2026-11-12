var b64url, unb64url, pipe, shareEncode, shareDecode, settings, shareUrl, share, setColor;
b64url = function(bytes){
  var s, i$, to$, i;
  s = '';
  for (i$ = 0, to$ = bytes.length; i$ < to$; i$ += 0x8000) {
    i = i$;
    s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  }
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
unb64url = function(str){
  var s;
  s = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(s, function(c){
    return c.charCodeAt(0);
  });
};
pipe = function(bytes, stream){
  return new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer().then(function(it){
    return new Uint8Array(it);
  });
};
shareEncode = function(obj){
  var bytes;
  bytes = new TextEncoder().encode(JSON.stringify(obj));
  if (!window.CompressionStream) {
    return Promise.resolve('0' + b64url(bytes));
  }
  return pipe(bytes, new CompressionStream('deflate-raw')).then(function(it){
    return '1' + b64url(it);
  });
};
shareDecode = function(d){
  return Promise.resolve().then(function(){
    var bytes;
    bytes = unb64url(d.substring(1));
    if (d[0] === '1') {
      return pipe(bytes, new DecompressionStream('deflate-raw'));
    } else {
      return bytes;
    }
  }).then(function(it){
    return JSON.parse(new TextDecoder().decode(it));
  });
};
settings = function(){
  var cur, o, f, p, e, k;
  cur = editor.config.cur;
  o = {
    t: document.querySelector('#text-input').value,
    s: cur.fontSize
  };
  if (cur.background) {
    o.bg = cur.background;
  }
  if (f = mtFont.override) {
    o.font = (f.style || 'normal') === 'normal' && (f.weight || 400) + "" === '400'
      ? f.name
      : f.name + "/" + f.style + "/" + f.weight + ".ttf";
  }
  if ((p = mtPattern.cur) && p.name !== 'upload') {
    o.pat = p.name;
  }
  o.pad = mtFrame.opt.padding;
  if (cur.lineHeight != null && +cur.lineHeight !== 1.2) {
    o.lh = cur.lineHeight;
  }
  if (+cur.letterSpacing) {
    o.ls = cur.letterSpacing;
  }
  if (mtFrame.offset.x || mtFrame.offset.y) {
    o.ox = Math.round(mtFrame.offset.x);
    o.oy = Math.round(mtFrame.offset.y);
  }
  e = editor.effects[editor.effects.type];
  o.p = {};
  for (k in (e && e.js && e.js.edit) || {}) {
    if (cur[k] != null) {
      o.p[k] = cur[k];
    }
  }
  return o;
};
shareUrl = function(){
  return shareEncode(settings()).then(function(d){
    return location.origin + "/effect/" + editor.effects.type + "/?d=" + d;
  });
};
window.mtShare = share = {
  open: function(){
    var this$ = this;
    return shareUrl().then(function(url){
      var root;
      mtTrack('share', {
        effect: editor.effects.type
      });
      root = this$.root;
      root.querySelector('input').value = url;
      root.querySelector('.mt-share-x').href = "https://x.com/intent/post?url=" + encodeURIComponent(url);
      root.querySelector('.mt-share-fb').href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
      this$.ldcv = this$.ldcv || new ldcover({
        root: root
      });
      return this$.ldcv.toggle(true);
    });
  },
  copy: function(){
    var input, p, this$ = this;
    input = this.root.querySelector('input');
    p = navigator.clipboard
      ? navigator.clipboard.writeText(input.value)
      : (input.select(), Promise.resolve(document.execCommand('copy')));
    return p.then(function(){
      var btn;
      btn = this$.root.querySelector('.mt-share-copy');
      btn.classList.add('tip-on');
      clearTimeout(this$._tip);
      return this$._tip = setTimeout(function(){
        return btn.classList.remove('tip-on');
      }, 1200);
    });
  },
  parse: function(q){
    if (q.d) {
      return shareDecode(q.d).then(function(o){
        var ret, k, ref$, v;
        ret = import$({}, o);
        delete ret.p;
        for (k in ref$ = o.p || {}) {
          v = ref$[k];
          ret["p." + k] = v;
        }
        return ret;
      })['catch'](function(e){
        console.warn("[maketext] share:", e);
        return null;
      });
    } else {
      return Promise.resolve(q.edit ? q : null);
    }
  },
  apply: function(q, fromD){
    var n, ref$, k, v, name, ref1$, i$, ref2$, len$, ref3$, id;
    if (fromD && q.t != null) {
      maketext.editor.input(q.t + "");
    }
    if (fromD && q.s != null && (n = document.querySelector('#font-size-slider .up.irs-input'))) {
      if ((ref$ = $(n).data('ionRangeSlider')) != null) {
        ref$.update({
          from: +q.s
        });
      }
      editor.update('fontSize', +q.s);
    }
    if (q.bg) {
      setColor('background', q.bg);
    }
    for (k in q) {
      v = q[k];
      if (/^p\./.exec(k)) {
        name = k.substring(2);
        if (document.querySelector("#editor-custom-options input[name=\"" + name + "\"][data-toggle=colorpicker]")) {
          setColor(name, v);
        } else if (n = document.querySelector("#editor-custom-options .irs-input input[data-name=\"" + name + "\"]")) {
          if ((ref1$ = $(n).data('ionRangeSlider')) != null) {
            ref1$.update({
              from: +v
            });
          }
          editor.update(name, +v);
        } else {
          editor.update(name, v);
        }
      }
    }
    if (q.pad != null) {
      mtFrame.setOpt('padding', +q.pad);
    }
    for (i$ = 0, len$ = (ref2$ = [['lh', 'lineHeight', 'line-height-slider'], ['ls', 'letterSpacing', 'letter-spacing-slider']]).length; i$ < len$; ++i$) {
      ref3$ = ref2$[i$], k = ref3$[0], name = ref3$[1], id = ref3$[2];
      if (q[k] != null) {
        if ((ref3$ = $(document.querySelector("#" + id + " .up.irs-input")).data('ionRangeSlider')) != null) {
          ref3$.update({
            from: +q[k]
          });
        }
        editor.update(name, +q[k]);
      }
    }
    if (q.ox != null || q.oy != null) {
      mtFrame.offset = {
        x: +q.ox || 0,
        y: +q.oy || 0
      };
      mtFrame.apply();
    }
    if (q.pat) {
      mtPattern.loadList().then(function(list){
        var p;
        if (p = list.find(function(it){
          return it.name === q.pat;
        })) {
          return mtPattern.set(p);
        }
      });
    }
    if (q.font) {
      return mtFont.load(q.font).then(function(f){
        return mtFont.setOverride(f);
      })['catch'](function(e){
        return console.warn("[maketext] share font:", e);
      });
    }
  }
};
setColor = function(name, value){
  var n, ldcp, inner;
  if ((n = document.querySelector("#editor input[name=\"" + name + "\"][data-toggle=colorpicker]")) && (ldcp = n.getColorPicker())) {
    ldcp.setColor(value);
    if (inner = n.parentNode.querySelector('.inner')) {
      inner.style.background = value;
    }
  }
  return editor.update(name, value);
};
document.addEventListener('DOMContentLoaded', function(){
  var root;
  if (!(root = share.root = document.querySelector('#share-panel'))) {
    return;
  }
  root.querySelector('.mt-share-copy').addEventListener('click', function(){
    return share.copy();
  });
  return root.querySelector('input').addEventListener('focus', function(){
    return this.select();
  });
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}