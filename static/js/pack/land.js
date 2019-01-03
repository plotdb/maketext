// Generated by LiveScript 1.3.0
$(document).ready(function(){
  var k, ref$, v, ret, editor, updateText, scrollto, list, res$, html, i$, to$, i, code, j$, j, d, initSlider, initColorpicker, clusterize;
  for (k in ref$ = effects) {
    v = ref$[k];
    ret = null;
    eval(v.js);
    if (ret) {
      v.js = ret;
    }
  }
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
  updateText = function(node){
    var textInput, value;
    node = node || document.querySelector('#text-input');
    textInput = document.querySelector('#text-input');
    value = node.value || 'Hello World!';
    Array.from(document.querySelectorAll('.gallery text')).map(function(d, i){
      return d.textContent = value;
    });
    Array.from(document.querySelectorAll('#cooltext text')).map(function(it){
      return it.textContent = value;
    });
    return textInput.value = value;
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
    var svg, this$ = this;
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
      return;
    }
    if (name === 'fontSize') {
      Array.from(document.querySelectorAll('.gallery text')).map(function(node, i){
        return node.style.fontSize = value + "px";
      });
    }
    Array.from(document.querySelectorAll('.gallery .item')).map(function(d, i){
      var type;
      if (!d.parentNode.style.opacity) {
        return;
      }
      type = d.getAttribute('data-type');
      if (!(this$.effects[type].js && this$.effects[type].watch)) {
        return;
      }
      return this$.effects[type].js.watch(this$.config.cur, this$.config.old, d);
    });
    if (name === 'background') {
      return Array.from(document.querySelectorAll('.gallery svg')).map(function(d, i){
        return d.style.background = value;
      });
    }
  };
  res$ = [];
  for (k in ref$ = effects) {
    v = ref$[k];
    res$.push([k, v]);
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
      d[1].html = d[1].html.replace("<svg", "<svg width='100%' height='100%'");
      d[1].html = d[1].html.replace("0 0 500 150", "0 0 500 150");
      code += "<div class=\"item\" data-type=\"" + d[0] + "\"><div class=\"inner\">" + d[1].html + "</div></div>";
    }
    html.push("<div class=\"line\" style=\"visibility:hidden\">" + code + "</div>");
  }
  initSlider = function(node, key, value){
    var x$;
    x$ = $(node.querySelector('.irs-input'));
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
    ldcp = new ldColorPicker(node.querySelector('input'), {});
    return ldcp.on('change', function(it){
      editor.update(key, it);
      return node.querySelector('.inner').style.background = it;
    });
  };
  document.querySelector('.gallery').addEventListener('click', function(e){
    var target, type, html, svg, bkcolor, effect, options, colors, k, v, ref$, node, ref1$, results$ = [];
    target = e.target;
    if (!(target && target.classList && target.classList.contains('item'))) {
      return;
    }
    type = target.getAttribute('data-type');
    if (!type) {
      return;
    }
    html = effects[type].html;
    html = html.replace(/id="([^"]+)"/g, 'id="editing-$1"');
    html = html.replace(/url\(#([^)]+)\)/g, 'url(#editing-$1)');
    document.querySelector('#cooltext').innerHTML = html;
    svg = document.querySelector('#cooltext svg');
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
  });
  clusterize = new Clusterize({
    rows: html,
    scrollElem: document.querySelector('body'),
    contentElem: document.querySelector('#gallery'),
    rows_in_block: 50
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
      }
      if (box.y + box.height < 0 || box.y + box.height > height) {
        d.style.opacity = 0;
        return d.style.transform = "scale(0.9)";
      } else {
        d.style.opacity = 1;
        return d.style.transform = "scale(1)";
      }
    });
  });
  ldColorPicker.init();
  Array.from(document.querySelectorAll('#font-size-slider .up.irs-input')).map(function(d, i){
    return $(d).ionRangeSlider({
      onChange: function(data){
        return editor.update('fontSize', data.from);
      }
    });
  });
  return window.subscribe = function(){
    var node, email, ret;
    node = document.querySelector('#subscribe');
    node.classList.remove('done', 'fail');
    node.classList.add('loading');
    email = document.querySelector('#email').value;
    ret = /^[^@]+@[^.]+\.(.+)$/.exec(email || '');
    if (!ret || !email) {
      return;
    }
    return $.ajax({
      url: '/d/newsletter-subscription',
      method: 'PUT',
      data: {
        email: email
      }
    }).then(function(){
      node.classList.remove('loading');
      return node.classList.add('done');
    }).fail(function(){
      node.classList.remove('loading');
      return node.classList.add('fail');
    });
  };
});
// Generated by LiveScript 1.3.0
$(document).ready(function(){
  var html, i$, to$, i, code, j$, j, d, setPalette, paletteBtn, palette, clusterize;
  html = [];
  for (i$ = 0, to$ = palettes.length; i$ < to$; i$ += 4) {
    i = i$;
    code = "";
    for (j$ = 0; j$ < 4; ++j$) {
      j = j$;
      d = palettes[i + j];
      if (!d) {
        break;
      }
      code += ("<div class=\"palette\"><div class=\"name\">" + d[0] + "</div>") + d[1].map(fn$).join('') + "</div>";
    }
    html.push("<div class='line'>" + code + "</div>");
  }
  window.setPalette = setPalette = function(colors, name){
    name == null && (name = 'Palette');
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
      return ldcp.setIdx(i % colors.length);
    });
  };
  paletteBtn = document.querySelector('#palette-btn .palette');
  palette = palettes[Math.floor(Math.random() * palettes.length)];
  setPalette(palette[1], palette[0]);
  /*
  palette-btn.innerHTML = (
    for i from 0 til palette.1.length =>
      "<div class='color' style='background:#{palette.1[i]}'></div>"
  ).join('')
  */
  clusterize = new Clusterize({
    rows: html,
    scrollElem: document.querySelector('#palette-picker .clusterize-scroll'),
    contentElem: document.querySelector('#palette-picker .clusterize-content'),
    rows_in_block: 50
  });
  document.querySelector('#palette-picker').addEventListener('click', function(e){
    var target, colors, name;
    target = e.target;
    if (!target || !target.classList || !target.classList.contains('palette')) {
      return;
    }
    colors = Array.from(target.querySelectorAll('.color')).map(function(it){
      return it.style.background;
    });
    name = target.querySelector('.name').textContent;
    $('#palette-picker').modal('hide');
    return setPalette(colors, name);
  });
  return Array.from(document.querySelectorAll('.color input[data-toggle="colorpicker"]')).map(function(d, i){
    var ldcp, name;
    ldcp = d.getColorPicker();
    name = d.getAttribute('name');
    return ldcp.on('change', function(it){
      editor.update(name, it);
      return d.parentNode.querySelector('.inner').style.background = it;
    });
  });
  function fn$(it){
    return "<div class='color' style='background:" + it + "'></div>";
  }
});
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
// Generated by LiveScript 1.3.0
window.convert = {
  prepare: function(){
    return new Promise(function(res, rej){
      var svg, svgWidth, textBox, feImages, style, node, this$ = this;
      svg = document.querySelector('#cooltext svg').cloneNode(true);
      svgWidth = document.querySelector('#cooltext').getBoundingClientRect().width;
      textBox = document.querySelector('#cooltext text').getBoundingClientRect();
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
      return textToSvg.load("/assets/fonts/ttf/" + (window.fontname || 'ArialBlack') + "-Regular.ttf", function(e, tts){
        return Array.from(svg.querySelectorAll('text')).map(function(text, i){
          var textbox, fontSize, textValue, d, g1, g2, path, parent, i$, ref$, len$, name, that, pbox, box, x, y;
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
          box = {
            width: textBox.width * 1.2 + 20,
            height: textBox.height * 1.2 + 20
          };
          x = -path.getBBox().width * 0.5 - path.getBBox().x + textbox.width * 0.5 + textbox.x;
          y = path.getBBox().height * 0.5 + textbox.height * 0.5 + textbox.y;
          g2.setAttribute("transform", "translate(" + x + ", " + y + ")");
          svg.setAttribute('viewBox', "0 0 500 150");
          svg.setAttribute('width', box.width + "px");
          svg.setAttribute('height', box.height + "px");
          return res({
            svg: svg,
            text: textValue,
            width: box.width,
            height: box.height
          });
        });
      });
    });
  },
  download: function(option){
    var that, blob, url, x$;
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
    document.querySelector('#download .result').style.height = option.height + "px";
    x$ = document.querySelector('#download .btn');
    x$.setAttribute('href', url);
    x$.setAttribute('download', (option.name || 'output') + "." + (option.postfix || 'png'));
    return x$;
  },
  svg: function(){
    var this$ = this;
    return this.prepare().then(function(arg$){
      var svg, text, width, height;
      svg = arg$.svg, text = arg$.text, width = arg$.width, height = arg$.height;
      return this$.download({
        width: width,
        height: height,
        content: svg.outerHTML,
        type: 'image/svg+xml',
        name: text,
        postfix: 'svg'
      });
    });
  },
  png: function(){
    var ref$, textValue, box, this$ = this;
    ref$ = [
      '', {
        width: 500,
        height: 150
      }
    ], textValue = ref$[0], box = ref$[1];
    return this.prepare().then(function(arg$){
      var svg, text, width, height;
      svg = arg$.svg, text = arg$.text, width = arg$.width, height = arg$.height;
      textValue = text;
      box.width = width;
      box.height = height;
      return smiltool.svgToDataurl(svg.outerHTML);
    }).then(function(it){
      return smiltool.urlToDataurl(it, box.width, box.height);
    }).then(function(it){
      return smiltool.dataurlToBlob(it);
    }).then(function(it){
      return this$.download({
        width: box.width,
        height: box.height,
        blob: it,
        name: textValue,
        postfix: 'png'
      });
    });
  }
};