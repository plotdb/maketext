 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_attrs(t,r){var a="";for(var s in t)if(pug_has_own_property.call(t,s)){var u=t[s];if("class"===s){u=pug_classes(u),a=pug_attr(s,u,!1,r)+a;continue}"style"===s&&(u=pug_style(u)),a+=pug_attr(s,u,!1,r)}return a}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_merge(e,r){if(1===arguments.length){for(var t=e[0],g=1;g<e.length;g++)t=pug_merge(t,e[g]);return t}for(var l in r)if("class"===l){var n=e[l]||[];e[l]=(Array.isArray(n)?n:[n]).concat(r[l]||[])}else if("style"===l){var n=pug_style(e[l]);n=n&&";"!==n[n.length-1]?n+";":n;var a=pug_style(r[l]);a=a&&";"!==a[a.length-1]?a+";":a,e[l]=n+a}else e[l]=r[l];return e}
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+""}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Array, JSON, asseturl, b64img, blockLoader, bundleurl, c, cssLoader, debug, decache, defer, description, effect, escape, favicon, gaIds, hashfile, isApi, libLoader, md5, scriptLoader, thumb, thumbnail, title, url, version) {
      pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
if(!libLoader) {
  libLoader = {
    js: {url: {}},
    css: {url: {}},
    root: function(r) { libLoader._r = r; },
    _r: "/assets/lib",
    _v: "",
    version: function(v) { libLoader._v = (v ? "?v=" + v : ""); }
  }
  if(version) { libLoader.version(version); }
}

pug_mixins["script"] = pug_interp = function(os,cfg){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var str = '', urls = [];
if(!Array.isArray(os)) { os = [os]; }
// iterate os
;(function(){
  var $$obj = os;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var o = $$obj[pug_index0];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.js"); }
if (!libLoader.js.url[url]) {
libLoader.js.url[url] = true;
defer = (typeof(c.defer) == "undefined" ? true : !!c.defer);
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
var hurl = (typeof(asseturl) == "function") ? asseturl(url, locals.filename) : url;
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", hurl + (hurl == url ? libLoader._v : ""), true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var o = $$obj[pug_index0];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.js"); }
if (!libLoader.js.url[url]) {
libLoader.js.url[url] = true;
defer = (typeof(c.defer) == "undefined" ? true : !!c.defer);
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
var hurl = (typeof(asseturl) == "function") ? asseturl(url, locals.filename) : url;
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", hurl + (hurl == url ? libLoader._v : ""), true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
    }
  }
}).call(this);

if (cfg && cfg.pack) {
var name = md5(str);
var min = (typeof(cfg.min) == "undefined" || cfg.min);
hashfile({type: "js", name: name, files: urls, src: locals.filename});
// content-addressed url when the bundle has been built. it needs no `_v`: the
// filename already changes with the content. before the first build there is no
// entry yet, so fall back to the plain name ( which does need `_v` ).
var fn = (typeof(bundleurl) == "function") ? bundleurl({type: "js", name: name, min: min, src: locals.filename}) : null;
if(!fn) { fn = "/assets/bundle/" + name + (min ? ".min" : "") + ".js" + libLoader._v; }
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", fn, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
};
pug_mixins["css"] = pug_interp = function(os,cfg){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var str = '', urls = [];
if(!Array.isArray(os)) { os = [os]; }
// iterate os
;(function(){
  var $$obj = os;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var o = $$obj[pug_index1];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.css"); }
if (!libLoader.css.url[url]) {
libLoader.css.url[url] = true;
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url, true, true)) + "\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
var hurl = (typeof(asseturl) == "function") ? asseturl(url, locals.filename) : url;
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", hurl + (hurl == url ? libLoader._v : ""), true, true)) + "\u003E";
}
}
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var o = $$obj[pug_index1];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.css"); }
if (!libLoader.css.url[url]) {
libLoader.css.url[url] = true;
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url, true, true)) + "\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
var hurl = (typeof(asseturl) == "function") ? asseturl(url, locals.filename) : url;
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", hurl + (hurl == url ? libLoader._v : ""), true, true)) + "\u003E";
}
}
    }
  }
}).call(this);

