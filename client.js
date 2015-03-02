require('babel/polyfill')
var React = require('react')
var Router = require('react-router')
var injectTapEventPlugin = require('react-tap-event-plugin')
var FingerBlast = require('fingerblast/dist/fingerblast.umd')

var routes = require('./components/routes')
var TopStory = require('./stores/top-story')
var isDesktop = require('./util/is-desktop')

React.initializeTouchEvents(true)
injectTapEventPlugin()

document.addEventListener('DOMContentLoaded', (e) => {
  if (isDesktop()) {
    new FingerBlast(document.body) // simulate touch events from mouse
  }

  if (window.HackerNews && window.HackerNews.topStories) {
    TopStory.reset(window.HackerNews.topStories)
  }
  
  Router.run(routes, Router.HistoryLocation, (Handler) => {
    React.render(<Handler />, document.body)
  })
})
