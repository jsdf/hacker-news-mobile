require('6to5/polyfill')
var React = require('react')
var ClientApp = require('./components/app')

document.addEventListener('DOMContentLoaded', (e) => {
  React.render(<ClientApp />, document.body)
})
