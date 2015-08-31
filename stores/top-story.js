var _ = require('underscore')
var urlJoin = require('url-join')
var CollectionStore = require('./collection')
var fetch = require('../util/fetch')
var config = require('../config.json')
var logErr = require('../util/logErr')

const API_PATH = urlJoin(config.apiHost, '/')

class TopStoryStore extends CollectionStore {
  static url() { return API_PATH }
  static fetch() {
    return fetch(this.url())
      .then(response => response.json())
      .catch(logErr)
  }
  fetch() {
    return this.constructor.fetch()
      .then((items) => {
        this.reset(items)
        this.emitChange()
        return items
      })
  }
  ordered() {
    return _.sortBy(this.all(), 'position')
  }
}

module.exports = new TopStoryStore
