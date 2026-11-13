require! <[@plotdb/block jsdom]>

# for @plotdb/block in node context. `url` gives the window a real origin: without it
# localStorage throws SecurityError, e.g. when bundling the auth block ( @servebase/consent )
dom = new jsdom.JSDOM "<!DOCTYPE html><html><body></body></html>", {url: "http://localhost/"}
win = dom.window
block.env win

mgr = ({base}) ->
  new block.manager registry: (d) ->
    if /^https?:/.exec(d.url) => return d.url
    else if d.url => return base + "/static" + d.url
    path = d.path or if d.type == \block => \index.html
    else if d.type == \js => \index.min.js
    else \index.min.css
    return base + "/static/assets/lib/#{d.name}/#{d.version or \main}/#path"

module.exports = mgr

