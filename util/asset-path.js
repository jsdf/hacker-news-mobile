var _ = require('underscore')

try {
  // remove 'assets/' from path
  var stripPrefix = (p) => p.replace(/^assets\//, '')
  var assetMap = _.reduce(require('../assets/build/assets.json'), (map, value, key) => {
    map[stripPrefix(key)] = stripPrefix(value)
    return map
  }, {})

  module.exports = () => (text) => '/'+assetMap[text]
} catch (e) {
  module.exports = () => (text) => '/'+text
}