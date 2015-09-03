var config = require('../config.json')

module.exports = Object.assign({}, config, {
  apiHost: 'https://'+config.apiHost, // TODO: something less hacky than this
})
