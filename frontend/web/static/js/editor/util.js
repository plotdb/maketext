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