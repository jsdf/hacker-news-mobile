var path = require('path')
var _ = require('underscore')

try {
  var originalAssetMap = require(path.join(process.cwd(), 'assets/build/assets.json'))
  // remove 'assets/' from path
  var stripPrefix = (p) => p.replace(/^assets\//, '')
  var assetMap = _.reduce(originalAssetMap, (map, value, key) => {
    map[stripPrefix(key)] = stripPrefix(value)
    return map
  }, {})

  module.exports = (asset) => '/'+assetMap[asset]
} catch (e) {
  module.exports = (asset) => '/'+asset
}