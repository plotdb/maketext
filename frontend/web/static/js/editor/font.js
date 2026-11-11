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