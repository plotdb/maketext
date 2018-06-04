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
      'default': '#eb6c6c'
    },
    extrusion: {
      name: 'extrusion',
      type: 'color',
      'default': '#333333'
    },
    shadow: {
      name: 'shadow',
      type: 'color',
      'default': '#000000'
    },
    offset: {
      name: 'offset',
      type: 'number',
      'default': 3,
      min: 0,
      max: 16
    }
  },
  watch: function(n, o, node){
    var matrix, offsets, i;
    if (n.fill !== o.fill) {
      node.querySelector('text').setAttribute('fill', n.fill);
    }
    if (n.extrusion) {
      node.querySelectorAll('feFlood')[0].setAttribute('flood-color', n.extrusion);
    }
    if (n.shadow) {
      node.querySelectorAll('feFlood')[1].setAttribute('flood-color', n.shadow);
    }
    if (n.offset != null) {
      matrix = node.querySelector('feConvolveMatrix');
      offsets = node.querySelectorAll('feOffset');
      offsets[0].setAttribute('dx', -n.offset);
      offsets[1].setAttribute('dx', -n.offset * 1.5);
      matrix.setAttribute('order', n.offset + "," + n.offset);
      return matrix.setAttribute('kernelMatrix', (function(){
        var i$, to$, results$ = [];
        for (i$ = 0, to$ = n.offset; i$ < to$; ++i$) {
          i = i$;
          results$.push(i);
        }
        return results$;
      }()).map(function(i){
        var j;
        return (function(){
          var i$, to$, results$ = [];
          for (i$ = 0, to$ = n.offset; i$ < to$; ++i$) {
            j = i$;
            results$.push(j);
          }
          return results$;
        }()).map(function(j){
          if (i === Math.floor(n.offset * 0.5)) {
            return 1;
          } else {
            return 0;
          }
        }).join(' ');
      }).join(' '));
    }
  },
  dom: function(config){}
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = ret;
}