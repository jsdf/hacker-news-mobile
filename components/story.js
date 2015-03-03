var React = require('react')
var {TableView, TableViewCell, Button, Badge, Icon} = require('react-ratchet')
var {NavBar, NavButton, Title} = require('react-ratchet')
var moment = require('moment')
var {Navigation, State} = require('react-router')

var Story = require('../stores/story')
var StoreWatchMixin = require('./store-watch-mixin')
var CommentList = require('./comment-list')
var isDesktop = require('../util/is-desktop')
var navigateTo = require('../util/navigate-to')

var StoryView = React.createClass({
  statics: {
    getStoresInitialData(params) {
      return {
        Story: Story.fetch(params.id).then(() => [Story.get(params.id)]),
      }
    },
  },
  mixins: [
    StoreWatchMixin,
    Navigation,
    State,
  ],
  componentDidMount() {
    if (!this.getStory()) this.loadStory()
  },
  getStoreWatches() {
    this.watchStore(Story)
  },
  loadStory() {
    return Story.fetch(this.getParams().id)
  },
  getStory() {
    return Story.get(this.getParams().id)
  },
  getBackRoute() {
    return ['/']
  },
  handleBackTouchEnd(e) {
    e.stopPropagation()
    this.transitionTo(...this.getBackRoute())
  },
  renderViewArticleLink(story) {
    if (!story) return

    var handleTouchTap = isDesktop() && (e) => navigateTo(story.url)
    return (
      <NavButton right href={story.url} onTouchTap={handleTouchTap}>
        Article
      </NavButton>
    )
  },
  renderBackButton() {
    return (
      <NavButton left onTouchTap={this.handleBackTouchEnd} href={this.makeHref(...this.getBackRoute())}>
        Stories
      </NavButton>
    )
  },
  renderComments(story) {
    return <CommentList comments={story.childItems} />
  },
  render() {
    var story = this.getStory()
    
    var content
    if (story) {
      content = (
        <div>
          <div className="content-padded">
            <h3 className="story-title"><a href={story.url}>{story.title}</a></h3>
            <p>
              <Badge>{story.score} points</Badge>
              <span className="small text-muted"> submitted {moment(story.time*1000).fromNow()} by {story.by}</span>
            </p>
          </div>
          <div className="content-padded">
            <h4>Comments</h4>
          </div>
          <div className="story-comments">{this.renderComments(story)}</div>
        </div>
      )
    } else {
      content = <div className="content-padded">Loading story...</div>
    }

    return (
      <div className={this.props.className}>
        <NavBar>
          {this.renderBackButton()}
          <div className="title-wrapper"><Title>{story && story.title}</Title></div>
          {this.renderViewArticleLink(story)}
        </NavBar>
        <div className="content">
          <div className="story">{content}</div>
        </div>
      </div>
    )
  }
})

module.exports = StoryView
