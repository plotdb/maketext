var LINEHEIGHT;
window.idle = function(cb, timeout){
  var run;
  timeout == null && (timeout = 2000);
  run = function(){
    if (window.requestIdleCallback) {
      return requestIdleCallback(cb, {
        timeout: timeout
      });
    } else {
      return setTimeout(cb, 200);
    }
  };
  if (document.readyState === 'complete') {
    return run();
  } else {
    return window.addEventListener('load', run);
  }
};
window.mtTrack = function(name, params){
  params == null && (params = {});
  if (typeof gtag === 'function') {
    return gtag('event', name, params);
  }
};
LINEHEIGHT = 1.2;
window.mtSetText = function(node, value){
  var lines, x, i$, len$, i, line, t, results$ = [];
  lines = (value + "").split(/\r?\n/);
  node.dataset.mtText = value;
  if (lines.length < 2) {
    return node.textContent = value;
  }
  node.textContent = '';
  x = node.getAttribute('x') || 0;
  for (i$ = 0, len$ = lines.length; i$ < len$; ++i$) {
    i = i$;
    line = lines[i$];
    t = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    t.setAttribute('x', x);
    t.setAttribute('dy', (i === 0 ? -(lines.length - 1) / 2 * LINEHEIGHT : LINEHEIGHT) + "em");
    t.textContent = line || ' ';
    results$.push(node.appendChild(t));
  }
  return results$;
};
window.mtTextLines = function(node){
  var ref$;
  return (((ref$ = node.dataset.mtText) != null
    ? ref$
    : node.textContent) + "").split(/\r?\n/);
};
window.mtLineHeight = LINEHEIGHT;