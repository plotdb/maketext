var shareUrl, share, setColor;
shareUrl = function(){
  var type, cur, q, f, p, e, k;
  type = editor.effects.type;
  cur = editor.config.cur;
  q = [['edit', 1], ['t', document.querySelector('#text-input').value], ['s', cur.fontSize]];
  if (cur.background) {
    q.push(['bg', cur.background]);
  }
  if (f = mtFont.override) {
    q.push([
      'font', (f.style || 'normal') === 'normal' && (f.weight || 400) + "" === '400'
        ? f.name
        : f.name + "/" + f.style + "/" + f.weight + ".ttf"
    ]);
  }
  if ((p = mtPattern.cur) && p.name !== 'upload') {
    q.push(['pat', p.name]);
  }
  q.push(['pad', mtFrame.opt.padding]);
  if (mtFrame.offset.x || mtFrame.offset.y) {
    q.push(['ox', Math.round(mtFrame.offset.x)], ['oy', Math.round(mtFrame.offset.y)]);
  }
  e = editor.effects[type];
  for (k in (e && e.js && e.js.edit) || {}) {
    if (cur[k] != null) {
      q.push(["p." + k, cur[k]]);
    }
  }
  return (location.origin + "/effect/" + type + "/?") + q.map(function(arg$){
    var k, v;
    k = arg$[0], v = arg$[1];
    return k + "=" + encodeURIComponent(v);
  }).join('&');
};
window.mtShare = share = {
  open: function(){
    var url, root;
    url = shareUrl();
    mtTrack('share', {
      effect: editor.effects.type
    });
    root = this.root;
    root.querySelector('input').value = url;
    root.querySelector('.mt-share-x').href = "https://x.com/intent/post?url=" + encodeURIComponent(url);
    root.querySelector('.mt-share-fb').href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
    this.ldcv = this.ldcv || new ldcover({
      root: root
    });
    return this.ldcv.toggle(true);
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
  apply: function(q){
    var k, v, name, n, ref$;
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
          if ((ref$ = $(n).data('ionRangeSlider')) != null) {
            ref$.update({
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