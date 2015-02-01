var bind = require('./bind')

function autobind(instance) {
  for (var key in instance) {
    instance[key] = bind(instance[key], instance)
  }
}

module.exports = autobind
