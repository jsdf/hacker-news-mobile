var React = require('react')
var _ = require('underscore')
var {NavBar, NavButton, TableView, TableViewCell, Title} = require('react-ratchet')

var TopStoryStore = require('../stores/top-story')
var TopStoriesView = require('./top-stories')

var App = React.createClass({
  componentDidMount() {
    TopStoryStore.on('change', this.handleUpdate)
  },
  componentWillUnmount() {
    TopStoryStore.removeListener('change', this.handleUpdate)
  },
  handleUpdate() {
    if (this.isMounted()) {
      this.forceUpdate()
    }
  },
  render() {
    return (
      <TopStoriesView
        topStories={TopStoryStore.ordered()}
      />
    )
  }
})

module.exports = App
