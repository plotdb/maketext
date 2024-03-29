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
      'default': '#fff'
    },
    color2: {
      name: 'color2',
      type: 'color',
      'default': '#f00'
    },
    density: {
      name: 'density',
      type: 'number',
      'default': 10,
      min: 2,
      max: 20,
      step: 0.1
    }
  },
  watch: function(n, o, node){
    var density, ref$, w, w2, s, d;
    density = n.density || 3;
    ref$ = [density, density * 2, density * 0.25], w = ref$[0], w2 = ref$[1], s = ref$[2];
    d = ['M', -w, -w, 'L', w2, w2, 'M', -w2, -w, 'L', w, w2, 'M', -w, -w2, 'L', w2, w].join(' ');
    return node.querySelector('feImage').setAttributeNS('http://www.w3.org/1999/xlink', 'href', "data:image/svg+xml;base64," + btoa("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"2000px\" height=\"1000px\"><defs><pattern id=\"pattern\" patternUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"" + w + "\" height=\"" + w + "\"><rect x=\"0\" y=\"0\" width=\"" + w + "\" height=\"" + w + "\" fill=\"" + n.color1 + "\"/><path d=\"" + d + "\" stroke=\"" + n.color2 + "\" stroke-width=\"" + s + "\"/></pattern></defs><rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" fill=\"url(#pattern)\"/></svg>"));
  },
  dom: function(config){}
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = ret;
}