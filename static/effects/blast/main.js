// Generated by LiveScript 1.3.0
var ret;
ret = {
  debug: true,
  name: '',
  desc: '',
  tags: '',
  slug: '',
  init: function(){},
  edit: {},
  watch: function(n, o, node){
    return Array.from(node.querySelectorAll('feFlood')).map(function(d, i){
      if (i >= 3) {
        return;
      }
      return d.setAttribute('flood-color', n["color" + (i + 1)]);
    });
  },
  dom: function(config){}
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = ret;
}