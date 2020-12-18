// Generated by LiveScript 1.3.1
var lc;
lc = {};
ldc.register('ldcvmgr', [], function(){
  return lc.ldcvmgr || (lc.ldcvmgr = new ldcvmgr());
});
ldc.register('loader', [], function(){
  return lc.ldld || (lc.ldld = new ldLoader({
    className: 'ldld full',
    autoZ: true,
    atomic: false
  }));
});
ldc.register('notify', [], function(){
  return lc.notify || (lc.notify = new ldnotify());
});
ldc.register('error', ['ldcvmgr'], function(arg$){
  var ldcvmgr, ret;
  ldcvmgr = arg$.ldcvmgr;
  ret = function(opt){
    opt == null && (opt = {});
    return function(e){
      var code;
      console.log(e);
      code = e ? +(code || e.id || e.code) : null;
      if (code && !isNaN(code)) {
        if (in$(code, opt.ignore || [999])) {
          return;
        }
        if (opt.custom && opt.custom[code]) {
          return opt.custom[code](e);
        }
        if ((ret['default'] || (ret['default'] = {}))[code]) {
          return ret['default'][code](e);
        }
      }
      ldcvmgr.toggle('error');
      return console.log(e);
    };
  };
  return ret;
});
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}