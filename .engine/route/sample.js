// Generated by LiveScript 1.3.1
(function(){
  var fs, path, lderror, aux;
  fs = require('fs');
  path = require('path');
  lderror = require('lderror');
  aux = require('../module/aux');
  (function(it){
    return module.exports = it;
  })(function(backend){
    var db, config, ref$, api, app;
    db = backend.db, config = backend.config, ref$ = backend.route, api = ref$.api, app = ref$.app;
    app.get('/', aux.autocatch(function(req, res, next){
      return db.query("select count(key) as count from users").then(function(r){
        var count;
        r == null && (r = {});
        count = ((r.rows || (r.rows = []))[0] || {
          count: 0
        }).count;
        return res.render('index.pug', {
          count: count
        });
      });
    }));
    api.get('/x', function(req, res, next){
      req.log.info('hi');
      return next(new lderror(1005));
    });
    app.get('/x', function(req, res, next){
      return next(new Error());
    });
    return app.get('/i18n', function(req, res, next){
      console.log(req.get("I18n-Locale"));
      return res.send('ok');
    });
  });
}).call(this);
