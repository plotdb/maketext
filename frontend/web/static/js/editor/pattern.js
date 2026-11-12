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