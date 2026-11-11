 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (libLoader, version) {
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



























































































pug_html = pug_html + "\u003Chtml\u003E\u003Chead\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Ch3\u003EAPP Error Information Page\u003C\u002Fh3\u003E\u003Cdiv\u003E\u003C\u002Fdiv\u003E\u003Cscript\u003Evar ret,err,k,v;ret=document.cookie.split(\";\").map(function(r){var e;e=r.trim().split(\"=\");return[e[0],decodeURIComponent(e[1])]}).filter(function(r){return r[0]===\"lderror\"})[0][1];if(ret){err=\"server lderror\\n\";ret=JSON.parse(ret);for(k in ret){v=ret[k];err+=\" - \"+k.padEnd(7,\" \")+\"\\t \"+v+\"\\n\"}console.error(err);document.querySelector(\"div\").innerText=\"error id: \"+ret.id+\"\\nuuid: \"+ret.uuid}else{console.error(\"unknown server error\");document.querySelector(\"div\").innerText=\"unknow server error\"}\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "libLoader" in locals_for_with ?
        locals_for_with.libLoader :
        typeof libLoader !== 'undefined' ? libLoader : undefined, "version" in locals_for_with ?
        locals_for_with.version :
        typeof version !== 'undefined' ? version : undefined));
    ;;return pug_html;}; module.exports = template; })() 