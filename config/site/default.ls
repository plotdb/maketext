(->
  config = do
    name: \maketext
    domain: \dev.local
    scheme: \http
    debug: true
    is-production: false
    facebook:
      clientID: \<your-facebook-clientid-here>
    google:
      clientID: \<your-google-clientid-here>
  if module? => module.exports = config
)!