var fs = require('fs')
var browserifyAssets = require('browserify-assets')

var buildDir = __dirname+'/assets/build'

var opts = {cacheFile: buildDir+'/cache.json'}

var b = browserifyAssets(opts)
b.on('log', function(msg){ console.log(msg) })
b.on('update', function(updated) { console.log('changed files:\n'+updated.join('\n')) })
b.transform(require('6to5ify'))
b.add('./client')

b.on('assetStream', function(assetStream) {
  assetStream.pipe(fs.createWriteStream(buildDir+'/bundle.css'))
})
b.bundle().pipe(fs.createWriteStream(buildDir+'/bundle.js'))

