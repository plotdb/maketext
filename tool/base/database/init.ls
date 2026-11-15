require! <[path child_process os]>
{exec-sync} = child_process
fs = require \fs-extra
{grant-sql} = require \./grant
{settings, required} = require \./settings

root    = path.join __dirname, \../../..
sql-dir = path.join root, \config/base/db

# sql files run in file name order: config/base/db first, then the project's own
# config/<secret.base>/db, so a project's file can reference any base table.
# every file is named `<nnn>.<name>.sql` ( e.g. `000.init.sql`, `010.consent.sql` ):
# the number is the order, three digits so plain sorting ( `ls`, the docker
# entrypoint ) agrees. leave gaps for files added later. a file without it stops
# init rather than running at an unknown point. only top-level files run:
# directories are skipped, e.g. migrate/ ( for existing databases ). to group
# files, put them in a subdirectory and list them in a numbered file with psql's
# `\ir <dir>/<file>.sql` ( works for both this and the docker entrypoint ).
# all files are `if not exists`, so re-running is fine.
sql-name = /^\d{3}\.[^/]+\.sql$/

# same `-c <name>` convention as `./start`, so a repo holding several site
# configs can init the matching database instead of only `secret`.
cfg-name = do ->
  argv = process.argv.slice 2
  idx = argv.findIndex -> it in <[-c --config-name]>
  if idx >= 0 and argv[idx + 1] => argv[idx + 1] else \secret

secret = require path.join(root, "config/private/#cfg-name")
cfg      = required settings(secret.db.postgresql)
dbname   = cfg.database
username = cfg.user
password = cfg.password

run = (cmd) ->
  try exec-sync cmd, {stdio: \inherit}; true
  catch e => false

psql-sql = (sql, db = \postgres) ->
  f = path.join os.tmpdir!, "init-#{Date.now!}.sql"
  fs.write-file-sync f, sql
  ok = run "psql -U postgres -d #{db} -f #{f}"
  fs.unlink-sync f
  ok

psql-file = (file, db = dbname) ->
  run "psql -U postgres -d #{db} -f #{file}"

list-sql = (dir) ->
  fs.readdir-sync dir
    .filter -> /\.sql$/.test it
    .sort!
    .map -> path.join dir, it

sql-files = list-sql sql-dir
try
  # `base` is config/base itself, already listed
  if secret.base and secret.base != \base
    custom-dir = path.join root, "config/#{secret.base}/db"
    if fs.path-exists-sync custom-dir => sql-files ++= list-sql custom-dir
catch e => # skip

if (bad = sql-files.filter -> !sql-name.test path.basename(it)).length =>
  console.error "\n[init] sql files must be named `<nnn>.<name>.sql` so their order is explicit:"
  for f in bad => console.error "  #{path.relative root, f}"
  process.exit 1

console.log "\n[init] creating role #{username}..."
psql-sql """
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '#{username}') THEN
      CREATE ROLE #{username} LOGIN PASSWORD '#{password}';
    END IF;
  END
  $$;
"""

console.log "\n[init] creating database #{dbname}..."
db-exists = try
  r = exec-sync "psql -U postgres -tAc \"SELECT 1 FROM pg_database WHERE datname='#{dbname}'\"", {encoding: \utf8}
  r.trim! == \1
catch => false

unless db-exists
  psql-sql "CREATE DATABASE #{dbname} OWNER #{username};"

for f in sql-files
  rel = path.relative root, f
  console.log "\n[init] running #{rel}..."
  psql-file f

console.log "\n[init] granting privileges..."
psql-sql (grant-sql dbname, username), dbname

console.log "\n[init] done."
