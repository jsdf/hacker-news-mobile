var fs = require('fs')
var path = require('path')

// loads analytics tags partial, if present in views directory
try {
  module.exports = fs.readFileSync(path.resolve(__dirname, '../views/tags.html'), {encoding: 'utf8'})
} catch (e) {
  module.exports = ''
}