if (cfg && cfg.pack) {
var name = md5(str);
var min = (typeof(cfg.min) == "undefined" || cfg.min);
hashfile({type: "css", name: name, files: urls, src: locals.filename});
var fn = (typeof(bundleurl) == "function") ? bundleurl({type: "css", name: name, min: min, src: locals.filename}) : null;
if(!fn) { fn = "/assets/bundle/" + name + (min ? ".min" : "") + ".css" + libLoader._v; }
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", fn, true, true)) + "\u003E";
}
};
var debug = false
var thumbnail = "https://maketext.io/assets/img/thumbnail.png"
var thumb = {type: "image/png", width: "1200", height: "630"}
var favicon = "/assets/img/favicon.png"
var title = "Cool Texts Generator in SVG / PNG with 30+ Effects x 800+ Fonts · maketext.io"
var description = "style your words and logos with tons of fonts and customizable effects within seconds."
var url = "https://maketext.io/"
pug_html = pug_html + "\u003Chtml lang=\"en\"\u003E";
if (!(libLoader || scriptLoader)) {
if(!scriptLoader) { scriptLoader = {url: {}, config: {}}; }
if(!decache) { decache = (version? "?v=" + version : ""); }
pug_mixins["script"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
scriptLoader.config = (config ? config : {});
if (!scriptLoader.url[url]) {
scriptLoader.url[url] = true;
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + decache, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
};
if(!cssLoader) { cssLoader = {url: {}}; }
pug_mixins["css"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
cssLoader.config = (config ? config : {});
if (!cssLoader.url[url]) {
cssLoader.url[url] = true;
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + decache, true, true)) + "\u003E";
}
};
if(!blockLoader) { blockLoader = {name: {}, config: {}}; }







}
var escjson = function(obj) { return 'JSON.parse(unescape("' + escape(JSON.stringify(obj)) + '"))'; };
var eschtml = (function() { var MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&#34;', "'": '&#39;' }; var repl = function(c) { return MAP[c]; }; return function(s) { return s.replace(/[&<>'"]/g, repl); }; })();
function ellipsis(str, len) {
  return ((str || '').substring(0, len || 200) + (((str || '').length > (len || 200)) ? '...' : ''));
}

pug_mixins["nbr"] = pug_interp = function(count){
var block = (this && this.block), attributes = (this && this.attributes) || {};
for (var i = 0; i < count; i++)
{
pug_html = pug_html + "\u003Cbr\u003E";
}
};






var b64img = {};
b64img.px1 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAIA"
var loremtext = {
  zh: "料何緊許團人受間口語日是藝一選去，得系目、再驗現表爸示片球法中轉國想我樹我，色生早都沒方上情精一廣發！能生運想毒一生人一身德接地，說張在未安人、否臺重壓車亞是我！終力邊技的大因全見起？切問去火極性現中府會行多他千時，來管表前理不開走於展長因，現多上我，工行他眼。總務離子方區面人話同下，這國當非視後得父能民觀基作影輕印度民雖主他是一，星月死較以太就而開後現：國這作有，他你地象的則，引管戰照十都是與行求證來亞電上地言裡先保。大去形上樹。計太風何不先歡的送但假河線己綠？計像因在……初人快政爭連合多考超的得麼此是間不跟代光離制不主政重造的想高據的意臺月飛可成可有時情乎為灣臺我養家小，叫轉於可！錢因其他節，物如盡男府我西上事是似個過孩而過要海？更神施一關王野久沒玩動一趣庭顧倒足要集我民雲能信爸合以物頭容戰度系士我多學一、區作一，過業手：大不結獨星科表小黨上千法值之兒聲價女去大著把己。",
  en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};













pug_mixins["slider"] = pug_interp = function(size){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if(!size) size = "sm"
pug_html = pug_html + "\u003Cdiv class=\"up irs-input\"\u003E\u003Cinput" + (pug_attr("class", pug_classes(["form-control","form-control-" + size], [false,true]), false, true)+" default-switch=\"false\"") + "\u003E\u003C\u002Fdiv\u003E";
};
pug_mixins["color-input"] = pug_interp = function(name,size){
var block = (this && this.block), attributes = (this && this.attributes) || {};
if(!size) size = "sm"
pug_html = pug_html + "\u003Cdiv class=\"color\"\u003E\u003Cinput" + (pug_attr("class", pug_classes(["form-control","form-control-" + size], [false,true]), false, true)+pug_attr("name", name, true, true)+" value=\"#f0f0f0\" data-classname=\"no-button compact-palette flat\" data-toggle=\"colorpicker\" data-context=\"random\" data-exclusive=\"true\"") + "\u003E\u003Cdiv class=\"inner\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_mixins["x-icon"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Csvg class=\"mt-x-icon\" viewBox=\"0 0 24 24\" width=\"0.9em\" height=\"0.9em\"\u003E\u003Cpath fill=\"currentColor\" d=\"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z\"\u003E\u003C\u002Fpath\u003E\u003C\u002Fsvg\u003E";
};
title = effect.label + " Text Effect #" + effect.no + " - Free Online Generator in SVG / PNG · maketext.io";
description = (effect.desc ? effect.desc + " " : "") + "Make " + effect.label.toLowerCase() + " text effect online, customize colors and fonts, and download it as SVG, PNG, JPG, WEBP or GIF.";
url = "https://maketext.io/effect/" + effect.key + "/";
thumbnail = "https://maketext.io/assets/og/" + effect.key + ".jpg";
thumb = {type: "image/jpeg", width: "1200", height: "630"};
pug_html = pug_html + "\u003Chead prefix=\"og: http:\u002F\u002Fogp.me\u002Fns#\"\u003E";
if (!debug) {
var gaIds = ["G-9220DQ9M90"]
pug_html = pug_html + "\u003Cscript" + (pug_attr("async", true, true, true)+pug_attr("src", "https://www.googletagmanager.com/gtag/js?id=" + gaIds[0], true, true)) + "\u003E\u003C\u002Fscript\u003E\u003Cscript\u003Ewindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\u003C\u002Fscript\u003E";
// iterate gaIds
;(function(){
  var $$obj = gaIds;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var id = $$obj[pug_index2];
pug_html = pug_html + "\u003Cscript\u003Egtag('config', '" + (pug_escape(null == (pug_interp = id) ? "" : pug_interp)) + "');\u003C\u002Fscript\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var id = $$obj[pug_index2];
pug_html = pug_html + "\u003Cscript\u003Egtag('config', '" + (pug_escape(null == (pug_interp = id) ? "" : pug_interp)) + "');\u003C\u002Fscript\u003E";
    }
  }
}).call(this);

}
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0\"\u003E\u003Ctitle\u003E" + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\u003Cmeta" + (" name=\"description\""+pug_attr("content", description, true, true)) + "\u003E\u003Cmeta property=\"og:locale\" content=\"en_US\"\u003E\u003Cmeta" + (" property=\"og:image\""+pug_attr("content", thumbnail, true, true)) + "\u003E\u003Cmeta" + (" property=\"og:image:type\""+pug_attr("content", thumb.type, true, true)) + "\u003E\u003Cmeta" + (" property=\"og:image:width\""+pug_attr("content", thumb.width, true, true)) + "\u003E\u003Cmeta" + (" property=\"og:image:height\""+pug_attr("content", thumb.height, true, true)) + "\u003E\u003Cmeta property=\"og:type\" content=\"website\"\u003E\u003Cmeta" + (" property=\"og:url\""+pug_attr("content", url, true, true)) + "\u003E\u003Cmeta" + (" property=\"og:title\""+pug_attr("content", title, true, true)) + "\u003E\u003Cmeta" + (" property=\"og:description\""+pug_attr("content", description, true, true)) + "\u003E\u003Cmeta name=\"twitter:card\" content=\"summary_large_image\"\u003E\u003Cmeta" + (" name=\"twitter:title\""+pug_attr("content", title, true, true)) + "\u003E\u003Cmeta" + (" name=\"twitter:description\""+pug_attr("content", description, true, true)) + "\u003E\u003Cmeta" + (" name=\"twitter:image\""+pug_attr("content", thumbnail, true, true)) + "\u003E\u003Clink" + (" rel=\"icon\" type=\"image\u002Fx-icon\""+pug_attr("href", favicon, true, true)) + "\u003E\u003Clink rel=\"preconnect\" href=\"https:\u002F\u002Fxlfont.maketext.io\"\u003E";
pug_mixins["css"]([
      "/assets/vendor/bootstrap/4.0.0/css/bootstrap.min.css",
      "/assets/vendor/fontawesome/4.7.0/css/font-awesome.min.css",
      "/assets/vendor/clusterize/0.18.1/clusterize.css",
      "/assets/vendor/ion-rangeslider/2.1.7/css/ion.rangeSlider.css",
      "/assets/vendor/ion-rangeslider/2.1.7/css/ion.rangeSlider.skinFlat.css",
      {name: "@loadingio/bootstrap.ext"},
      {name: "ldiconfont", path: "ldif.min.css"},
      {name: "ldloader"},
      {name: "ldcover"},
      {name: "ldslider"},
      {name: "@loadingio/ldcolorpicker"},
      {name: "ldpalettepicker"},
      {name: "@xlfont/choose", path: "index.min.css"},
      "/css/mt/index.css"
    ], {pack: true});
pug_html = pug_html + "\u003Cstyle type=\"text\u002Fcss\"\u003E@font-face {\n  font-family: 'ldi';\n  src: url('\u002Fassets\u002Flib\u002Fldiconfont\u002Fmain\u002Fldif.ttf') format('truetype');\n}\u003C\u002Fstyle\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E";
pug_mixins["script"]([
      "/assets/vendor/jquery/1.10.2/jquery.min.js",
      "/assets/vendor/popper/1.12.5/index.js",
      "/assets/vendor/bootstrap/4.0.0/js/bootstrap.min.js",
      "/assets/vendor/clusterize/0.18.1/clusterize.min.js",
      "/assets/vendor/ion-rangeslider/2.1.7/js/ion.rangeSlider.min.js",
      "/assets/vendor/smiltool/latest/index.js",
      "/assets/vendor/d3/d3-color/1.2.3/d3-color.min.js",
      "/assets/vendor/palettes.js",
      {name: "@loadingio/ldquery"},
      {name: "@loadingio/debounce.js"},
      {name: "proxise"},
      {name: "ldcover"},
      {name: "ldcolor"},
      {name: "ldslider"},
      {name: "@loadingio/ldcolorpicker"},
      {name: "@loadingio/paginate"},
      {name: "ldpalettepicker", path: "ldp.min.js"},
      {name: "ldpalettepicker"},
      {name: "ldview"},
      {name: "ldloader"},
      {name: "@loadingio/vscroll"},
      {name: "@plotdb/opentype.js", path: "dist/opentype.min.js"},
      {name: "@xlfont/load"},
      {name: "@xlfont/choose"},
      "/js/effects/index.js"
    ], {pack: true});
