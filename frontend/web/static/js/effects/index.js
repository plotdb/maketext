var effects = {"speed":{"no":53,"bk":"#1d1d1d","font":"Racing Sans One","v":"3377e558"},"watercolor":{"no":52,"bk":"#fbf8f2","font":"Pacifico","v":"3f4db76d"},"candy-stripe":{"no":51,"bk":"","font":"Chewy","v":"94a1013f"},"letterpress":{"no":50,"bk":"#e9e4d8","font":"Abril Fatface","v":"5da6d48a"},"pixel":{"no":49,"bk":"#1b1b2f","font":"VT323","v":"91a18da7"},"chalk":{"no":48,"bk":"#2f4a3a","font":"Kalam","v":"2a6d7dfa"},"ice":{"no":47,"bk":"#0e2a3d","font":"Passion One","v":"36c50f78"},"outline-rings":{"no":46,"bk":"","font":"Righteous","v":"70036448"},"pop-stack":{"no":45,"bk":"#fff4e0","font":"Shrikhand","v":"bf91d6fd"},"stamp":{"no":44,"bk":"#f4efe6","font":"Black Ops One","v":"5a3e9196"},"flame":{"no":43,"bk":"#1b0d05","font":"Russo One","v":"e7bfe30c"},"sketch":{"no":42,"bk":"#fbf7ec","font":"Permanent Marker","v":"5f434641"},"long-shadow":{"no":41,"bk":"#2ec4b6","font":"Lilita One","v":"25443a37"},"bubble":{"no":40,"bk":"","font":"Titan One","v":"45806546"},"glitch":{"no":39,"bk":"#111111","font":"Bebas Neue","v":"755b7e59"},"retro-chrome":{"no":38,"bk":"#14082b","font":"Audiowide","v":"d7d8a8c3"},"comic":{"no":37,"bk":"","font":"Bangers","v":"ca9cf048"},"extrude-glow":{"no":1,"bk":"","font":"Sansita One","v":"cbc2b99b"},"hover":{"no":2,"bk":"#596886","font":"Sansita One","v":"7efc0a63"},"shiny":{"no":3,"bk":"","font":"Sansita One","v":"20216bf1"},"extrusion":{"no":4,"bk":"","font":"Sansita One","v":"f45c5e8d","name":"Extrusion"},"vr":{"no":5,"bk":"","font":"Sansita One","v":"3ae91d82"},"stripes":{"no":6,"bk":"","font":"Sansita One","v":"ea8d5f69"},"hole":{"no":7,"bk":"","font":"Sansita One","v":"c139a4a0"},"jagged":{"no":8,"bk":"","font":"Sansita One","v":"83d7abf3"},"vintage":{"no":9,"bk":"#f2eddb","font":"Sansita One","v":"8170d851"},"outline":{"no":10,"bk":"","font":"Sansita One","v":"3da0ccc6"},"stripe-bk":{"no":11,"bk":"","font":"Sansita One","v":"a1654eac"},"sticker":{"no":12,"bk":"","font":"Sansita One","v":"b14da63e"},"reflect":{"no":13,"bk":"","font":"Sansita One","v":"e4deb3cd"},"raise":{"no":14,"bk":"","font":"Sansita One","v":"756cdc4f"},"offset":{"no":15,"bk":"","font":"Sansita One","v":"57b241a5"},"goldstamp":{"no":16,"bk":"","font":"Sansita One","v":"e1d435f3"},"halftone":{"no":17,"bk":"","font":"Sansita One","v":"8befda98"},"crystal":{"no":18,"bk":"#444","font":"Sansita One","v":"8dba6ecf"},"golden":{"no":19,"bk":"","font":"Sansita One","v":"46c6bc3f"},"liquid":{"no":20,"bk":"","font":"Sansita One","v":"7b15179d"},"scratch":{"no":21,"bk":"","font":"Sansita One","v":"b5acebb0"},"neon":{"no":22,"bk":"##222a22","font":"Sansita One","v":"adb333f6"},"metal-beveled":{"no":23,"bk":"","font":"Sansita One","v":"ead7ab8a"},"stain":{"no":24,"bk":"","font":"Sansita One","v":"0d07b863"},"metal":{"no":25,"bk":"#ccc","font":"Sansita One","v":"e8ff6fe2"},"marble":{"no":26,"bk":"#fff","font":"Sansita One","v":"fa7dad6a"},"incredible":{"no":27,"bk":"#de0000","font":"Sansita One","v":"e62e2b81"},"rainbow":{"no":28,"bk":"","font":"Sansita One","v":"2f9aa50c"},"lego":{"no":29,"bk":"#e00","font":"Sansita One","v":"8e3980a3"},"shadow":{"no":30,"bk":"rgb(29,181,147)","font":"Sansita One","v":"ea41721b"},"gradow":{"no":31,"bk":"","font":"Sansita One","v":"def0f10f"},"gradient":{"no":32,"bk":"","font":"Sansita One","v":"ab6e1361"},"glowing":{"no":33,"bk":"#051103","font":"Sansita One","v":"a7add871"},"crack":{"no":34,"bk":"","font":"Sansita One","v":"f3f140fd"},"christmas":{"no":35,"bk":"#ddd","font":"Sansita One","v":"fcca85d5"},"cake":{"no":36,"bk":"#b55500","font":"Sansita One","v":"18d96526"}};
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