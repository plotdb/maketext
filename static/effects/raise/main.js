// Generated by LiveScript 1.3.0
var ret;
ret = {
  name: '',
  desc: '',
  tags: '',
  slug: '',
  init: function(){},
  edit: {
    color1: {
      name: 'color1',
      type: 'color',
      'default': '#ccc'
    },
    color2: {
      name: 'color2',
      type: 'color',
      'default': '#777'
    }
  },
  watch: function(n, o, node){
    node.querySelectorAll('feFlood')[0].setAttribute('flood-color', n.color1);
    return node.querySelectorAll('feFlood')[1].setAttribute('flood-color', n.color2);
  },
  dom: function(config){}
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = ret;
}