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
    
    (function (Array, JSON, asseturl, b64img, blockLoader, bundleurl, c, cssLoader, debug, decache, defer, description, escape, favicon, hashfile, libLoader, md5, scriptLoader, thumbnail, title, url, version) {
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























url = "https://maketext.io/fancy/"
pug_html = pug_html + "\u003Chead prefix=\"og: http:\u002F\u002Fogp.me\u002Fns#\"\u003E";
if (!debug) {
pug_html = pug_html + "\u003C!-- Global site tag (gtag.js) - Google Analytics--\u003E\u003Cscript" + (pug_attr("async", true, true, true)+" src=\"https:\u002F\u002Fwww.googletagmanager.com\u002Fgtag\u002Fjs?id=UA-120719734-1\"") + "\u003E\u003C\u002Fscript\u003E\u003Cscript\u003Ewindow.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'UA-120719734-1');\u003C\u002Fscript\u003E";
}
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0\"\u003E\u003Ctitle\u003E" + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\u003Cmeta" + (" name=\"description\""+pug_attr("content", description, true, true)) + "\u003E\u003Cmeta property=\"og:locale\" content=\"en_US\"\u003E\u003Cmeta" + (" property=\"og:image\""+pug_attr("content", thumbnail, true, true)) + "\u003E\u003Cmeta property=\"og:image:type\" content=\"image\u002Fpng\"\u003E\u003Cmeta property=\"og:image:width\" content=\"1200\"\u003E\u003Cmeta property=\"og:image:height\" content=\"630\"\u003E\u003Cmeta property=\"og:type\" content=\"website\"\u003E\u003Cmeta" + (" property=\"og:url\""+pug_attr("content", url, true, true)) + "\u003E\u003Cmeta" + (" property=\"og:title\""+pug_attr("content", title, true, true)) + "\u003E\u003Cmeta" + (" property=\"og:description\""+pug_attr("content", description, true, true)) + "\u003E\u003Cmeta name=\"twitter:card\" content=\"summary\"\u003E\u003Cmeta" + (" name=\"twitter:title\""+pug_attr("content", title, true, true)) + "\u003E\u003Cmeta" + (" name=\"twitter:description\""+pug_attr("content", description, true, true)) + "\u003E\u003Cmeta" + (" name=\"twitter:image\""+pug_attr("content", thumbnail, true, true)) + "\u003E\u003Clink" + (" rel=\"icon\" type=\"image\u002Fx-icon\""+pug_attr("href", favicon, true, true)) + "\u003E\u003Clink rel=\"preconnect\" href=\"https:\u002F\u002Fxlfont.maketext.io\"\u003E";
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
pug_html = pug_html + "\u003Cstyle type=\"text\u002Fcss\"\u003E@font-face {\n  font-family: 'ldi';\n  src: url('\u002Fassets\u002Flib\u002Fldiconfont\u002Fmain\u002Fldif.ttf') format('truetype');\n}\u003C\u002Fstyle\u003E\u003Cstyle type=\"text\u002Fcss\"\u003E.line .item {\n  height: 120px;\n  position: relative;\n}\n.line .item:after, .line .item:before {\n  display: block;\n  content: \"Copy\";\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  width: 70px;\n  text-align: center;\n  height: 29px;\n  line-height: 22px;\n  font-size: 16px;\n  background: #eee;\n  border-radius: 5px;\n  padding: 3px 7px;\n  transition: opacity 0.2s ease-in-out;\n  opacity: 0;\n}\n.line .item:hover:after {\n  opacity: 1;\n}\n.line .item.active:before {\n  opacity: 1;\n}\n.line .item:before {\n  content: \"Copied\";\n  background: #2b4;\n  color: #fff;\n  z-index: 1;\n}\u003C\u002Fstyle\u003E\u003Cscript src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fclipboard.js\u002F2.0.0\u002Fclipboard.min.js\"\u003E\u003C\u002Fscript\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E";
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
pug_html = pug_html + "\u003Cdiv id=\"editor\"\u003E\u003Cdiv class=\"config\"\u003E\u003Cdiv class=\"row\" style=\"max-width:1024px;margin:auto\"\u003E\u003Cdiv class=\"col-12 col-sm-6\"\u003E\u003Clabel\u003EText\u003C\u002Flabel\u003E\u003Cinput class=\"form-control form-control-sm\" id=\"text-input\" value=\"Fancy Text!\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-12 col-sm-6\"\u003E\u003Clabel\u003EUpperCase\u003C\u002Flabel\u003E\u003Cdiv class=\"btn-group\" id=\"text-case\"\u003E\u003Cdiv class=\"btn btn-sm btn-outline-dark\" data-value=\"on\"\u003EOn\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-sm btn-outline-dark active\" data-value=\"off\"\u003EOff\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"text-center\" id=\"landing\"\u003E\u003Cdiv class=\"cbad\"\u003E\u003Cscript" + (" id=\"_carbonads_js\""+pug_attr("async", true, true, true)+" type=\"text\u002Fjavascript\" src=\"\u002F\u002Fcdn.carbonads.com\u002Fcarbon.js?serve=CK7I453J&amp;placement=maketextio\"") + "\u003E\u003C\u002Fscript\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"share\"\u003E\u003Cspan class=\"mr-2\"\u003Eshare with\u003C\u002Fspan\u003E\u003Ca class=\"mr-2\" href=\"https:\u002F\u002Fwww.facebook.com\u002Fsharer\u002Fsharer.php?u=https:\u002F\u002Fmaketext.io\u002Ffancy\u002F\" style=\"font-size:0.9em;margin-top:-3px\" target=\"_blank\"\u003Efacebook\u003C\u002Fa\u003E\u003Cspan class=\"mr-2\"\u003E\u002F\u003C\u002Fspan\u003E\u003Ca href=\"https:\u002F\u002Ftwitter.com\u002Fshare?url=https:\u002F\u002Fmaketext.io\u002Ffancy\u002F&amp;text=super-fast%20cool%20text%20generator%20for%20modern%20age\" target=\"_blank\"\u003Etwitter\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"inner\"\u003E\u003Cdiv class=\"subtitle\"\u003ELet's make text fancy again\u003C\u002Fdiv\u003E\u003Ch1\u003E\u003Cspan\u003EFancy Text Generator\u003C\u002Fspan\u003E\u003C\u002Fh1\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003Cdiv class=\"widget\"\u003E\u003Cbig\u003EFirst, type some texts to start with:\u003C\u002Fbig\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E\u003Cinput class=\"form-control input-lg\" type=\"text\" placeholder=\"for example, 'Fancy Text!'\"\u003E\u003Cdiv class=\"input-group-append\"\u003E\u003Cdiv class=\"btn btn-action btn-block\" onclick=\"scrollto('#top')\"\u003EMake Fancy Text\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cbr\u003E\u003Ca href=\"\u002F\"\u003Eor, style your text into cool text images \u003Ci class=\"fa fa-arrow-right\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"top\" style=\"transform:translate(0,-80px)\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"text-center\"\u003E\u003Cdiv class=\"big\"\u003EThen, click the fancy text effect you'd like to use\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003Cdiv class=\"gallery\" id=\"gallery\" style=\"text-align:center;font-size:32px;line-height:120px\"\u003E";
// iterate [1,2,3,4,5,6,7,8]
;(function(){
  var $$obj = [1,2,3,4,5,6,7,8];
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var i = $$obj[pug_index2];
pug_html = pug_html + "\u003Cdiv class=\"line\"\u003E\u003Cdiv class=\"item\"\u003E𝕗𝕒𝕟𝕔𝕪 𝕥𝕖𝕩𝕥!\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003E𝕗𝕒𝕟𝕔𝕪 𝕥𝕖𝕩𝕥!\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var i = $$obj[pug_index2];
pug_html = pug_html + "\u003Cdiv class=\"line\"\u003E\u003Cdiv class=\"item\"\u003E𝕗𝕒𝕟𝕔𝕪 𝕥𝕖𝕩𝕥!\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003E𝕗𝕒𝕟𝕔𝕪 𝕥𝕖𝕩𝕥!\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E\u003Cbig\u003E\u003Ca href=\"\u002F\"\u003E\u003Cdiv\u003Eneed cool text in images?\u003C\u002Fdiv\u003E\u003Cdiv\u003Echeck out the cool text generator!\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\u003C\u002Fbig\u003E\u003C\u002Fdiv\u003E\u003Cbr\u003E\u003Cdiv id=\"info\"\u003E\u003Cdiv class=\"inner\"\u003E\u003Cdiv class=\"text-center\"\u003E\u003Cspan class=\"green\"\u003Eabout this tool\u003C\u002Fspan\u003E\u003Ch1\u003EMake Text Fancy! Fancy Text Generator\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"sep huge-gap\"\u003E\u003C\u002Fdiv\u003E\u003Cp\u003EWanna bomb your friends with 𝖙𝖊𝖝𝖙 𝖑𝖎𝖐𝖊 𝖙𝖍𝖎𝖘? You need fancy text generator! maketext.io's fancy text generator is dedicated to generate stylish text in \u003Cspan class=\"green\"\u003Ecopyable, pure text format\u003C\u002Fspan\u003E. \u003C\u002Fp\u003E\u003Cbr\u003E\u003Ch3\u003EImage v.s Text\u003C\u002Fh3\u003E\u003Cp\u003EYou've probably tried our \u003Ca href=\"\u002F\"\u003ECool Text Generator\u003C\u002Fa\u003E, an on-the-fly stylish text generator shipped with SVG \u002F PNG format. While cool text is cool, it's in image formats so we can only use them like an image.\u003C\u002Fp\u003E\u003Cp\u003EWhile images are not able to copy \u002F paste in places like Facebook posts, messengers or other chat apps, \"text\" can. Fancy text generator converts your texts to similar unicode characters with different styles, and all of them are copy\u002Fpaste-able in any places that support unicode with these characters.\u003C\u002Fp\u003E\u003Cbr\u003E\u003Cp\u003EThe coolest part of fancy text is it actually might be used in cool text image generator:\u003C\u002Fp\u003E\u003Cimg src=\"\u002Fassets\u002Fimg\u002Ffancy\u002Ffancy.jpg\" style=\"border-radius:3px;box-shadow:0 2px 4px rgba(0,0,0,.3);max-width:90%;margin:auto;display:block\"\u003E";
pug_mixins["nbr"](3);
pug_html = pug_html + "\u003Ch2\u003EContact\u003C\u002Fh2\u003E\u003Cdiv class=\"sep\"\u003E\u003C\u002Fdiv\u003E\u003Cp\u003EWe want to build this service to its best, but there are always bugs or glitches. Feel free to contact us via \u003Cb\u003Econtact@maketext.io\u003C\u002Fb\u003E by mail. We always appreciate your feedback and support, by which we could make this service better together.\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["nbr"](5);
pug_html = pug_html + "\u003Cdiv id=\"footer\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-sm mb-4\"\u003E\u003Ch1\u003EMaketext.io\u003Cspan style=\"vertical-align:top;font-size:14px\"\u003E&copy; 2018\u003C\u002Fspan\u003E\u003C\u002Fh1\u003E\u003Cdiv class=\"sep\"\u003E\u003C\u002Fdiv\u003E\u003Cp\u003ESuper fast, vector-based cool text generator powered by modern web technologies.\u003C\u002Fp\u003E\u003Cbr\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-sm\"\u003E\u003Ca class=\"btn btn-block btn-outline-light mr-2 mb-2\" href=\"https:\u002F\u002Fwww.facebook.com\u002Fsharer\u002Fsharer.php?u=https:\u002F\u002Fmaketext.io\" target=\"_blank\"\u003Eshare with facebook \u003Ci class=\"fa fa-facebook\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm\"\u003E\u003Ca class=\"btn btn-block btn-outline-light\" href=\"https:\u002F\u002Ftwitter.com\u002Fshare?url=https:\u002F\u002Fmaketext.io&amp;text=super-fast%20cool%20text%20generator%20for%20modern%20age\" target=\"_blank\"\u003Eshare with twitter \u003Ci class=\"fa fa-twitter\"\u003E\u003C\u002Fi\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm\"\u003E\u003Ch1\u003E\u003Csmall\u003EPartner Sites\u003C\u002Fsmall\u003E\u003C\u002Fh1\u003E\u003Cdiv class=\"sep\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mb-2\"\u003E\u003Ca href=\"https:\u002F\u002Floading.io\"\u003E\u003Ci class=\"fa fa-external-link\"\u003E\u003C\u002Fi\u003E loading.io \u003Cimg src=\"\u002Fassets\u002Fimg\u002Floader\u002Fcloudy.gif\"\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"ml-3\"\u003Eanimated icons and spinner service\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mb-2\"\u003E\u003Ca href=\"https:\u002F\u002Fmakeweb.io\"\u003E\u003Ci class=\"fa fa-external-link\"\u003E\u003C\u002Fi\u003E makeweb.io \u003Cimg src=\"\u002Fassets\u002Fimg\u002Flanding\u002Fmakeweb.png\"\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"ml-3\"\u003Ereal-time collaborative web design service\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mb-2\"\u003E\u003Ca href=\"https:\u002F\u002Fplotdb.com\"\u003E\u003Ci class=\"fa fa-external-link\"\u003E\u003C\u002Fi\u003E plotdb.com \u003Cimg src=\"\u002Fassets\u002Fimg\u002Flanding\u002Frose.png\"\u003E\u003C\u002Fa\u003E\u003Cdiv class=\"ml-3\"\u003Edata visualization as a service\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_mixins["script"]("/js/fancy/index.js");
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
        typeof description !== 'undefined' ? description : undefined, "escape" in locals_for_with ?
        locals_for_with.escape :
        typeof escape !== 'undefined' ? escape : undefined, "favicon" in locals_for_with ?
        locals_for_with.favicon :
        typeof favicon !== 'undefined' ? favicon : undefined, "hashfile" in locals_for_with ?
        locals_for_with.hashfile :
        typeof hashfile !== 'undefined' ? hashfile : undefined, "libLoader" in locals_for_with ?
        locals_for_with.libLoader :
        typeof libLoader !== 'undefined' ? libLoader : undefined, "md5" in locals_for_with ?
        locals_for_with.md5 :
        typeof md5 !== 'undefined' ? md5 : undefined, "scriptLoader" in locals_for_with ?
        locals_for_with.scriptLoader :
        typeof scriptLoader !== 'undefined' ? scriptLoader : undefined, "thumbnail" in locals_for_with ?
        locals_for_with.thumbnail :
        typeof thumbnail !== 'undefined' ? thumbnail : undefined, "title" in locals_for_with ?
        locals_for_with.title :
        typeof title !== 'undefined' ? title : undefined, "url" in locals_for_with ?
        locals_for_with.url :
        typeof url !== 'undefined' ? url : undefined, "version" in locals_for_with ?
        locals_for_with.version :
        typeof version !== 'undefined' ? version : undefined));
    ;;return pug_html;}; module.exports = template; })() 