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
    
    (function (Array, JSON, asseturl, b64img, blockLoader, bundleurl, c, cssLoader, debug, decache, defer, description, escape, favicon, gaIds, hashfile, libLoader, md5, scriptLoader, thumb, thumbnail, title, url, version) {
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























pug_mixins["x-icon"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Csvg class=\"mt-x-icon\" viewBox=\"0 0 24 24\" width=\"0.9em\" height=\"0.9em\"\u003E\u003Cpath fill=\"currentColor\" d=\"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z\"\u003E\u003C\u002Fpath\u003E\u003C\u002Fsvg\u003E";
};
title = "Privacy Policy · maketext.io"
url = "https://maketext.io/privacy"
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
pug_html = pug_html + "\u003Cdiv class=\"w-1024 rwd mx-auto my-4 typeset\"\u003E\u003Cdiv class=\"text-center my-5\"\u003E\u003Ch5 class=\"font-weight-bold mb-0\"\u003E隱私權政策\u003C\u002Fh5\u003E\u003Ch1\u003EPrivacy Policy\u003C\u002Fh1\u003E\u003Cdiv class=\"small text-muted\"\u003Elast update: 2026\u002F11\u002F12\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"my-5\"\u003E\u003Chr\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-md\"\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch2 id=\"pp-collect\"\u003EData Collection\u003C\u002Fh2\u003E\u003Cp\u003Ewhen you use this service, this service will automatically collect and store the data generated from your interaction with this service, including the term you search, your browse history in this site, the link you click, the device you use and your location information, etc.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch3\u003EPersonal Information\u003C\u002Fh3\u003E\u003Cp\u003EWe also keep information you provided when you register in this service, including your email address as your account, your preferred display name, and store them in your personal account.\u003C\u002Fp\u003E\u003Cp\u003EIf you sign in with 3rd party services like Facebook or Google, we'll also retrieve basic informations provided by these service, including your preferred avatar, which could also be collected when you manually upload it in the settings page.\u003C\u002Fp\u003E\u003Cp\u003EWhen you contact us, we will keep your call record and email contact to help you resolve any issues you encountered.\u003C\u002Fp\u003E\u003Cp\u003EAdditionally, your password will be encrypted with enough strength automatically by this service before we store it in the database. Thus, we will never know your password.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch3\u003ECookies\u003C\u002Fh3\u003E\u003Cp\u003EWe and our partners ( including Google, Facebook and any other 3rd service we use ) uses cookies to identify your browser and device.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch3\u003EOther Data\u003C\u002Fh3\u003E\u003Cp\u003EBased on the features of this service, we collect and store data provided directly by you, including texts and files such as images, documents, audio or videos. These data are usually uploaded to an organization with organizers and viewers, and are expected to be accessible by those people, and only by those people.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch2 id=\"pp-usage\"\u003EData Usage\u003C\u002Fh2\u003E\u003Cp\u003EData collected will be used to provide, maintain and improve this service, and to develop new services or protect this service and its users. We will also use these data to provide you personalized content.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch3\u003EPersonal Information\u003C\u002Fh3\u003E\u003Cp\u003EWe will use you email to send notifications to you about the change or update of this service. Your email will also be used to identify your account, and help you to reset password when you lost it. We also use your email to send marketing and product promotion information, but only when you subscribe our newsletter when signing up or in the settings.\u003C\u002Fp\u003E\u003Cp\u003EYour display name will be visible to others along with your public assets.\u003C\u002Fp\u003E\u003Cp\u003EAdditionally, some technical information such as device modal, system version, ip address will be sent to 3rd party issue tracking service, which helps us to track and resolve issues and bugs you encountered when using our service.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch3\u003ECookies\u003C\u002Fh3\u003E\u003Cp\u003ECookie will be used to identify your account and improve the quality of this service, such as, remember who you are and your settings as a default when you visit this service next time.\u003C\u002Fp\u003E\u003Cp\u003EWe use Google analytics, which uses cookies to track traffic from you to help us get feedback from behavior of our users. Additionally, your IP address will be anonymized before tracking.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch3\u003EOther Data\u003C\u002Fh3\u003E\u003Cp\u003EThe data provided directly by you to the organization who accept these data submission will be provided to the organizor and viewer that authorized by this organization for reviewing purpose.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch2 id=\"pp-delete\"\u003EData Deletion\u003C\u002Fh2\u003E\u003Cp\u003EYou can contact us directly to request data deletion. The data that will be deleted include your account, all your personal information and data from social website such as Facebook if you use social login.\u003C\u002Fp\u003E\u003Cp\u003ETo delete your data, please follow below steps:\u003C\u002Fp\u003E\u003Col\u003E\u003Cli\u003E\u003Ca href=\"mailto:contact@maketext.io\"\u003Econtact us by email\u003C\u002Fa\u003E, with your sign-up email as the sender.\u003C\u002Fli\u003E\u003Cli\u003Estate that you want your data deleted in the mail, providing your email, user id or anything that can help to identify you as the user.\u003C\u002Fli\u003E\u003Cli\u003EOnce we receive your mail, we will respond within 3 days, and delete all your data.\u003C\u002Fli\u003E\u003C\u002Fol\u003E\u003Cp\u003EPlease note that once you provide your data to specific organization, it's beyond our reach since they can download and keep all your data elsewhere. In this case, please contact the corresponding organization for data deletion instead.\u003C\u002Fp\u003E\u003Cp\u003EAdditionally, we do backup our service in a daily basis and all backups will be kept for 180 days, so after we remove all your data from our online service, your data stored in backup will be also removed after 180 days automatically.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch2 id=\"pp-modification\"\u003EModification\u003C\u002Fh2\u003E\u003Cp\u003EThis privacy policy is probably going to br updated frequently in the future. If a update of this privacy policy is made, there will be a notification for you when you access this service, and the update will also be published here in this page.\u003C\u002Fp\u003E\u003Cp\u003EModification history will also be available as a link in this page. You can check each revision of our privacy policy at any time.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-md\"\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch2\u003E資料收集\u003C\u002Fh2\u003E\u003Cp\u003E當您使用此服務時，此服務將會自動收集網站與您互動過程的各種資料。\u003C\u002Fp\u003E\u003Cp\u003E這包含在此服務中的搜尋、瀏覽以及連結點擊紀錄，亦包括您使用裝置的基本資訊、IP 位址、約略的地理資訊等等。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch3\u003E個人資料\u003C\u002Fh3\u003E\u003Cp\u003E此服務透過您的註冊收集了您主動提供的各類個人資訊，包含電子郵件地址、顯示名稱等等，並儲存在您的個人帳戶之中。\u003C\u002Fp\u003E\u003Cp\u003E若您透過第三方網站登入此服務 ( 如 Facebook 或 Google )，我們將取得並儲存這些第三方網站所提供的您的資訊，例如您的帳號縮圖，其亦可透過您的主動上傳來傳送給我們。\u003C\u002Fp\u003E\u003Cp\u003E當您聯繫我們之時，我們會保留您的聯絡紀錄、內容以協助您排除問題、並做為未來與您互動的基礎。\u003C\u002Fp\u003E\u003Cp\u003E此外，您的密碼在儲存前，均透過充足強度的加密與雜湊過程處理，因此我們無從得知您的密碼，亦不需擔心密碼失竊。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch3\u003ECookies\u003C\u002Fh3\u003E\u003Cp\u003E我們與我們的第三方夥伴均使用 Cookie 技術識別您的瀏覽器與裝置。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch3\u003E其它資料\u003C\u002Fh3\u003E\u003Cp\u003E基於此服務的功能，我們會收集並儲存您直接上傳的資料，包含文字、檔案如影像、文件、聲音或影片等。\u003C\u002Fp\u003E\u003Cp\u003E這些資料通常會被上傳至特定的組織實體之下，並且將能被該組織指定的、具權限的管理員與閱覽者存取。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch2\u003E資料使用\u003C\u002Fh2\u003E\u003Cp\u003E我們收集到的資料將會被用於提供、維護或改進此服務，亦或者保護此服務與其用戶。我們亦使用這些資料來提供您個人化的內容與瀏覽體驗。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch3\u003E個人資料\u003C\u002Fh3\u003E\u003Cp\u003E您的 email 將被用來傳送網站通知，主要是關於網站的更新、調整等等，並用以識別您的身份。\u003C\u002Fp\u003E\u003Cp\u003E在您需要重新取得密碼時，我們亦會使用您的 email 來處理。\u003C\u002Fp\u003E\u003Cp\u003E我們亦會發送行銷用途的信件給您，但僅限於您同意收到相關類型的信件之時。\u003C\u002Fp\u003E\u003Cp\u003E除了 email ，您的個人資訊將會用來展示、以供其它用戶對您建立基本的瞭解，包含您的自我簡介、職業、標籤、帳戶縮圖等等項目。\u003C\u002Fp\u003E\u003Cp\u003E此外，一些基本的技術資訊如裝置型號、系統版本、IP 地址等，將被傳送至如 Sentry 等的第三方網站問題追蹤服務，以供此服務在您碰到技術問題時做為問題排查的線索。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch3\u003ECookies\u003C\u002Fh3\u003E\u003Cp\u003ECookie 將被用於識別您的身份與一些基本的活動，以減少不必要的提醒、問題，以改善服務的使用體驗。\u003C\u002Fp\u003E\u003Cp\u003E我們使用 Google Analytics ，其使用 Cookie 來追蹤來自您的網站流量，以協助我們取得來自用戶行為的回饋。\u003C\u002Fp\u003E\u003Cp\u003E不過，您的 IP 地址在追蹤前即已去除。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch3\u003E其它資料\u003C\u002Fh3\u003E\u003Cp\u003E您所直接上傳至系統給特定組織的資料，將會傳送給該組織認可的管理者或閱覽者做審查。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch2\u003E資料刪除\u003C\u002Fh2\u003E\u003Cp\u003E您可以直接與我們聯繫來請求資料刪除。\u003C\u002Fp\u003E\u003Cp\u003E會被刪除的資料主要包括您的帳號、個人資料，以及如果您使用第三方網站登入時，其它網站傳送給我們的資料。\u003C\u002Fp\u003E\u003Cp\u003E若要刪除資料，請依照下列步驟：\u003C\u002Fp\u003E\u003Col\u003E\u003Cli\u003E\u003Ca href=\"mailto:contact@maketext.io\"\u003E透過 email 聯絡我們\u003C\u002Fa\u003E。請使用您的註冊 email 寄送郵件，我們將透過回信確認您的身份。\u003C\u002Fli\u003E\u003Cli\u003E在信中說明您想要刪除資料，並提供您的 email 、用戶代碼等各種可協助我們確認您身份的資訊。\u003C\u002Fli\u003E\u003Cli\u003E收到您的信件後，我們將在三天內回覆您，並刪除您的資料。\u003C\u002Fli\u003E\u003C\u002Fol\u003E\u003Cp\u003E請注意，若您主動傳送資料給網站上的組織單位，這些組織能下載並另外保存您的資料在別處，因此這在我們能力所及的範圍之外。\u003C\u002Fp\u003E\u003Cp\u003E因此，若您需要連同這些資料都一併刪除，還請您主動聯繫組織的管理員或業務承辦人。\u003C\u002Fp\u003E\u003Cp\u003E此外，我們每天都會備份服務資料，所有的資料都會保存至少 180 天。在 180 天後，過期的資料即會被刪除，所以若您有資料儲存在備份系統中，在 180 天之後亦會主動被汰除。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sect\"\u003E\u003Ch2\u003E政策修改\u003C\u002Fh2\u003E\u003Cp\u003E此份隱私權政策有可能在未來依需求而調整。\u003C\u002Fp\u003E\u003Cp\u003E任何的調整都會更新在此頁面，並保留舊版本供您做前後對照。隱私權政策的更新將會在您使用此服務時以適當的方式通知您。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"my-5\"\u003E\u003Chr\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"text-center text-muted\"\u003EEnd of Privacy Policy \u002F 隱私權政策結束\u003C\u002Fdiv\u003E";
pug_mixins["nbr"](3);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv id=\"footer\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-sm mb-4\"\u003E\u003Ch1\u003EMaketext.io\u003Cspan style=\"vertical-align:top;font-size:14px\"\u003E&copy; 2018 ~ \u003Cspan class=\"mt-year\"\u003E2026\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Fh1\u003E\u003Cdiv class=\"sep\"\u003E\u003C\u002Fdiv\u003E\u003Cp\u003ESuper fast, vector-based cool text generator powered by modern web technologies.\u003C\u002Fp\u003E\u003Cp class=\"small\"\u003E\u003Ca class=\"mt-footer-link\" href=\"\u002Ftos\"\u003ETerm of Use\u003C\u002Fa\u003E \u003Cspan class=\"mx-1\"\u003E\u002F\u003C\u002Fspan\u003E \u003Ca class=\"mt-footer-link\" href=\"\u002Fprivacy\"\u003EPrivacy Policy\u003C\u002Fa\u003E \u003Cspan class=\"mx-1\"\u003E\u002F\u003C\u002Fspan\u003E \u003Ca class=\"mt-footer-link\" href=\"mailto:contact@maketext.io\"\u003EContact\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-sm\"\u003E\u003Ca class=\"btn btn-block btn-outline-light mr-2 mb-2\" href=\"https:\u002F\u002Fwww.facebook.com\u002Fsharer\u002Fsharer.php?u=https:\u002F\u002Fmaketext.io\" target=\"_blank\"\u003Eshare with facebook \u003Ci class=\"fa fa-facebook\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm\"\u003E\u003Ca class=\"btn btn-block btn-outline-light text-nowrap\" href=\"https:\u002F\u002Fx.com\u002Fintent\u002Fpost?url=https:\u002F\u002Fmaketext.io&amp;text=super-fast%20cool%20text%20generator%20for%20modern%20age\" target=\"_blank\"\u003Eshare with ";
pug_mixins["x-icon"]();
pug_html = pug_html + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm\"\u003E\u003Ch1\u003E\u003Csmall\u003EPartner Sites\u003C\u002Fsmall\u003E\u003C\u002Fh1\u003E\u003Cdiv class=\"sep\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mb-2\"\u003E\u003Ca href=\"https:\u002F\u002Floading.io\"\u003E\u003Ci class=\"fa fa-external-link\"\u003E\u003C\u002Fi\u003E loading.io \u003Cimg src=\"\u002Fassets\u002Fimg\u002Floader\u002Fcloudy.gif\"\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"ml-3\"\u003Eanimated icons and spinner service\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mb-2 d-none\"\u003E\u003Ca href=\"https:\u002F\u002Fmakeweb.io\"\u003E\u003Ci class=\"fa fa-external-link\"\u003E\u003C\u002Fi\u003E makeweb.io \u003Cimg src=\"\u002Fassets\u002Fimg\u002Flanding\u002Fmakeweb.png\"\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"ml-3\"\u003Ereal-time collaborative web design service\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mb-2\"\u003E\u003Ca href=\"https:\u002F\u002Fmakechart.io\"\u003E\u003Ci class=\"fa fa-external-link\"\u003E\u003C\u002Fi\u003E makechart.io \u003Cimg src=\"\u002Fassets\u002Fimg\u002Flanding\u002Frose.png\"\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"ml-3\"\u003Emake chart online for free\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cscript\u003EArray.from(document.querySelectorAll('.mt-year')).map(function(n) { n.textContent = new Date().getFullYear(); });\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
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
        typeof description !== 'undefined' ? description : undefined, "escape" in locals_for_with ?
        locals_for_with.escape :
        typeof escape !== 'undefined' ? escape : undefined, "favicon" in locals_for_with ?
        locals_for_with.favicon :
        typeof favicon !== 'undefined' ? favicon : undefined, "gaIds" in locals_for_with ?
        locals_for_with.gaIds :
        typeof gaIds !== 'undefined' ? gaIds : undefined, "hashfile" in locals_for_with ?
        locals_for_with.hashfile :
        typeof hashfile !== 'undefined' ? hashfile : undefined, "libLoader" in locals_for_with ?
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