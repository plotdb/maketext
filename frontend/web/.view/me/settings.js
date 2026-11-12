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
    
    (function (Array, JSON, asseturl, b64img, blockLoader, bundleurl, c, cssLoader, decache, defer, escape, hashfile, ldui, libLoader, md5, prefix, scriptLoader, url, version) {
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













prefix = function(n) { return (!n?[]:(Array.isArray(n)?n:[n])).map(function(it){ return `${prefix.currentName}$${it}`; }).join(' ');}
pug_mixins["scope"] = pug_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var parentName = prefix.currentName;
prefix.currentName = name;
if (attributes.class && /naked-scope/.exec(attributes.class)) {
block && block();
}
else {
pug_html = pug_html + "\u003Cdiv" + (pug_attrs(pug_merge([{"ld-scope": pug_escape(name || '')},attributes]), true)) + "\u003E";
block && block();
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
prefix.currentName = parentName;
};
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
















































var ldui = {};
ldui.ellipsis = function(str, len) {
  return ((str || '').substring(0, len || 200) + (((str || '').length > (len || 200)) ? '...' : ''));
};
pug_mixins["i"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Ci" + (pug_attrs(pug_merge([{"aria-hidden": "true"},attributes]), true)) + "\u003E\u003C\u002Fi\u003E";
};
pug_html = pug_html + "\u003Chead\u003E\u003Cmeta charset=\"utf-8\"\u003E\u003Ctitle\u003Emaketext.io\u003C\u002Ftitle\u003E\u003Cmeta name=\"description\" content=\"cool text generator with effects and fonts\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E\u003Cbase href=\"\u002F\"\u003E";
pug_mixins["css"]([
      {name: "bootstrap", path: "dist/css/bootstrap.min.css"},
      {name: "@loadingio/bootstrap.ext"},
      {name: "ldcover"},
      {name: "ldloader"},
      {name: "ldiconfont", path: "ldif.min.css"},
      {name: "ldbutton"},
      {name: "@loadingio/loading.css", path: "loading.min.css"},
      {name: "@loadingio/transition.css", path: "transition.min.css"},
      {name: "ldnotify"},
      {url: "/css/reset.min.css"}
    ]);
pug_html = pug_html + "\u003Cstyle type=\"text\u002Fcss\"\u003E@font-face{font-family:'ldi';font-weight:normal;font-style:normal;src:url(\"assets\u002Flib\u002Fldiconfont\u002Fmain\u002Fldif.ttf\") format('truetype')}.navtop{transition:color .35s linear,background .35s linear}.nav-light{background:rgba(255,255,255,0.5)}.nav-light .btn-text{color:#222}.nav-dark{background:rgba(0,0,0,0.5)}.nav-dark .btn-text{color:#eee}\u003C\u002Fstyle\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E";
pug_mixins["scope"].call({
block: function(){
pug_html = pug_html + "\u003Cdiv class=\"navtop\" ld=\"root\" data-classes=\"nav-dark;nav-light\" data-pivot=\"#pivot\"\u003E\u003Cdiv class=\"py-2 px-4 d-flex align-items-center\"\u003E\u003Cdiv class=\"flex-grow-1\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn-group dropdown mr-4\"\u003E\u003Cdiv class=\"btn btn-sm btn-outline-dark\" ld=\"lng\"\u003EEN\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-sm btn-outline-dark dropdown-toggle\" data-toggle=\"dropdown\"\u003E";
pug_mixins["i"].call({
attributes: {"class": "i-globe"}
});
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown-menu dropdown-menu-right\"\u003E\u003Cdiv class=\"dropdown-item\" ld=\"set-lng\" data-name=\"en\"\u003EEN\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown-item\" ld=\"set-lng\" data-name=\"zh-TW\"\u003E中\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"d-none\" ld=\"unauthed\"\u003E\u003Cdiv class=\"btn btn-text\" ld=\"t login\"\u003Elogin\u003C\u002Fdiv\u003E\u003Cdiv class=\"btn btn-text\" ld=\"t signup\"\u003Esignup\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown d-none\" ld=\"authed\"\u003E\u003Cdiv class=\"btn btn-text dropdown-toggle\" data-toggle=\"dropdown\"\u003E\u003Cspan ld=\"avatar\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown-menu dropdown-menu-right\"\u003E\u003Cdiv class=\"dropdown-item\" ld=\"displayname\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown-divider\"\u003E\u003C\u002Fdiv\u003E\u003Ca class=\"dropdown-item\" ld=\"t\" href=\"\u002Fdemo\u002Fme\u002Fsettings\"\u003Esettings\u003C\u002Fa\u003E\u003Cdiv class=\"dropdown-divider\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"dropdown-item text-danger\" ld=\"t logout\"\u003Elogout\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
},
attributes: {"class": "position-fixed w-100 z-fixed","styl": "top:0"}
}, "@servebase/navtop");
pug_html = pug_html + "\u003Cdiv class=\"d-flex flex-wrap mb-0 w-768 mx-auto rwd\"\u003E\u003Cdiv style=\"flex:1 0 auto;padding-bottom:100px\"\u003E\u003Cdiv class=\"w-768 rwd\" style=\"padding:30px\"\u003E\u003Ch1 class=\"mt-4 mb-4\" pd=\"t\"\u003Esettings\u003C\u002Fh1\u003E\u003Cbr\u003E\u003Cdiv class=\"mb-5\" ld=\"account-info\"\u003E\u003C\u002Fdiv\u003E\u003Cbr\u003E\u003Cdiv ld=\"change-password\"\u003E\u003C\u002Fdiv\u003E\u003Cbr\u003E\u003Cdiv class=\"mt-5\" ld=\"mfa-setup\"\u003E\u003C\u002Fdiv\u003E";
pug_mixins["nbr"](3);
pug_html = pug_html + "\u003Ch3 pd=\"t\"\u003E危險區域\u003C\u002Fh3\u003E\u003Chr\u003E\u003Cp pd=\"t\"\u003E要刪除帳號的話，請點擊以下按鈕，並依指示再次輸入您的電子郵件地址做為確認。\u003C\u002Fp\u003E\u003Cdiv class=\"btn btn-danger\" pd=\"t\" onclick=\"lda.ldcvmgr.get({name:'@servebase\u002Fauth',path:'delete-account'})\"\u003E刪除帳號\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["script"]([
      {name: "bootstrap.native", version: "main", path: "dist/bootstrap-native-v4.min.js"},
      {name: "i18next", version: "main", path: "dist/umd/i18next.min.js"},
      {name: "i18next-browser-languagedetector", path: "/dist/umd/i18nextBrowserLanguageDetector.min.js"},
      {name: "zmgr", version: "main"},
      {name: "@loadingio/ldquery", version: "main"},
      {name: "proxise", version: "main"},
      {name: "@loadingio/debounce.js", version: "main"},
      {name: "@plotdb/httputil", version: "main"},
      {name: "@plotdb/semver", version: "main"},
      {name: "@plotdb/rescope", version: "main"},
      {name: "@plotdb/csscope", version: "main"},
      {name: "@plotdb/block", version: "main"},
      {name: "ldcover", version: "main"},
      {name: "ldform", version: "main"},
      {name: "curegex", version: "main", path: "curegex.min.js"},
      {name: "ldview", version: "main"},
      {name: "ldloader", version: "main"},
      {name: "lderror", version: "main"},
      {name: "ldnotify", version: "main"},
      {name: "ldcvmgr", version: "main"},
      {name: "@loadingio/ldc", version: "main"},
      {name: "@servebase/auth", version: "main"},
      {name: "@servebase/consent", version: "main"},
      {name: "@servebase/captcha", version: "main"},
      {name: "@servebase/erratum", version: "main"},
      {name: "@servebase/core", version: "main"},
      {name: "@servebase/navtop", version: "main"},
      {name: "@servebase/payment", version: "main"},
      {name: "@servebase/discuss", version: "main"},
      {url: "/js/site.min.js"}
    ]);
