var urlJoin = require('url-join')
var CollectionStore = require('./collection')
var fetch = require('../util/fetch')
var config = require('../util/config')

const API_PATH = urlJoin(config.apiHost, '/item')

class StoryStore extends CollectionStore {
  static url() { return API_PATH }
}

module.exports = new StoryStore