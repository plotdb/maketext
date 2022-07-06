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
      'default': '#ac7c2e'
    },
    color2: {
      name: 'color2',
      type: 'color',
      'default': '#340000'
    },
    shadow: {
      name: 'shadow',
      type: 'color',
      'default': '#340000'
    },
    frequency: {
      name: 'fractal',
      type: 'number',
      'default': 0.05,
      min: 0,
      max: 0.5,
      step: 0.01
    }
  },
  watch: function(n, o, node){
    if (n.color2 !== o.color2) {
      node.querySelector('text').setAttribute('fill', n.color2);
    }
    if (n.color1 != null) {
      node.querySelector('feSpecularLighting').setAttribute('lighting-color', n.color1);
    }
    if (n.shadow != null) {
      node.querySelector('feFlood').setAttribute('flood-color', n.shadow);
    }
    if (n.frequency != null) {
      return node.querySelector('feTurbulence').setAttribute('baseFrequency', n.frequency);
    }
  },
  dom: function(config){}
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = ret;
}