var path = require('path')
var through2 = require('through2')

ASSET_DIR = path.join(process.cwd(), 'assets')

module.exports = function(filepath, opts) {
  var data = ""

  return through2(function write (chunk, enc, callback) {
    data += chunk

    callback()
  }, function end (cb) {
    try {
      this.push(rewriteCSSUrls(data, filepath))
      cb()
    } catch (err) {
      cb(err)
    }
  })
}

function rewriteCSSUrls(css, filepath) {
  return css.replace( /url\([ ]*['"](.*?)['"][ ]*\)/g, function (match, p1) {
    if (p1.charAt(0) != '.') {  
      urlPath = p1
    } else {
      var targetFilepath = path.resolve(path.dirname(filepath), p1)
      if (targetFilepath.indexOf(ASSET_DIR) != 0) {
        throw new Error(targetFilepath+' not in '+ASSET_DIR)
      }
      urlPath = targetFilepath.slice(ASSET_DIR.length)
    }

    return "url('"+urlPath+"')"
  })
}
