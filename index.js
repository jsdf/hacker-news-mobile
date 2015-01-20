require("6to5/polyfill")
var React = require('react')
var App = require('./app')

document.addEventListener('DOMContentLoaded', (e) => {
  React.render(<App />, document.body)
})
