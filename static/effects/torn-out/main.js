// Generated by LiveScript 1.3.0
var ret;
ret = {
  name: '',
  desc: '',
  tags: '',
  slug: '',
  init: function(){},
  edit: {
    color: {
      name: 'color',
      type: 'color',
      'default': '#444'
    }
  },
  watch: function(n, o, node){
    return node.querySelector('text').style.fill = n.color;
  },
  dom: function(config){}
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = ret;
}