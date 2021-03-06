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
    },
    freq: {
      name: 'frequency',
      type: 'number',
      'default': 0.1,
      min: 0,
      max: 0.5,
      step: 0.01
    },
    scale: {
      name: 'scale',
      type: 'number',
      'default': 10,
      min: 0,
      max: 20,
      step: 0.5
    }
  },
  watch: function(n, o, node){
    var d;
    if (n.color != null) {
      node.querySelector('text').style.fill = n.color;
    }
    if (n.freq != null) {
      node.querySelector('feTurbulence').setAttribute('baseFrequency', n.freq);
    }
    if (n.scale != null) {
      d = n.scale * -0.25;
      node.querySelector('feDisplacementMap').setAttribute('scale', n.scale);
      return node.querySelector('text').setAttribute('transform', "translate(" + d + "," + d + ")");
    }
  },
  dom: function(config){}
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = ret;
}