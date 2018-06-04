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
      'default': '#a0d5ff'
    },
    color2: {
      name: 'color2',
      type: 'color',
      'default': 'rgba(51.266%,81.812%,87.142%,0.34)'
    },
    color3: {
      name: 'color3',
      type: 'color',
      'default': '#0067ff'
    }
  },
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