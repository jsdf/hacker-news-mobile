#!/usr/bin/env node

var crypto = require('crypto')
var path = require('path')
var fs = require('fs')

function hash(input, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(input, 'utf8')
    .digest(encoding || 'hex')
}

var assetMap = {}
var assetMapFileDir = null
process.argv.slice(2).forEach(function(filearg) {
  var file = path.relative(process.cwd(), filearg)
  var fileDir = path.dirname(file)
  if (!assetMapFileDir) assetMapFileDir = fileDir

  var fileContents = fs.readFileSync(file)
  var digest = hash(fileContents)
  var ext = path.extname(file)
  assetMap[file] = path.join(fileDir, path.basename(file, ext)+'-'+digest.slice(0, 8)+ext)
  fs.writeFileSync(assetMap[file], fileContents)
})

fs.writeFileSync(path.join(assetMapFileDir, 'assets.json'), JSON.stringify(assetMap, null, 2))
