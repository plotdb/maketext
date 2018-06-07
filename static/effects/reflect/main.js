// Generated by LiveScript 1.3.0
var ret;
ret = {
  name: '',
  desc: '',
  tags: '',
  slug: '',
  init: function(){},
  edit: {
    fill: {
      name: 'fill',
      type: 'color',
      'default': '#f7c551'
    },
    reflect: {
      name: 'reflect',
      type: 'color',
      'default': '#fff4b7'
    },
    shadow: {
      name: 'shadow',
      type: 'color',
      'default': '#704601'
    }
  },
  watch: function(n, o, node){
    var image, box, ref$, w, h, x1, y1, x2, y2, xc, yc;
    image = node.querySelector('feImage');
    box = node.querySelector('text').getBBox();
    ref$ = [box.width, box.height], w = ref$[0], h = ref$[1];
    ref$ = [0, 0], x1 = ref$[0], y1 = ref$[1];
    ref$ = [box.width, box.height * 0.45], x2 = ref$[0], y2 = ref$[1];
    ref$ = [box.width * 0.5, box.height * 0.65], xc = ref$[0], yc = ref$[1];
    image.setAttribute('x', box.x);
    image.setAttribute('y', box.y);
    image.setAttribute('width', w);
    image.setAttribute('height', h);
    image.setAttribute('href', "data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + w + "\" height=\"" + h + "\" viewBox=\"0 0 " + w + " " + h + "\">\n<defs>\n  <linearGradient id=\"reflect-gradient\" x1=\"0\" x2=\"0\" y1=\"0\" y2=\"1\">\n    <stop offset=\"0\" stop-color=\"" + n.reflect + "\" stop-opacity=\"0.0\"/>\n    <stop offset=\"0.3\" stop-color=\"" + n.reflect + "\" stop-opacity=\"0.0\"/>\n    <stop offset=\"1\" stop-color=\"" + n.reflect + "\" stop-opacity=\"0.9\"/>\n  </linearGradient>\n</defs>\n<path d=\"M" + x1 + " " + y1 + " L" + x1 + " " + y2 + " Q" + xc + " " + yc + " " + x2 + " " + y2 + " L" + x2 + " " + y1 + " Z\" fill=\"url(#reflect-gradient)\"/>\n</svg>");
    if (n.reflect != null) {
      Array.from(node.querySelectorAll('stop')).map(function(it){
        return it.setAttribute('stop-color', n.reflect);
      });
    }
    if (n.fill !== o.fill) {
      node.querySelector('text').setAttribute('fill', n.fill);
    }
    if (n.shadow != null) {
      return node.querySelector('feFlood').setAttribute('flood-color', n.shadow);
    }
  },
  dom: function(config){}
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = ret;
}