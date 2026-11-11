var XFLBASE, FONTLINKS, DEFAULTFONT, fontStyle, applyFont, useFont, chooser;
XFLBASE = 'https://xlfont.maketext.io';
FONTLINKS = XFLBASE + "/links";
DEFAULTFONT = 'Sansita One';
fontStyle = null;
applyFont = function(font){
  var family, i$, ref$, len$, sel;
  window.fontobj = font;
  family = "\"" + font.cssName + "\"";
  if (!fontStyle) {
    fontStyle = document.createElement('style');
    document.body.appendChild(fontStyle);
  }
  fontStyle.textContent = "svg text { font-family: " + family + "; }";
  for (i$ = 0, len$ = (ref$ = ['#cooltext', '.gallery']).length; i$ < len$; ++i$) {
    sel = ref$[i$];
    document.querySelector(sel).style.fontFamily = family;
  }
  return font;
};
window.useFont = useFont = function(name){
  return xfl.load({
    path: FONTLINKS + "/" + encodeURIComponent(name) + "/normal/400.ttf",
    name: name
  }).then(applyFont)['catch'](function(e){
    return console.warn("[maketext] failed to load font " + name + ":", e);
  });
};
chooser = null;
window.chooseFont = function(){
  var overlay, hide;
  if (!chooser) {
    overlay = document.createElement('div');
    overlay.className = 'mt-xfc-overlay d-none';
    overlay.innerHTML = document.getElementById('mt-xfc-tpl').innerHTML;
    document.body.appendChild(overlay);
    hide = function(){
      return overlay.classList.add('d-none');
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
      if (!font) {
        return;
      }
      applyFont(font);
      return editor.gallery.set('font', font.cssName);
    });
  }
  chooser.overlay.classList.remove('d-none');
  if (!chooser.rendered) {
    return chooser.rendered = chooser.xfc.init().then(function(){
      return chooser.xfc.render();
    });
  }
};
$(document).ready(function(){
  return useFont(DEFAULTFONT);
});