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