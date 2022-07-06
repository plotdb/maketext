// Generated by LiveScript 1.3.0
$(document).ready(function(){
  var html, i$, to$, i, code, j$, j, d, idx, ref$, x, y, clusterize, useFont;
  html = [];
  for (i$ = 0, to$ = fonts.length; i$ < to$; i$ += 4) {
    i = i$;
    code = "";
    for (j$ = 0; j$ < 4; ++j$) {
      j = j$;
      d = fonts[i + j];
      if (!d) {
        break;
      }
      idx = i + j + 1;
      ref$ = [-400 * Math.floor(idx / 167), -30 * (idx % 167)], x = ref$[0], y = ref$[1];
      code += "<div class='item'><div class='inner'>\n  <div class=\"img\" style=\"background-position:" + x + "px " + y + "px\"></div>\n  <span>" + d + "</span>\n</div></div>";
    }
    html.push("<div class='line'><div class='inner'>" + code + "</div></div>");
  }
  clusterize = new Clusterize({
    rows: html,
    scrollElem: document.querySelector('#font-picker .clusterize-scroll'),
    contentElem: document.querySelector('#font-picker .clusterize-content'),
    rows_in_block: 50
  });
  useFont = function(name){
    var style;
    name = name.replace(/\.png/, '');
    window.fontname = name;
    style = document.createElement("style");
    style.innerHTML = "@font-face {\n  font-family: " + name + ";\n  src: url(/assets/fonts/ttf/" + name + "-Regular.ttf), url(/assets/fonts/ttf/" + name + ".ttf);\n}\nsvg text {\n  font-family: " + name + ";\n}";
    document.body.appendChild(style);
    document.querySelector('#cooltext').style.fontFamily = name;
    document.querySelector('.gallery').style.fontFamily = name;
    return $('#font-picker').modal('hide');
  };
  document.querySelector('#font-picker').addEventListener('click', function(e){
    var target;
    target = e.target;
    if (!target || !target.classList || !target.classList.contains('inner')) {
      return;
    }
    return useFont(target.querySelector('span').innerText);
  });
  return useFont('SansitaOne');
});