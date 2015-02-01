var React = require('react')
var {RouteHandler} = require('react-router')
var {CSSTransitionGroup} = require('react/addons').addons
var {State} = require('react-router')

var App = React.createClass({
  mixins: [
    State,
  ],
  render() {
    return (
      <RouteHandler ref="handler" key={this.getPathname()} />
    )
  }
})

module.exports = App
