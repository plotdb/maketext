# error-handler 對 body-parser 錯誤的處理. 用真的 body-parser 打本機 port, 確認錯誤的 type 對得上.
#
#   npm test -- error-handler
#   ./node_modules/.bin/lsc test/unit/error-handler.ls

require! <[path http express body-parser lderror]>
error-handler = require path.join(__dirname, \../../backend/engine/error-handler)

failed = 0
ok = (cond, msg) ->
  console.log "  #{if cond => 'ok  ' else 'FAIL'} #msg"
  if !cond => failed := failed + 1

logs = []
log = (level) -> (...args) -> logs.push {level, args}
app = express!
app.use (req, res, next) ->
  req.log = {info: log(\info), warn: log(\warn), error: log(\error)}
  next!
app.use body-parser.json limit: 32
app.use body-parser.urlencoded extended: true, limit: 1024, parameter-limit: 2
app.get \/throw/:name, (req, res, next) ->
  next switch req.params.name
  | \plain => Object.assign new Error("oops"), {status: 415}
  | \lderror => lderror 1005
app.post \/ok, (req, res) -> res.send \ok
app.use error-handler {config: {log: {}}, log-error: {warn: (->), debug: (->)}}

request = ({port, method = \POST, url = \/api/json, headers = {}, body = ''}) -> new Promise (res, rej) ->
  req = http.request {host: '127.0.0.1', port, method, path: url, headers}, (r) ->
    data = ''
    r.on \data, -> data += it
    r.on \end, -> res {status: r.status-code, body: data}
  req.on \error, rej
  req.end body

json = 'content-type': \application/json
form = 'content-type': 'application/x-www-form-urlencoded'
errors = -> logs.filter(-> it.level == \error).length

server = app.listen 0, '127.0.0.1', ->
  port = server.address!port
  check = (name, opt, status) ->
    logs.splice 0
    request({port} <<< opt).then (r) ->
      ok r.status == status, "#name: 回 #status ( 實際 #{r.status} )"
      ok JSON.parse(r.body).id == status, "#name: lderror id 是 #status"
      ok (!errors! and logs.length == 1), "#name: 記 info, 不記 error"
  check 'encoding.unsupported', {headers: {'content-type': 'application/json', 'content-encoding': 'br'}, body: '{}'}, 415
    .then -> check 'charset.unsupported', {headers: {'content-type': 'application/json; charset=big5'}, body: '{}'}, 415
    .then -> check 'entity.too.large', {headers: json, body: JSON.stringify({a: 'x'.repeat(64)})}, 413
    .then -> check 'parameters.too.many', {headers: form, body: 'a=1&b=2&c=3'}, 413
    .then ->
      logs.splice 0
      request {port, headers: json, body: '{'}
    .then (r) ->
      ok (r.status == 490 and JSON.parse(r.body).id == 400), "json 語法錯誤: 照舊是 lderror 400"
      ok !errors!, "json 語法錯誤: 不記 error"
      logs.splice 0
      request {port, method: \GET, url: \/throw/plain}
    .then (r) ->
      ok (r.status == 490 and JSON.parse(r.body).id == 500), "一般程式丟的 415: 照舊是 500"
      ok errors! == 1, "一般程式丟的 415: 照舊記 error"
      logs.splice 0
      request {port, method: \GET, url: \/throw/lderror}
    .then (r) ->
      ok (r.status == 490 and JSON.parse(r.body).id == 1005), "lderror: 照舊回 490"
      ok !errors!, "lderror: 不記 error"
    .catch (e) ->
      console.log e
      failed := failed + 1
    .then ->
      server.close!
      if failed => console.log "\n#failed failed"
      process.exit (if failed => 1 else 0)
