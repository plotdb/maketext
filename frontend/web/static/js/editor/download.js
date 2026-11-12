var loadFont, RASTER, backgroundColor, blobToDataurl, gifenc, gifencLoad, gifBlob, loadImage, dataurlCache, inlineImages, decodeFrames;
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
      var live, box, scale, svg, n, svgWidth, feImages, style, node;
      live = document.querySelector('#cooltext svg');
      box = mtFrame.box(live) || {
        x: 0,
        y: 0,
        width: 500,
        height: 150
      };
      scale = +mtFrame.opt.scale || 1;
      svg = live.cloneNode(true);
      svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
      if (n = svg.querySelector('.mt-crop')) {
        n.remove();
      }
      if (mtPattern.cur && (n = svg.querySelector('pattern image'))) {
        n.setAttribute('href', mtPattern.cur.url);
      }
      svgWidth = document.querySelector('#cooltext').getBoundingClientRect().width;
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
      return Promise.all([loadFont(), inlineImages(svg)]).then(function(arg$){
        var tts;
        tts = arg$[0];
        return Array.from(svg.querySelectorAll('text')).map(function(text, i){
          var textbox, fontSize, textValue, d, g1, g2, path, parent, i$, ref$, len$, name, that, pbox, x, y, width, height;
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
          x = -path.getBBox().width * 0.5 - path.getBBox().x + textbox.width * 0.5 + textbox.x;
          y = path.getBBox().height * 0.5 + textbox.height * 0.5 + textbox.y;
          g2.setAttribute("transform", "translate(" + x + ", " + y + ")");
          ref$ = [box.width, box.height].map(function(it){
            return Math.round(it * scale);
          }), width = ref$[0], height = ref$[1];
          svg.setAttribute('viewBox', [box.x, box.y, box.width, box.height].join(' '));
          svg.setAttribute('preserveAspectRatio', 'xMidYMid');
          svg.setAttribute('width', width + "px");
          svg.setAttribute('height', height + "px");
          return res({
            svg: svg,
            text: textValue,
            width: width,
            height: height
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
    if (format === 'gif' && mtPattern.cur && window.ImageDecoder) {
      return this.animatedGif();
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
  },
  animatedGif: function(){
    var fmt, hint, hintText, progress, local, this$ = this;
    mtTrack('download', {
      format: 'gif',
      effect: editor.effects.type,
      animated: true
    });
    fmt = RASTER.gif;
    hint = document.querySelector('#download small');
    hintText = hint.textContent;
    progress = function(t){
      return hint.textContent = t;
    };
    $('#download').modal('show');
    document.querySelector('#download img').removeAttribute('src');
    progress("rendering ...");
    local = {};
    return Promise.all([this.prepare(), decodeFrames(mtPattern.cur.url)]).then(function(arg$){
      var ref$, svg, text, width, height, frames, canvas, ctx, bk, image;
      ref$ = arg$[0], svg = ref$.svg, text = ref$.text, width = ref$.width, height = ref$.height, frames = arg$[1];
      local.text = text;
      local.width = width;
      local.height = height;
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d');
      bk = backgroundColor();
      image = svg.querySelector("pattern image");
      return gifencLoad().then(function(arg$){
        var GIFEncoder, quantize, applyPalette, enc, render;
        GIFEncoder = arg$.GIFEncoder, quantize = arg$.quantize, applyPalette = arg$.applyPalette;
        enc = GIFEncoder();
        render = function(i){
          if (i >= frames.length) {
            return;
          }
          progress("rendering frame " + (i + 1) + " / " + frames.length + " ...");
          image.setAttribute('href', frames[i].url);
          return smiltool.svgToDataurl(svg.outerHTML).then(function(url){
            return loadImage(url);
          }).then(function(img){
            var data, palette;
            ctx.fillStyle = bk;
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            data = ctx.getImageData(0, 0, width, height).data;
            palette = quantize(data, 256);
            enc.writeFrame(applyPalette(data, palette), width, height, {
              palette: palette,
              delay: frames[i].delay
            });
            return render(i + 1);
          });
        };
        return render(0).then(function(){
          enc.finish();
          return new Blob([enc.bytes()], {
            type: fmt.type
          });
        });
      });
    }).then(function(blob){
      return blobToDataurl(blob).then(function(dataurl){
        return {
          blob: blob,
          dataurl: dataurl
        };
      });
    }).then(function(arg$){
      var blob, dataurl, ref$;
      blob = arg$.blob, dataurl = arg$.dataurl;
      progress(hintText);
      return this$.download((ref$ = {
        dataurl: dataurl,
        blob: blob,
        name: local.text,
        postfix: fmt.ext,
        type: fmt.type
      }, ref$.width = local.width, ref$.height = local.height, ref$));
    })['catch'](function(e){
      console.warn("[maketext] gif:", e);
      return progress("failed to render the animated GIF.");
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
gifencLoad = function(){
  return gifenc = gifenc || new Function('u', 'return import(u)')('/assets/lib/gifenc/main/gifenc.esm.js');
};
gifBlob = function(ctx, w, h){
  return gifencLoad().then(function(arg$){
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
loadImage = function(url){
  return new Promise(function(res, rej){
    var img;
    img = new Image();
    img.onload = function(){
      return res(img);
    };
    img.onerror = rej;
    return img.src = url;
  });
};
dataurlCache = {};
inlineImages = function(svg){
  return Promise.all(Array.from(svg.querySelectorAll('image')).map(function(img){
    var href;
    href = img.getAttributeNS('http://www.w3.org/1999/xlink', 'href') || img.getAttribute('href');
    if (!href || /^data:/.exec(href)) {
      return;
    }
    return (dataurlCache[href] || (dataurlCache[href] = fetch(href).then(function(it){
      return it.blob();
    }).then(blobToDataurl))).then(function(url){
      if (img.hasAttribute('href')) {
        return img.setAttribute('href', url);
      } else {
        return img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', url);
      }
    });
  }));
};
decodeFrames = function(url){
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
      var count, canvas, frames, step;
      count = Math.min(60, dec.tracks.selectedTrack.frameCount || 1);
      canvas = document.createElement('canvas');
      frames = [];
      step = function(i){
        if (i >= count) {
          return frames;
        }
        return dec.decode({
          frameIndex: i
        }).then(function(arg$){
          var image;
          image = arg$.image;
          canvas.width = image.displayWidth;
          canvas.height = image.displayHeight;
          canvas.getContext('2d').drawImage(image, 0, 0);
          frames.push({
            url: canvas.toDataURL(),
            delay: Math.max(20, Math.round((image.duration || 100000) / 1000))
          });
          image.close();
          return step(i + 1);
        });
      };
      return step(0);
    });
  });
};