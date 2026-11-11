var effects = {"extrude-glow":{"bk":"","v":"cbc2b99b"},"hover":{"bk":"#596886","v":"7efc0a63"},"shiny":{"bk":"","v":"20216bf1"},"extrusion":{"bk":"","v":"f45c5e8d","name":"Extrusion"},"vr":{"bk":"","v":"3ae91d82"},"stripes":{"bk":"","v":"ea8d5f69"},"hole":{"bk":"","v":"c139a4a0"},"jagged":{"bk":"","v":"83d7abf3"},"vintage":{"bk":"#f2eddb","v":"8170d851"},"outline":{"bk":"","v":"3da0ccc6"},"stripe-bk":{"bk":"","v":"a1654eac"},"sticker":{"bk":"","v":"b14da63e"},"reflect":{"bk":"","v":"e4deb3cd"},"raise":{"bk":"","v":"756cdc4f"},"offset":{"bk":"","v":"57b241a5"},"goldstamp":{"bk":"","v":"e1d435f3"},"halftone":{"bk":"","v":"8befda98"},"crystal":{"bk":"#444","v":"8dba6ecf"},"golden":{"bk":"","v":"46c6bc3f"},"liquid":{"bk":"","v":"7b15179d"},"scratch":{"bk":"","v":"b5acebb0"},"neon":{"bk":"##222a22","v":"adb333f6"},"metal-beveled":{"bk":"","v":"ead7ab8a"},"stain":{"bk":"","v":"0d07b863"},"metal":{"bk":"#ccc","v":"e8ff6fe2"},"marble":{"bk":"#fff","v":"fa7dad6a"},"incredible":{"bk":"#de0000","v":"e62e2b81"},"rainbow":{"bk":"","v":"2f9aa50c"},"lego":{"bk":"#e00","v":"8e3980a3"},"shadow":{"bk":"rgb(29,181,147)","v":"ea41721b"},"gradow":{"bk":"","v":"def0f10f"},"gradient":{"bk":"","v":"ab6e1361"},"glowing":{"bk":"#051103","v":"a7add871"},"crack":{"bk":"","v":"f3f140fd"},"christmas":{"bk":"#ddd","v":"fcca85d5"},"cake":{"bk":"#b55500","v":"18d96526"}};
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