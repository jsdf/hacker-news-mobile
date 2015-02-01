var React = require('react')
var Router = require('react-router')
var {Route, DefaultRoute, Link, RouteHandler} = Router

var App = require('./app')
var TopStoriesView = require('./top-stories')
var StoryView = require('./story')

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={TopStoriesView} />
    <Route name="story" path="/story/:id" handler={StoryView}  />
  </Route>
)

module.exports = routes
