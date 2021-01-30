// Generated by LiveScript 1.6.0
(function(){
  var fs, path, cwd, DocTree;
  fs = require('fs');
  path = require('path');
  cwd = path.resolve(process.cwd());
  DocTree = function(opt){
    opt == null && (opt = {});
    this.opt = opt;
    this.depend = {
      by: {},
      on: {}
    };
    this.root = opt.root || cwd;
    this.type = opt.type;
    if (opt.parser) {
      this.parser = opt.parser;
    }
    return this;
  };
  DocTree.prototype = import$(Object.create(Object.prototype), {
    setRoot: function(it){
      return this.root = it;
    },
    parse: function(f){
      var content, dir, ret, this$ = this;
      if (!fs.existsSync(f)) {
        return [];
      }
      content = fs.readFileSync(f).toString();
      dir = path.dirname(path.relative(this.root, f));
      if (!this.parser) {
        return;
      }
      this.depend.by[f] = ret = this.parser(content).map(function(it){
        return path.join(this$.root, path.normalize(it[0] === '/'
          ? it
          : path.join(dir, it)));
      });
      ret.map(function(it){
        var ref$;
        return ((ref$ = this$.depend.on)[it] || (ref$[it] = [])).push(f);
      });
      return ret;
    },
    affect: function(list){
      var ref$, ret, visited, f, k;
      if (!Array.isArray(list)) {
        list = [list];
      }
      ref$ = [{}, {}], ret = ref$[0], visited = ref$[1];
      list.map(function(it){
        return ret[it] = true;
      });
      while (list.length) {
        f = path.normalize(path.relative(this.root, path.join(this.root, list.pop())));
        if (!visited[f] && this.depend.on[f]) {
          list = list.concat(this.depend.on[f]);
          this.depend.on[f].map(fn$);
        }
        visited[f] = true;
      }
      return (function(){
        var results$ = [];
        for (k in ret) {
          results$.push(k);
        }
        return results$;
      }());
      function fn$(it){
        return ret[it] = true;
      }
    }
  });
  module.exports = DocTree;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
