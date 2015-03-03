var fetch = require('node-fetch')

fetch.Promise = require('bluebird').Promise

module.exports = fetch
