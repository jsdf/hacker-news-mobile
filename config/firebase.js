var Firebase = require('firebase')
var urlJoin = require('url-join')

var BASE_URL = 'https://hacker-news.firebaseio.com/v0'

function getFirebase(...itemPath) {
  return new Firebase(urlJoin(BASE_URL, ...itemPath))
}

module.exports = getFirebase
