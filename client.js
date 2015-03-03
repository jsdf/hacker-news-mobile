require('babel/polyfill')
var React = require('react')
var Router = require('react-router')
var injectTapEventPlugin = require('react-tap-event-plugin')
var FingerBlast = require('fingerblast/dist/fingerblast.umd')

var isDesktop = require('./util/is-desktop')
var routes = require('./components/routes')
var stores = {
  TopStory: require('./stores/top-story'),
  Story: require('./stores/story'),
}

React.initializeTouchEvents(true)
injectTapEventPlugin()

document.addEventListener('DOMContentLoaded', (e) => {
  if (isDesktop()) {
    new FingerBlast(document.body) // simulate touch events from mouse
  }

  // bootstrap stores with initial data
  if (window.HackerNewsInitialData) {
    var initialData = window.HackerNewsInitialData
    Object.keys(initialData).forEach((storeName) => {
      if (stores[storeName]) {
        stores[storeName].reset(initialData[storeName])
      } else {
        console.warn('unknown store '+storeName)
      }
    })
  }

  Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler />, document.body)
  })
})
