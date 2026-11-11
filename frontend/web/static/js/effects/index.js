var effects = {"extrude-glow":{"bk":"","font":"Sansita One","v":"cbc2b99b"},"hover":{"bk":"#596886","font":"Sansita One","v":"7efc0a63"},"shiny":{"bk":"","font":"Sansita One","v":"20216bf1"},"extrusion":{"bk":"","font":"Sansita One","v":"f45c5e8d","name":"Extrusion"},"vr":{"bk":"","font":"Sansita One","v":"3ae91d82"},"stripes":{"bk":"","font":"Sansita One","v":"ea8d5f69"},"hole":{"bk":"","font":"Sansita One","v":"c139a4a0"},"jagged":{"bk":"","font":"Sansita One","v":"83d7abf3"},"vintage":{"bk":"#f2eddb","font":"Sansita One","v":"8170d851"},"outline":{"bk":"","font":"Sansita One","v":"3da0ccc6"},"stripe-bk":{"bk":"","font":"Sansita One","v":"a1654eac"},"sticker":{"bk":"","font":"Sansita One","v":"b14da63e"},"reflect":{"bk":"","font":"Sansita One","v":"e4deb3cd"},"raise":{"bk":"","font":"Sansita One","v":"756cdc4f"},"offset":{"bk":"","font":"Sansita One","v":"57b241a5"},"goldstamp":{"bk":"","font":"Sansita One","v":"e1d435f3"},"halftone":{"bk":"","font":"Sansita One","v":"8befda98"},"crystal":{"bk":"#444","font":"Sansita One","v":"8dba6ecf"},"golden":{"bk":"","font":"Sansita One","v":"46c6bc3f"},"liquid":{"bk":"","font":"Sansita One","v":"7b15179d"},"scratch":{"bk":"","font":"Sansita One","v":"b5acebb0"},"neon":{"bk":"##222a22","font":"Sansita One","v":"adb333f6"},"metal-beveled":{"bk":"","font":"Sansita One","v":"ead7ab8a"},"stain":{"bk":"","font":"Sansita One","v":"0d07b863"},"metal":{"bk":"#ccc","font":"Sansita One","v":"e8ff6fe2"},"marble":{"bk":"#fff","font":"Sansita One","v":"fa7dad6a"},"incredible":{"bk":"#de0000","font":"Sansita One","v":"e62e2b81"},"rainbow":{"bk":"","font":"Sansita One","v":"2f9aa50c"},"lego":{"bk":"#e00","font":"Sansita One","v":"8e3980a3"},"shadow":{"bk":"rgb(29,181,147)","font":"Sansita One","v":"ea41721b"},"gradow":{"bk":"","font":"Sansita One","v":"def0f10f"},"gradient":{"bk":"","font":"Sansita One","v":"ab6e1361"},"glowing":{"bk":"#051103","font":"Sansita One","v":"a7add871"},"crack":{"bk":"","font":"Sansita One","v":"f3f140fd"},"christmas":{"bk":"#ddd","font":"Sansita One","v":"fcca85d5"},"cake":{"bk":"#b55500","font":"Sansita One","v":"18d96526"}};
var mteffect = {
  _p: {},
  register: function(name, data, fn) {
    var m = {exports: {}}, e = effects[name] || (effects[name] = {});
    fn(m);
    e.html = data.html;
    e.js = {edit: data.edit, watch: m.exports.watch};
  },
  load: function(name) {
    var e = effects[name];
    if (!e) { return Promise.reject(new Error("effect not found: " + name)); }
    if (e.html) { return Promise.resolve(e); }
    if (this._p[name]) { return this._p[name]; }
    return this._p[name] = new Promise(function(res, rej) {
      var s = document.createElement("script");
      s.src = "/js/effects/" + name + ".js?v=" + e.v;
      s.onload = function() { res(e); };
      s.onerror = function() { delete mteffect._p[name]; rej(new Error("failed to load effect: " + name)); };
      document.head.appendChild(s);
    });
  }
};