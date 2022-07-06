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
      'default': '#ddd'
    },
    color2: {
      name: 'color2',
      type: 'color',
      'default': '#666'
    },
    color3: {
      name: 'color3',
      type: 'color',
      'default': '#000'
    }
  },
  watch: function(n, o, node){
    if (n.color1 != null) {
      node.querySelectorAll('feFlood')[0].setAttribute('flood-color', n.color1);
    }
    if (n.color2 != null) {
      node.querySelectorAll('feFlood')[1].setAttribute('flood-color', n.color2);
    }
    if (n.color3 !== o.color3) {
      return node.querySelector('text').setAttribute('fill', n.color3);
    }
  },
  dom: function(config){}
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = ret;
}