var isApi = false
pug_mixins["xfc"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cdiv class=\"xfc toolbar d-flex flex-column h-100\"\u003E\u003Cdiv class=\"xfc-head d-flex px-3 py-2 border-bottom\"\u003E\u003Cdiv class=\"mr-2 text-left\"\u003E\u003Cdiv" + (" class=\"text-muted\""+" style=\"font-size:12px\""+pug_attr("t", true, true, true)) + "\u003ECategory\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown\"\u003E\u003Cdiv class=\"btn btn-sm btn-outline-secondary dropdown-toggle text-capitalize\" ld=\"cur-cat\" style=\"min-width:5em\" data-toggle=\"dropdown\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown-menu shadow-sm\" style=\"max-height:50vh;overscroll-behavior:contain;overflow-y:scroll\"\u003E\u003Cdiv class=\"dropdown-item text-capitalize\" ld-each=\"category\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mr-2 text-left\"\u003E\u003Cdiv" + (" class=\"text-muted\""+" style=\"font-size:12px\""+pug_attr("t", true, true, true)) + "\u003ESubset\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown mr-2\"\u003E\u003Cdiv class=\"btn btn-sm btn-outline-secondary dropdown-toggle text-capitalize\" ld=\"cur-subset\" style=\"min-width:5em\" data-toggle=\"dropdown\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown-menu shadow-sm\" style=\"max-height:50vh;overscroll-behavior:contain;overflow-y:scroll\"\u003E\u003Cdiv class=\"dropdown-item text-capitalize\" ld-each=\"subset\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"flex-grow-1 text-left\"\u003E\u003Cdiv" + (" class=\"text-muted\""+" style=\"font-size:12px\""+pug_attr("t", true, true, true)) + "\u003EName\u003C\u002Fdiv\u003E\u003Cinput class=\"form-control form-control-sm\" ld=\"search\" placeholder=\"Search...\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"text-nowrap\"\u003E\u003Cdiv class=\"text-muted\" style=\"font-size:12px\"\u003E&nbsp;\u003C\u002Fdiv\u003E\u003Cdiv" + (" class=\"btn btn-sm btn-text mx-2\""+pug_attr("t", true, true, true)) + "\u003Eor\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-sm btn-outline-secondary btn-upload\" ld=\"upload-button\"\u003E\u003Cspan" + (pug_attr("t", true, true, true)) + "\u003EUse Your Own Font\u003C\u002Fspan\u003E\u003Cinput type=\"file\" ld=\"upload\"\u003E\u003Ci class=\"i-lock ml-2\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"ml-2\"\u003E\u003Cdiv class=\"text-muted\" style=\"font-size:12px\"\u003E&nbsp;\u003C\u002Fdiv\u003E\u003Cdiv" + (" class=\"btn btn-sm btn-outline-secondary\""+pug_attr("t", true, true, true)+" ld=\"cancel\"") + "\u003ECancel\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"xfc-content flex-grow-1\" style=\"overflow-y:hidden\"\u003E\u003Cdiv ld=\"font-list\" style=\"max-height:100%\"\u003E\u003Cdiv class=\"xfc-font\" ld-each=\"font\"\u003E\u003Cdiv class=\"preview\" ld=\"preview\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"name\" ld=\"name\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
block && block();
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003Ctemplate id=\"mt-xfc-tpl\"\u003E\u003Cdiv class=\"mt-xfc-panel\"\u003E";
pug_mixins["xfc"]();
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Ftemplate\u003E";



























pug_mixins["ldpe"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cdiv class=\"ldp\"\u003E\u003Cdiv class=\"name\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"colors\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"edit\"\u003E\u003Cdiv class=\"inner\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-sm-6 mb-2\"\u003E\u003Cdiv class=\"ldcolorpicker no-border no-palette\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm-6 mb-2\"\u003E\u003Cdiv class=\"d-flex g-2 mb-2\"\u003E\u003Cdiv class=\"w-50\"\u003E\u003Cselect class=\"form-control form-control-local-sm\" value=\"rgb\"\u003E\u003Coption value=\"rgb\"\u003ERGB\u003C\u002Foption\u003E\u003Coption value=\"hsl\"\u003EHSL\u003C\u002Foption\u003E\u003Coption value=\"hcl\"\u003EHCL\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"w-100\"\u003E\u003Cinput class=\"form-control form-control-local-sm value\" placeholder=\"Hex Value\" data-tag=\"hex\" style=\"margin:0\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
var configs = [["Red", "Green", "Blue", "rgb", "active"], ["Hue", "Saturation", "Luminance", "hsl",""], ["Hue", "Chroma", "Luminance", "hcl",""]];
// iterate configs
;(function(){
  var $$obj = configs;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var config = $$obj[pug_index5];
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["config","g-2",config[4]], [false,false,true]), false, true)+pug_attr("data-tag", config[3], true, true)) + "\u003E\u003Cdiv class=\"w-100\"\u003E\u003Cdiv class=\"label-group\"\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = config[0]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cinput" + (" class=\"ldrs sm auto\""+pug_attr("data-tag", config[3] + "-" + config[0][0].toLowerCase(), true, true)) + "\u003E\u003Cdiv class=\"label-group\"\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = config[1]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cinput" + (" class=\"ldrs sm auto\""+pug_attr("data-tag", config[3] + "-" + config[1][0].toLowerCase(), true, true)) + "\u003E\u003Cdiv class=\"label-group\"\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = config[2]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cinput" + (" class=\"ldrs sm auto\""+pug_attr("data-tag", config[3] + "-" + config[2][0].toLowerCase(), true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"w-50\"\u003E\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[0][0].toLowerCase(), true, true)) + "\u003E\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[1][0].toLowerCase(), true, true)) + "\u003E\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[2][0].toLowerCase(), true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var config = $$obj[pug_index5];
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["config","g-2",config[4]], [false,false,true]), false, true)+pug_attr("data-tag", config[3], true, true)) + "\u003E\u003Cdiv class=\"w-100\"\u003E\u003Cdiv class=\"label-group\"\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = config[0]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cinput" + (" class=\"ldrs sm auto\""+pug_attr("data-tag", config[3] + "-" + config[0][0].toLowerCase(), true, true)) + "\u003E\u003Cdiv class=\"label-group\"\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = config[1]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cinput" + (" class=\"ldrs sm auto\""+pug_attr("data-tag", config[3] + "-" + config[1][0].toLowerCase(), true, true)) + "\u003E\u003Cdiv class=\"label-group\"\u003E\u003Cspan\u003E" + (pug_escape(null == (pug_interp = config[2]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cinput" + (" class=\"ldrs sm auto\""+pug_attr("data-tag", config[3] + "-" + config[2][0].toLowerCase(), true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"w-50\"\u003E\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[0][0].toLowerCase(), true, true)) + "\u003E\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[1][0].toLowerCase(), true, true)) + "\u003E\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[2][0].toLowerCase(), true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"my-2\"\u003E\u003Cinput class=\"form-control form-control-local-sm\" data-tag=\"tag\" placeholder=\"Comma separated tags for this color\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_mixins["ldpp"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cdiv" + (" class=\"ldpp\""+pug_attr("ldpp", true, true, true)) + "\u003E\u003Cdiv class=\"header d-flex justify-content-center flex-wrap g-2\"\u003E\u003Cdiv style=\"white-space:nowrap;flex:3 0 auto;width:10em\"\u003E\u003Cdiv class=\"input-group\"\u003E\u003Cinput class=\"form-control\" data-tag=\"search\"\u003E\u003Cdiv class=\"input-group-append\"\u003E\u003Cdiv class=\"btn btn-outline-dark dropdown-toggle\" data-toggle=\"dropdown\"\u003E\u003Cspan t=\"filter\"\u003E&nbsp;\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown-menu shadow-sm\" data-tag=\"categories\"\u003E\u003Ca class=\"dropdown-item\" href=\"#\" data-cat=\"\"\u003E\u003Cspan t=\"all\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"dropdown-divider\"\u003E\u003C\u002Fdiv\u003E\u003Ca class=\"dropdown-item\" href=\"#\" data-cat=\"artwork\"\u003E\u003Cspan t=\"artwork\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003Ca class=\"dropdown-item\" href=\"#\" data-cat=\"brand\"\u003E\u003Cspan t=\"brand\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003Ca class=\"dropdown-item\" href=\"#\" data-cat=\"concept\"\u003E\u003Cspan t=\"concept\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"dropdown-divider\"\u003E\u003C\u002Fdiv\u003E\u003Ca class=\"dropdown-item\" href=\"#\" data-cat=\"gradient\"\u003E\u003Cspan t=\"gradient\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003Ca class=\"dropdown-item\" href=\"#\" data-cat=\"qualitative\"\u003E\u003Cspan t=\"qualitative\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003Ca class=\"dropdown-item\" href=\"#\" data-cat=\"diverging\"\u003E\u003Cspan t=\"diverging\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003Ca class=\"dropdown-item\" href=\"#\" data-cat=\"colorbrew\"\u003E\u003Cspan t=\"colorbrew\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-none d-md-block\" style=\"flex:5 0 1px\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-flex justify-content-end text-nowrap\" style=\"flex:1 0 auto;width:fit-content\"\u003E\u003Cdiv class=\"btn btn-primary\" data-panel=\"view\"\u003E\u003Cspan t=\"view\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-text\" data-panel=\"mypal\"\u003E\u003Cspan t=\"my pals\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-text\" data-panel=\"edit\"\u003E\u003Cspan t=\"edit\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"panels\"\u003E\u003Cdiv class=\"panel active clusterize-scroll\" data-panel=\"view\" style=\"max-height:600px\"\u003E\u003Cdiv class=\"inner clusterize-content\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"panel clusterize-scroll\" data-panel=\"mypal\" style=\"max-height:600px\"\u003E\u003Cdiv class=\"inner clusterize-content\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-primary btn-block ld-over-inverse btn-load\"\u003E\u003Cspan t=\"load more\"\u003E\u003C\u002Fspan\u003E\u003Cdiv class=\"ld ldld ldbtn sm\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"panel\" data-panel=\"edit\"\u003E";
pug_mixins["ldpe"]();
pug_html = pug_html + "\u003Cdiv class=\"foot\"\u003E\u003Chr class=\"mt-0 mb-3\"\u003E\u003Cdiv class=\"d-flex g-1 flex-wrap\"\u003E\u003Cdiv class=\"d-flex g-1 flex-grow-1\"\u003E\u003Cdiv class=\"btn btn-outline-secondary flex-grow-1\" data-action=\"undo\"\u003E\u003Cspan t=\"undo\"\u003E\u003C\u002Fspan\u003E \u003Ci class=\"i-undo\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-outline-secondary flex-grow-1\" data-action=\"paste\"\u003E\u003Cspan t=\"paste\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-none d-md-block\" style=\"flex:10 0 auto\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-flex g-1 flex-grow-1\"\u003E\u003Cdiv class=\"btn btn-primary flex-grow-1\" data-action=\"use\"\u003E\u003Cspan t=\"use this palette\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-outline-secondary ld-ext-right flex-grow-1\" data-action=\"save\"\u003E\u003Cspan t=\"save as asset\"\u003E\u003C\u002Fspan\u003E\u003Cdiv class=\"ld ldld ldbtn sm\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003Cdiv class=\"ldcv default-size\" id=\"palette-picker\"\u003E\u003Cdiv class=\"base\"\u003E\u003Cdiv class=\"inner ldpp\"\u003E";
pug_mixins["ldpp"]();
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"ldcv\" id=\"pattern-picker\"\u003E\u003Cdiv class=\"base\"\u003E\u003Cdiv class=\"inner\"\u003E\u003Cdiv class=\"p-4\"\u003E\u003Ch5 class=\"mb-1\"\u003EPattern Fill\u003C\u002Fh5\u003E\u003Cdiv class=\"small text-muted mb-3\"\u003Efill the text with an animated pattern. download as GIF to keep the animation.\u003C\u002Fdiv\u003E\u003Cdiv class=\"mt-pattern-grid\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mt-3 d-flex align-items-center\"\u003E\u003Clabel class=\"btn btn-sm btn-outline-dark mb-0\"\u003Eupload a GIF ...\u003Cinput class=\"d-none\" type=\"file\" accept=\"image\u002Fgif,image\u002Fpng,image\u002Fjpeg,image\u002Fwebp\"\u003E\u003C\u002Flabel\u003E\u003Cdiv style=\"flex:1 1 auto\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-sm btn-outline-secondary\" data-ldcv-set=\"\"\u003Eclose\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"ldcv\" id=\"share-panel\"\u003E\u003Cdiv class=\"base\"\u003E\u003Cdiv class=\"inner\"\u003E\u003Cdiv class=\"p-4\"\u003E\u003Ch5 class=\"mb-1\"\u003EShare\u003C\u002Fh5\u003E\u003Cdiv class=\"small text-muted mb-3\"\u003Ethis link opens the editor with the current effect, text and settings.\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-flex\"\u003E\u003Cinput" + (" class=\"form-control form-control-sm\""+pug_attr("readonly", true, true, true)) + "\u003E\u003Cdiv class=\"btn btn-sm btn-dark ml-2 mt-share-copy has-tips manual\"\u003ECopy\u003Cdiv class=\"hover-tip tip-sm tip-fit top\"\u003Ecopied!\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mt-3 d-flex align-items-center\"\u003E\u003Ca class=\"btn btn-sm btn-outline-dark mr-2 mt-share-x\" target=\"_blank\" rel=\"noopener\"\u003E";
pug_mixins["x-icon"]();
pug_html = pug_html + "\u003C\u002Fa\u003E\u003Ca class=\"btn btn-sm btn-outline-dark mt-share-fb\" target=\"_blank\" rel=\"noopener\"\u003E\u003Ci class=\"fa fa-facebook\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E\u003Cdiv style=\"flex:1 1 auto\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-sm btn-outline-secondary\" data-ldcv-set=\"\"\u003Eclose\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"modal\" id=\"download\"\u003E\u003Cdiv class=\"card\"\u003E\u003Cdiv class=\"card-body\"\u003E\u003Ch4\u003EGenerated Image\u003C\u002Fh4\u003E\u003Csmall class=\"gray\"\u003Eclick the download button to download\u003C\u002Fsmall\u003E\u003Cdiv class=\"result\"\u003E\u003Cimg\u003E\u003Cvideo" + (" class=\"d-none\""+pug_attr("autoplay", true, true, true)+pug_attr("loop", true, true, true)+pug_attr("muted", true, true, true)+pug_attr("playsinline", true, true, true)+pug_attr("controls", true, true, true)) + "\u003E\u003C\u002Fvideo\u003E\u003C\u002Fdiv\u003E\u003Chr\u003E\u003Ca class=\"btn btn-lg btn-outline-success mr-2\" href=\"#\" download=\"\"\u003EDownload\u003C\u002Fa\u003E\u003Cdiv class=\"btn btn-lg btn-outline-secondary\" onclick=\"$('#download').modal('hide')\"\u003EClose\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"editor-option-sample\" style=\"display:none\"\u003E\u003Cdiv class=\"col-sm col-4\" id=\"editor-option-sample-color\"\u003E\u003Clabel\u003EColor\u003C\u002Flabel\u003E";
pug_mixins["color-input"]('color');
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm col-4\" id=\"editor-option-sample-number\"\u003E\u003Clabel\u003ENumber\u003C\u002Flabel\u003E";
pug_mixins["slider"]();
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"editor\"\u003E\u003Cdiv class=\"config\"\u003E\u003Cdiv class=\"row\" style=\"max-width:1024px;margin:auto\"\u003E\u003Cdiv class=\"col-6 col-sm-3\"\u003E\u003Clabel\u003EText\u003C\u002Flabel\u003E\u003Cdiv class=\"mt-text-box\"\u003E\u003Ctextarea class=\"form-control form-control-sm\" id=\"text-input\" rows=\"1\" spellcheck=\"false\"\u003EHello World!\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-6 col-sm-3\"\u003E\u003Clabel\u003EFont\u003C\u002Flabel\u003E\u003Cdiv class=\"d-flex\"\u003E\u003Cdiv class=\"btn btn-sm btn-outline-dark text-truncate\" onclick=\"chooseFont()\" style=\"flex:1 1 auto;min-width:0\"\u003E\u003Cspan id=\"font-name\"\u003EChoose ...\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-sm btn-outline-dark ml-1 d-none\" id=\"font-reset\" onclick=\"resetFont()\" title=\"use each effect's own font\"\u003E&#x21ba;\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-4 col-sm-3\" id=\"font-size-slider\"\u003E\u003Clabel\u003EFont Size\u003C\u002Flabel\u003E";
pug_mixins["slider"]();
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-4 col-sm-3\"\u003E\u003Clabel\u003EBackground\u003C\u002Flabel\u003E";
pug_mixins["color-input"]('background');
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm-3 col-4 adv\" id=\"palette-btn\"\u003E\u003Clabel\u003EPalette\u003C\u002Flabel\u003E\u003Cdiv class=\"palette\" onclick=\"pickPalette()\"\u003E";
// iterate ['#f00','#0f0','#00f','#0ff']
;(function(){
  var $$obj = ['#f00','#0f0','#00f','#0ff'];
  if ('number' == typeof $$obj.length) {
      for (var pug_index6 = 0, $$l = $$obj.length; pug_index6 < $$l; pug_index6++) {
        var i = $$obj[pug_index6];
pug_html = pug_html + "\u003Cdiv" + (" class=\"color\""+pug_attr("style", pug_style("background:" + i), true, true)) + "\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index6 in $$obj) {
      $$l++;
      var i = $$obj[pug_index6];
pug_html = pug_html + "\u003Cdiv" + (" class=\"color\""+pug_attr("style", pug_style("background:" + i), true, true)) + "\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-12 col-sm-9 row adv\" id=\"editor-custom-options\" style=\"margin-left:0;padding:0\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cbr\u003E\u003Cdiv id=\"cooltext\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"footer text-center\"\u003E\u003Cdiv class=\"inline-block text-left mr-3 mt-export-opt\" id=\"export-padding-slider\"\u003E\u003Clabel\u003EPadding\u003C\u002Flabel\u003E";
pug_mixins["slider"]();
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"inline-block text-left mr-2 mt-export-opt\"\u003E\u003Clabel\u003EScale\u003C\u002Flabel\u003E\u003Cselect class=\"form-control\" id=\"export-scale\"\u003E\u003Coption value=\"1\"\u003E1x\u003C\u002Foption\u003E\u003Coption value=\"2\"\u003E2x\u003C\u002Foption\u003E\u003Coption value=\"3\"\u003E3x\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"inline-block text-left\"\u003E\u003Clabel\u003EDownload As ...\u003C\u002Flabel\u003E\u003Cdiv class=\"block mr-2\" style=\"display:inline-block;width:300px\"\u003E\u003C!-- NOTE: editor-download-btn will be queried with API users--\u003E\u003Cdiv class=\"btn-group dropup\" id=\"editor-download-btn\"\u003E\u003Cdiv class=\"btn btn-outline-dark\" data-type=\"svg\" onclick=\"convert.svg()\"\u003ESVG\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-outline-dark\" data-type=\"png\" onclick=\"convert.png()\"\u003EPNG\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-outline-dark dropdown-toggle dropdown-toggle-split\" data-toggle=\"dropdown\" style=\"flex-grow:0\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown-menu dropdown-menu-right\"\u003E";
// iterate ["png", "jpg", "webp", "gif"]
;(function(){
  var $$obj = ["png", "jpg", "webp", "gif"];
  if ('number' == typeof $$obj.length) {
      for (var pug_index7 = 0, $$l = $$obj.length; pug_index7 < $$l; pug_index7++) {
        var f = $$obj[pug_index7];
pug_html = pug_html + "\u003Ca" + (" class=\"dropdown-item\""+" href=\"#\""+pug_attr("data-type", f, true, true)+pug_attr("onclick", "convert.raster('" + f + "');return false", true, true)) + "\u003E" + (pug_escape(null == (pug_interp = f.toUpperCase()) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index7 in $$obj) {
      $$l++;
      var f = $$obj[pug_index7];
pug_html = pug_html + "\u003Ca" + (" class=\"dropdown-item\""+" href=\"#\""+pug_attr("data-type", f, true, true)+pug_attr("onclick", "convert.raster('" + f + "');return false", true, true)) + "\u003E" + (pug_escape(null == (pug_interp = f.toUpperCase()) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
    }
  }
}).call(this);

// iterate ["mp4", "webm"]
;(function(){
  var $$obj = ["mp4", "webm"];
  if ('number' == typeof $$obj.length) {
      for (var pug_index8 = 0, $$l = $$obj.length; pug_index8 < $$l; pug_index8++) {
        var f = $$obj[pug_index8];
pug_html = pug_html + "\u003Ca" + (" class=\"dropdown-item d-none\""+" href=\"#\""+pug_attr("data-type", f, true, true)+" data-anim=\"\""+pug_attr("onclick", "convert.video('" + f + "');return false", true, true)) + "\u003E" + (pug_escape(null == (pug_interp = f.toUpperCase()) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index8 in $$obj) {
      $$l++;
      var f = $$obj[pug_index8];
pug_html = pug_html + "\u003Ca" + (" class=\"dropdown-item d-none\""+" href=\"#\""+pug_attr("data-type", f, true, true)+" data-anim=\"\""+pug_attr("onclick", "convert.video('" + f + "');return false", true, true)) + "\u003E" + (pug_escape(null == (pug_interp = f.toUpperCase()) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"inline-block\"\u003E\u003Clabel\u003E&nbsp;\u003C\u002Flabel\u003E\u003Cbr\u003E\u003Cdiv class=\"btn btn-outline-dark mr-2 d-none\" id=\"editor-reset-offset\" onclick=\"mtFrame.reset()\" title=\"reset text position\"\u003E&#x21ba; Position\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-outline-dark mr-2\" onclick=\"editor.toggle(false)\"\u003E\u003Cbig style=\"line-height:1em\"\u003E&times;\u003C\u002Fbig\u003E Close\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-outline-dark mr-2\" onclick=\"mtShare.open()\"\u003E\u003Ci class=\"fa fa-share-alt\"\u003E\u003C\u002Fi\u003E Share\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mt-drag-hint\"\u003Edrag the text to adjust its position\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
if (!isApi) {
pug_html = pug_html + "\u003Ctemplate id=\"mt-core-scripts\"\u003E";
pug_mixins["script"]([
    {name: "i18next", path: "dist/umd/i18next.min.js"},
    {name: "i18next-browser-languagedetector", path: "/dist/umd/i18nextBrowserLanguageDetector.min.js"},
    {name: "zmgr"},
    {name: "@plotdb/httputil"},
    {name: "@plotdb/semver"},
    {name: "@plotdb/rescope"},
    {name: "@plotdb/csscope"},
    {name: "@plotdb/block"},
    {name: "ldform"},
    {name: "curegex", path: "curegex.min.js"},
    {name: "lderror"},
    {name: "ldnotify"},
    {name: "ldcvmgr"},
    {name: "@loadingio/ldc"},
    {name: "@servebase/auth"},
    {name: "@servebase/consent"},
    {name: "@servebase/captcha"},
    {name: "@servebase/erratum"},
    {name: "@servebase/core"},
    "/js/site.min.js"
  ], {pack: true});
pug_html = pug_html + "\u003C\u002Ftemplate\u003E";
}
pug_html = pug_html + "\u003Csvg style=\"height:0;display:inline;display:none\"\u003E\u003Cdefs\u003E\u003Cfilter id=\"cool\" x=\"-100%\" y=\"-100%\" width=\"300%\" height=\"300%\"\u003E\u003CfeGaussianBlur in=\"SourceGraphic\" stdDeviation=\"6\"\u003E\u003C\u002FfeGaussianBlur\u003E\u003CfeComponentTransfer\u003E\u003CfeFuncA type=\"linear\" slope=\"30\" intercept=\"-2\"\u003E\u003C\u002FfeFuncA\u003E\u003C\u002FfeComponentTransfer\u003E\u003CfeComposite operator=\"out\" in2=\"SourceAlpha\"\u003E\u003C\u002FfeComposite\u003E\u003C\u002Ffilter\u003E\u003Cfilter id=\"landing-h1\" x=\"-100%\" y=\"-100%\" width=\"300%\" height=\"300%\"\u003E\u003CfeMorphology operator=\"dilate\" radius=\"1\" result=\"dilate\"\u003E\u003C\u002FfeMorphology\u003E\u003CfeComposite operator=\"out\" in=\"dilate\" in2=\"SourceAlpha\" result=\"border\"\u003E\u003C\u002FfeComposite\u003E\u003CfeOffset dx=\"-3\" dy=\"-2\" result=\"offset\"\u003E\u003C\u002FfeOffset\u003E\u003CfeMerge\u003E\u003CfeMergeNode in=\"SourceGraphic\"\u003E\u003C\u002FfeMergeNode\u003E\u003CfeMergeNode in=\"offset\"\u003E\u003C\u002FfeMergeNode\u003E\u003C\u002FfeMerge\u003E\u003C\u002Ffilter\u003E\u003C\u002Fdefs\u003E\u003C\u002Fsvg\u003E";
if (effect) {
pug_html = pug_html + "\u003Cdiv class=\"text-center mt-effect-hero\" id=\"landing\"\u003E\u003Cdiv class=\"cbad\"\u003E\u003Cscript" + (" id=\"_carbonads_js\""+pug_attr("async", true, true, true)+" type=\"text\u002Fjavascript\" src=\"\u002F\u002Fcdn.carbonads.com\u002Fcarbon.js?serve=CK7I453J&amp;placement=maketextio\"") + "\u003E\u003C\u002Fscript\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"inner\"\u003E\u003Cdiv class=\"subtitle\"\u003Etext effect #" + (pug_escape(null == (pug_interp = effect.no) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Ch1\u003E" + (pug_escape(null == (pug_interp = effect.label) ? "" : pug_interp)) + "\u003C\u002Fh1\u003E";
if (effect.desc) {
pug_html = pug_html + "\u003Cdiv class=\"mt-effect-desc\"\u003E" + (pug_escape(null == (pug_interp = effect.desc) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003Cdiv class=\"mt-effect-thumb\"\u003E\u003Cimg" + (pug_attr("src", "/assets/thumb/" + effect.key + ".webp", true, true)+pug_attr("alt", effect.label + " text effect", true, true)) + "\u003E\u003Ca" + (" class=\"mt-star\""+" href=\"#\""+pug_attr("data-star", effect.key, true, true)+" title=\"star this effect\"") + "\u003E&#9733;\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"widget\"\u003E\u003Cdiv class=\"input-group\"\u003E\u003Cinput class=\"form-control input-lg\" type=\"text\" placeholder=\"type your text here\"\u003E\u003Cdiv class=\"input-group-append\"\u003E\u003Cdiv" + (" class=\"btn btn-action btn-block\""+pug_attr("onclick", "openEffect(" + JSON.stringify(effect.key) + ")", true, true)) + "\u003ECustomize\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cbr\u003E\u003Ca href=\"\u002F\"\u003Eor, browse all cool text effects\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
else {
pug_html = pug_html + "\u003Cdiv class=\"text-center\" id=\"landing\"\u003E";
if (!isApi) {
pug_html = pug_html + "\u003Cdiv class=\"cbad\"\u003E\u003Cscript" + (" id=\"_carbonads_js\""+pug_attr("async", true, true, true)+" type=\"text\u002Fjavascript\" src=\"\u002F\u002Fcdn.carbonads.com\u002Fcarbon.js?serve=CK7I453J&amp;placement=maketextio\"") + "\u003E\u003C\u002Fscript\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003Cdiv class=\"share\"\u003E\u003Cspan class=\"mr-2\"\u003Eshare with\u003C\u002Fspan\u003E\u003Ca class=\"mr-2\" href=\"https:\u002F\u002Fwww.facebook.com\u002Fsharer\u002Fsharer.php?u=https:\u002F\u002Fmaketext.io\" style=\"font-size:0.9em;margin-top:-3px\" target=\"_blank\"\u003Efacebook\u003C\u002Fa\u003E\u003Cspan class=\"mr-2\"\u003E\u002F\u003C\u002Fspan\u003E\u003Ca href=\"https:\u002F\u002Fx.com\u002Fintent\u002Fpost?url=https:\u002F\u002Fmaketext.io&amp;text=super-fast%20cool%20text%20generator%20for%20modern%20age\" target=\"_blank\"\u003Ex\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"inner\"\u003E\u003Cdiv class=\"subtitle\"\u003ELet's make text cool again\u003C\u002Fdiv\u003E\u003Ch1\u003E\u003Cspan\u003ECool Text\u003C\u002Fspan\u003E \u003Cspan\u003EGenerator\u003C\u002Fspan\u003E\u003Cimg src=\"\u002Fassets\u002Fimg\u002Flanding\u002Fcool.png\"\u003E\u003C\u002Fh1\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003Cdiv class=\"widget\"\u003E\u003Cbig\u003EFirst, type some texts to start with:\u003C\u002Fbig\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E\u003Cinput class=\"form-control input-lg\" type=\"text\" placeholder=\"for example, 'Cool Text!'\"\u003E\u003Cdiv class=\"input-group-append\"\u003E\u003Cdiv class=\"btn btn-action btn-block\" onclick=\"scrollto('#top')\"\u003EMake Text \u003Cspan class=\"cool\"\u003ECooler\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cbr\u003E\u003Ca href=\"\u002Ffancy\u002F\"\u003Eor, show me more copyable 𝕗𝕒𝕟𝕔𝕪 𝕥𝕖𝕩𝕥!!\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003Cdiv id=\"top\" style=\"transform:translate(0,-80px)\"\u003E\u003C\u002Fdiv\u003E\u003Cbr\u003E\u003Cdiv class=\"text-center\"\u003E\u003Cdiv class=\"big\"\u003EThen, pick an effect you'd like to use\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
if (!isApi) {
pug_html = pug_html + "\u003Cdiv class=\"text-center mt-star-filter d-none\"\u003E\u003Ca class=\"active\" href=\"#\" data-star-filter=\"all\"\u003Eall effects\u003C\u002Fa\u003E\u003Cspan class=\"mx-2\"\u003E\u002F\u003C\u002Fspan\u003E\u003Ca href=\"#\" data-star-filter=\"starred\"\u003E&#9733; starred\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
}
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003Cdiv class=\"gallery\" id=\"gallery\"\u003E\u003C\u002Fdiv\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E\u003Cbig\u003E\u003Ca href=\"\u002Ffancy\u002F\"\u003E\u003Cdiv\u003Eneed 𝔉𝔞𝔫𝔠𝔶 𝔗𝔢𝔵𝔱 in plain text?\u003C\u002Fdiv\u003E\u003Cdiv\u003Echeck out the fancy text generator!\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\u003C\u002Fbig\u003E\u003C\u002Fdiv\u003E\u003Cbr\u003E\u003Cdiv id=\"info\"\u003E\u003Cdiv class=\"inner\"\u003E\u003Cdiv class=\"text-center\"\u003E\u003Cspan class=\"green\"\u003Eabout this tool\u003C\u002Fspan\u003E\u003Ch1\u003ECool Text Generator for Modern Age\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sep huge-gap\"\u003E\u003C\u002Fdiv\u003E";
if (isApi) {
pug_html = pug_html + "\u003Cp\u003ESometimes we just need a decent stylish text in 10 minutes. We don't have Photoshop, we don't have good design in mind. What if there is a web service for us to browse-and-pick a nice effect, then we just customize → download → use it? And yes, maketext.io is born for this purpose.\u003C\u002Fp\u003E";
}
else {
pug_html = pug_html + "\u003Cp\u003ESometimes we just need a decent stylish text in 10 minutes, Maybe a the next project's logo. We don't have Photoshop, we don't have good design in mind. What if there is a web service for us to browse-and-pick a nice effect, then we just customize → download → use it? And yes, maketext.io is born for this purpose.\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\u003Cp\u003E\u003Cspan class=\"green\"\u003EMaketext.io\u003C\u002Fspan\u003E is the modern cool text generator that empowers SVG filters and 800+ open-font-licensed web fonts. While there are already numerous similar websites around, we handcrafted maketext.io with following guideline in mind:\u003C\u002Fp\u003E\u003Cul\u003E\u003Cli\u003EMake It Quick, Make It Simple\u003C\u002Fli\u003E\u003Cli\u003EOn the Web, on the Fly\u003C\u002Fli\u003E\u003Cli\u003EEasily Customizable\u003C\u002Fli\u003E\u003Cli\u003EVector Based with Raster Support\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003Ch2\u003ETechnical Consideration\u003C\u002Fh2\u003E\u003Cdiv class=\"sep\"\u003E\u003C\u002Fdiv\u003E\u003Cp\u003EFor every fancy text effect, we provide both SVG and PNG format for you to download. Since SVG is well-prepared for everyone to use in HTML5 era, you will still want to know about its limitation so you can choose which one to use between SVG and PNG more wisely.\u003C\u002Fp\u003E\u003Cbr\u003E\u003Ch3\u003EBrowser Compatibility\u003C\u002Fh3\u003E\u003Cp\u003EJust like there are some CSS attributes that are not well-supported by all modern browsers, there might be difference between implementations of browsers to the SVG filter we use, specially of the old browsers like Internet Explorer.\u003C\u002Fp\u003E\u003Cp\u003EGenerally speaking modern browsers like latest versions Chrome, Firefox and Safari should be able to render them correctly, but you should check if you need to support browsers like IE9. For a detail list of browser support for SVG filter, check \u003Ca href=\"https:\u002F\u002Fcaniuse.com\u002F#feat=svg-filters\" target=\"_blank\"\u003ECan I Use \"SVG filter\"\u003C\u002Fa\u003E for more information.\u003C\u002Fp\u003E\u003Cbr\u003E\u003Ch3\u003ERendering Performance\u003C\u002Fh3\u003E\u003Cp\u003ERendering SVG can be more CPU-intensive than rendering raster images like PNG or JPG. This is especially true when using complicated SVG filters, and almost all filters here are complicated. Consider using CSS property \"\u003Ca href=\"https:\u002F\u002Fcaniuse.com\u002F#feat=will-change\" target=\"_blank\"\u003Ewill-change\u003C\u002Fa\u003E\" to prevent redundant re-rendering when you use those downloaded SVG files, just like we've done in our stylish text gallery.\u003C\u002Fp\u003E\u003Cbr\u003E\u003Ch3\u003EImage Quality\u003C\u002Fh3\u003E\u003Cp\u003EWhile SVG is scalable-vector-based and should be responsive-ready, sometimes there are still unwanted aliasing\u002Fjagged edges or not-aligned shapes, due to number rounding \u002F precision issues when rendering. If you use those SVG files with dynamic sizing, remember to check it's visual appearence in different resolution before shipping your works.\u003C\u002Fp\u003E\u003Cbr\u003E\u003Ch3\u003EEmbedded Font\u003C\u002Fh3\u003E\u003Cp\u003ETo make custom web font works in SVG files, we actually convert every letter from text into SVG path instead of embedding the whole font file inside it. This can make the file smaller ( if the text is short ), but then it won't be able to change the text after generation of the SVG file, and the SVG file can't be indexed by search engine through its content. You can still use the \u003Ccode\u003Ealt\u003C\u002Fcode\u003E attribute in \u003Ccode\u003Eimg\u003C\u002Fcode\u003E tag for SEO though.\u003C\u002Fp\u003E\u003Cbr\u003E\u003Ch3\u003ECopyable Cool Text\u003C\u002Fh3\u003E\u003Cp\u003EWhile cool text in images are great, sometimes we need to use them in text posts or even messengers. Check out our \u003Ca href=\"\u002Ffancy\u002F\"\u003EFancy Text Generator\u003C\u002Fa\u003E, which is dedicated for this purpose: generate stylish text that are copyable!\u003C\u002Fp\u003E";
pug_mixins["nbr"].call({
block: function(){
pug_html = pug_html + " ";
}
}, 2);
pug_html = pug_html + "\u003Ch2\u003EResources\u003C\u002Fh2\u003E\u003Cdiv class=\"sep\"\u003E\u003C\u002Fdiv\u003E\u003Cp\u003EWhile making stylish text with maketext.io, you may also want to build your own cool text filter. This article \"\u003Ca href=\"https:\u002F\u002Fwww.smashingmagazine.com\u002F2015\u002F05\u002Fwhy-the-svg-filter-is-awesome\u002F\"\u003EThe Art Of SVG Filters And Why It Is Awesome\u003C\u002Fa\u003E\" provides a comprehensive guide with a lot of example for anyone who want to build a cool text SVG filter from scratch, a definitely must-read. \u003C\u002Fp\u003E\u003Cp\u003EAdditionally, these filters can actually be used in any shapes, not only for text. For an inspiring example of SVG beyong merely shapes, this talk and slide about \"\u003Ca href=\"https:\u002F\u002Fwww.visualcinnamon.com\u002F2016\u002F05\u002Fslides-openvis\"\u003ESVGs beyond mere shapes\u003C\u002Fa\u003E\" is the thing you will never want to miss.\u003C\u002Fp\u003E\u003Cp\u003EThe fact that these cool text effects are built with SVG filters makes it possible to couple with other css or javascript libraries. For example, you can use \u003Ca href=\"https:\u002F\u002Floading.io\u002Fanimation\u002F\" target=\"_blank\"\u003Eloading.css\u003C\u002Fa\u003E or \u003Ca href=\"https:\u002F\u002Floading.io\u002Ftransition\u002F\" target=\"_blank\"\u003Etransition.css\u003C\u002Fa\u003E to animate your stylish text. Check \u003Ca href=\"https:\u002F\u002Floading.io\u002Fanimation\u002Ftext\" target=\"_blank\"\u003Eloading.io animated text generator\u003C\u002Fa\u003E for inspiration of how loading.css can be used in text animation.\u003C\u002Fp\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003Ch2\u003EContact\u003C\u002Fh2\u003E\u003Cdiv class=\"sep\"\u003E\u003C\u002Fdiv\u003E\u003Cp\u003EWe want to build this service to its best, but there are always bugs or glitches. Feel free to contact us via \u003Cb\u003Econtact@maketext.io\u003C\u002Fb\u003E by mail. We always appreciate your feedback and support, by which we could make this service better together.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["nbr"](5);
pug_html = pug_html + "\u003Cdiv id=\"footer\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-sm mb-4\"\u003E\u003Ch1\u003EMaketext.io\u003Cspan style=\"vertical-align:top;font-size:14px\"\u003E&copy; 2018 ~ \u003Cspan class=\"mt-year\"\u003E2026\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Fh1\u003E\u003Cdiv class=\"sep\"\u003E\u003C\u002Fdiv\u003E\u003Cp\u003ESuper fast, vector-based cool text generator powered by modern web technologies.\u003C\u002Fp\u003E\u003Cp class=\"small\"\u003E\u003Ca class=\"mt-footer-link\" href=\"\u002Ftos\"\u003ETerm of Use\u003C\u002Fa\u003E \u003Cspan class=\"mx-1\"\u003E\u002F\u003C\u002Fspan\u003E \u003Ca class=\"mt-footer-link\" href=\"\u002Fprivacy\"\u003EPrivacy Policy\u003C\u002Fa\u003E \u003Cspan class=\"mx-1\"\u003E\u002F\u003C\u002Fspan\u003E \u003Ca class=\"mt-footer-link\" href=\"mailto:contact@maketext.io\"\u003EContact\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-sm\"\u003E\u003Ca class=\"btn btn-block btn-outline-light mr-2 mb-2\" href=\"https:\u002F\u002Fwww.facebook.com\u002Fsharer\u002Fsharer.php?u=https:\u002F\u002Fmaketext.io\" target=\"_blank\"\u003Eshare with facebook \u003Ci class=\"fa fa-facebook\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm\"\u003E\u003Ca class=\"btn btn-block btn-outline-light text-nowrap\" href=\"https:\u002F\u002Fx.com\u002Fintent\u002Fpost?url=https:\u002F\u002Fmaketext.io&amp;text=super-fast%20cool%20text%20generator%20for%20modern%20age\" target=\"_blank\"\u003Eshare with ";
pug_mixins["x-icon"]();
pug_html = pug_html + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm\"\u003E\u003Ch1\u003E\u003Csmall\u003EPartner Sites\u003C\u002Fsmall\u003E\u003C\u002Fh1\u003E\u003Cdiv class=\"sep\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mb-2\"\u003E\u003Ca href=\"https:\u002F\u002Floading.io\"\u003E\u003Ci class=\"fa fa-external-link\"\u003E\u003C\u002Fi\u003E loading.io \u003Cimg src=\"\u002Fassets\u002Fimg\u002Floader\u002Fcloudy.gif\"\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"ml-3\"\u003Eanimated icons and spinner service\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mb-2 d-none\"\u003E\u003Ca href=\"https:\u002F\u002Fmakeweb.io\"\u003E\u003Ci class=\"fa fa-external-link\"\u003E\u003C\u002Fi\u003E makeweb.io \u003Cimg src=\"\u002Fassets\u002Fimg\u002Flanding\u002Fmakeweb.png\"\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"ml-3\"\u003Ereal-time collaborative web design service\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mb-2\"\u003E\u003Ca href=\"https:\u002F\u002Fmakechart.io\"\u003E\u003Ci class=\"fa fa-external-link\"\u003E\u003C\u002Fi\u003E makechart.io \u003Cimg src=\"\u002Fassets\u002Fimg\u002Flanding\u002Frose.png\"\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"ml-3\"\u003Emake chart online for free\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cscript\u003EArray.from(document.querySelectorAll('.mt-year')).map(function(n) { n.textContent = new Date().getFullYear(); });\u003C\u002Fscript\u003E";
pug_mixins["script"]([
    "/js/editor/util.js",
    "/js/editor/index.js",
    "/js/editor/palette.js",
    "/js/editor/font.js",
    "/js/editor/layout.js",
    "/js/editor/pattern.js",
    "/js/editor/share.js",
    "/js/editor/download.js",
    "/js/editor/star.js"
  ], {pack: true});
pug_html = pug_html + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "Array" in locals_for_with ?
        locals_for_with.Array :
        typeof Array !== 'undefined' ? Array : undefined, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "asseturl" in locals_for_with ?
        locals_for_with.asseturl :
        typeof asseturl !== 'undefined' ? asseturl : undefined, "b64img" in locals_for_with ?
        locals_for_with.b64img :
        typeof b64img !== 'undefined' ? b64img : undefined, "blockLoader" in locals_for_with ?
        locals_for_with.blockLoader :
        typeof blockLoader !== 'undefined' ? blockLoader : undefined, "bundleurl" in locals_for_with ?
        locals_for_with.bundleurl :
        typeof bundleurl !== 'undefined' ? bundleurl : undefined, "c" in locals_for_with ?
        locals_for_with.c :
        typeof c !== 'undefined' ? c : undefined, "cssLoader" in locals_for_with ?
        locals_for_with.cssLoader :
        typeof cssLoader !== 'undefined' ? cssLoader : undefined, "debug" in locals_for_with ?
        locals_for_with.debug :
        typeof debug !== 'undefined' ? debug : undefined, "decache" in locals_for_with ?
        locals_for_with.decache :
        typeof decache !== 'undefined' ? decache : undefined, "defer" in locals_for_with ?
        locals_for_with.defer :
        typeof defer !== 'undefined' ? defer : undefined, "description" in locals_for_with ?
        locals_for_with.description :
        typeof description !== 'undefined' ? description : undefined, "effect" in locals_for_with ?
        locals_for_with.effect :
        typeof effect !== 'undefined' ? effect : undefined, "escape" in locals_for_with ?
        locals_for_with.escape :
        typeof escape !== 'undefined' ? escape : undefined, "favicon" in locals_for_with ?
        locals_for_with.favicon :
        typeof favicon !== 'undefined' ? favicon : undefined, "gaIds" in locals_for_with ?
        locals_for_with.gaIds :
        typeof gaIds !== 'undefined' ? gaIds : undefined, "hashfile" in locals_for_with ?
        locals_for_with.hashfile :
        typeof hashfile !== 'undefined' ? hashfile : undefined, "isApi" in locals_for_with ?
        locals_for_with.isApi :
        typeof isApi !== 'undefined' ? isApi : undefined, "libLoader" in locals_for_with ?
        locals_for_with.libLoader :
        typeof libLoader !== 'undefined' ? libLoader : undefined, "md5" in locals_for_with ?
        locals_for_with.md5 :
        typeof md5 !== 'undefined' ? md5 : undefined, "scriptLoader" in locals_for_with ?
        locals_for_with.scriptLoader :
        typeof scriptLoader !== 'undefined' ? scriptLoader : undefined, "thumb" in locals_for_with ?
        locals_for_with.thumb :
        typeof thumb !== 'undefined' ? thumb : undefined, "thumbnail" in locals_for_with ?
        locals_for_with.thumbnail :
        typeof thumbnail !== 'undefined' ? thumbnail : undefined, "title" in locals_for_with ?
        locals_for_with.title :
        typeof title !== 'undefined' ? title : undefined, "url" in locals_for_with ?
        locals_for_with.url :
        typeof url !== 'undefined' ? url : undefined, "version" in locals_for_with ?
        locals_for_with.version :
        typeof version !== 'undefined' ? version : undefined));
    ;;return pug_html;}; module.exports = template; })() 