var React = require('react')
var _ = require('underscore')
var {TableView, TableViewCell} = require('react-ratchet')
var {NavBar, NavButton, Title} = require('react-ratchet')

var TopStory = require('../stores/top-story')
var StoryListItem = require('./story-list-item')
var StoreWatchMixin = require('./store-watch-mixin')

var TopStoriesView = React.createClass({
  mixins: [StoreWatchMixin],
  getStoreWatches() {
    this.watchStore(TopStory)
  },
  renderStory(story) {
    return <StoryListItem key={story.id} story={story} onGotoComments={this.props.onGotoComments} />
  },
  renderStoriesTableView() {
    var storyElements = TopStory.ordered().map(this.renderStory)
    return  <TableView children={storyElements} />
  },
  render() {
    return (
      <div>
        <NavBar>
          <Title>Hacker News Mobile - Top Stories</Title>
        </NavBar>
        <div className="content">
          {this.renderStoriesTableView()}
        </div>
      </div>
    )   
  }
})

module.exports = TopStoriesView
