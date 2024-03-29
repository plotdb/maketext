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
      'default': '#ee4208'
    },
    color2: {
      name: 'color2',
      type: 'color',
      'default': '#4139ff'
    },
    stroke: {
      name: 'stroke',
      type: 'color',
      'default': '#000000'
    },
    shadow: {
      name: 'shadow',
      type: 'color',
      'default': '#000000'
    },
    direction: {
      name: 'direction',
      type: 'number',
      'default': 90,
      min: 0,
      max: 360,
      step: 1
    }
  },
  watch: function(n, o, node){
    var flood, angle, dx, dy, ref$, x1, y1, x2, y2, x$;
    Array.from(node.querySelectorAll('stop')).map(function(d, i){
      if (n["color" + (i + 1)] != null) {
        return d.setAttribute('stop-color', n["color" + (i + 1)]);
      }
    });
    flood = Array.from(node.querySelectorAll('feFlood'));
    if (n.stroke != null) {
      flood[0].setAttribute('flood-color', n.stroke);
    }
    if (n.shadow != null) {
      flood[1].setAttribute('flood-color', n.shadow);
    }
    angle = n.direction || 0;
    dx = Math.cos(angle * Math.PI / 180) * 0.4;
    dy = Math.sin(angle * Math.PI / 180) * 0.4;
    ref$ = [0.5 - dx, 0.5 - dy], x1 = ref$[0], y1 = ref$[1];
    ref$ = [0.5 + dx, 0.5 + dy], x2 = ref$[0], y2 = ref$[1];
    x$ = node.querySelector('linearGradient');
    x$.setAttribute('x1', x1);
    x$.setAttribute('y1', y1);
    x$.setAttribute('x2', x2);
    x$.setAttribute('y2', y2);
    return x$;
  },
  dom: function(config){}
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = ret;
}