pug_html = pug_html + "\u003C!--+script(\"\u002Fjs\u002Fme\u002Fsettings.js\")--\u003E";
pug_mixins["script"]([
    {name: "ldform"},
    {name: "ldfile"}
  ]);
pug_html = pug_html + "\u003Cscript type=\"module\"\u003Eldc.register(\"pagecfg\",[],function(){return{locales:{en:{settings:\"Settings\"},\"zh-TW\":{settings:\"設定\"}}}});ldc.register([\"core\"],function(n){var t;t=n.core;return t.init().then(function(){var n,e;n=new ldview({root:document.body});e=[];t.manager.from({name:\"@servebase\u002Fauth\",path:\"change-password\"},{root:n.get(\"change-password\")}).then(function(n){return e.push(n)}).then(function(){return t.manager.from({name:\"@servebase\u002Fauth\",path:\"account-info\"},{root:n.get(\"account-info\")})}).then(function(n){return e.push(n)}).then(function(){return t.manager.from({name:\"@servebase\u002Fauth\",path:\"mfa-setup\"},{root:n.get(\"mfa-setup\")})}).then(function(n){return e.push(n)});return t.i18n.on(\"languageChanged\",function(){return e.map(function(n){return n.instance.transform(\"i18n\")})})})});\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
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
        typeof cssLoader !== 'undefined' ? cssLoader : undefined, "decache" in locals_for_with ?
        locals_for_with.decache :
        typeof decache !== 'undefined' ? decache : undefined, "defer" in locals_for_with ?
        locals_for_with.defer :
        typeof defer !== 'undefined' ? defer : undefined, "escape" in locals_for_with ?
        locals_for_with.escape :
        typeof escape !== 'undefined' ? escape : undefined, "hashfile" in locals_for_with ?
        locals_for_with.hashfile :
        typeof hashfile !== 'undefined' ? hashfile : undefined, "ldui" in locals_for_with ?
        locals_for_with.ldui :
        typeof ldui !== 'undefined' ? ldui : undefined, "libLoader" in locals_for_with ?
        locals_for_with.libLoader :
        typeof libLoader !== 'undefined' ? libLoader : undefined, "md5" in locals_for_with ?
        locals_for_with.md5 :
        typeof md5 !== 'undefined' ? md5 : undefined, "prefix" in locals_for_with ?
        locals_for_with.prefix :
        typeof prefix !== 'undefined' ? prefix : undefined, "scriptLoader" in locals_for_with ?
        locals_for_with.scriptLoader :
        typeof scriptLoader !== 'undefined' ? scriptLoader : undefined, "url" in locals_for_with ?
        locals_for_with.url :
        typeof url !== 'undefined' ? url : undefined, "version" in locals_for_with ?
        locals_for_with.version :
        typeof version !== 'undefined' ? version : undefined));
    ;;return pug_html;}; module.exports = template; })() 