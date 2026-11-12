var loadFont, RASTER, backgroundColor, blobToDataurl, gifenc, gifBlob;
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
      var svg, svgWidth, textBox, feImages, style, node;
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
      return loadFont().then(function(tts){
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
          svg.setAttribute('viewBox', [250 - box.width * 0.5, 75 - box.height * 0.5, box.width, box.height].join(' '));
          svg.setAttribute('preserveAspectRatio', 'xMidYMid');
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
gifBlob = function(ctx, w, h){
  gifenc = gifenc || new Function('u', 'return import(u)')('/assets/lib/gifenc/main/gifenc.esm.js');
  return gifenc.then(function(arg$){
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