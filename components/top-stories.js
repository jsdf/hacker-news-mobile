var React = require('react')
var _ = require('underscore')
var {TableView, TableViewCell} = require('react-ratchet')
var {NavBar, NavButton, Title} = require('react-ratchet')

var TopStory = require('../stores/top-story')
var StoryListItem = require('./story-list-item')
var StoreWatchMixin = require('./store-watch-mixin')

var TopStoriesView = React.createClass({
  statics: {
    getStoresInitialData() {
      return {
        TopStory: TopStory.fetch().then(() => TopStory.toJSON()),
      }
    },
  },
  mixins: [
    StoreWatchMixin,
  ],
  componentDidMount() {
    var topStories = this.getTopStories()
    if (!(topStories && topStories.length)) this.loadTopStories()
  },
  getStoreWatches() {
    this.watchStore(TopStory)
  },
  loadTopStories() {
    return TopStory.fetch()
  },
  getTopStories() {
    return TopStory.ordered()
  },
  renderStory(story) {
    return <StoryListItem key={story.id} story={story} onGotoComments={this.props.onGotoComments} />
  },
  renderStoriesTableView() {
    var topStories = this.getTopStories()
    if (!(topStories && topStories.length)) {
      return (
        <div>
          Loading top stories...
        </div>
      )
    }
    var storyElements = topStories.map(this.renderStory)
    return  <TableView children={storyElements} />
  },
  render() {
    return (
      <div className={this.props.className}>
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
