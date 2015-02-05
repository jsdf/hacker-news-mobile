var React = require('react')
var {TableView, TableViewCell, Button, Badge, Icon} = require('react-ratchet')
var moment = require('moment')
var {Navigation} = require('react-router')

var isDesktop = require('../util/is-desktop')
var navigateTo = require('../util/navigate-to')

var StoryListItem = React.createClass({
  mixins: [Navigation],
  getGotoCommentsRoute() {
    return ['story', {id: this.props.story.id}]
  },
  handleGotoCommentsTouchTap(e) {
    e.stopPropagation()
    e.preventDefault()
    this.transitionTo(...this.getGotoCommentsRoute())
  },
  render() {
    var {story} = this.props
    var handleArticleTouchTap = isDesktop() && (e) => navigateTo(story.url)

    return (
      <TableViewCell className="story-list-item">
        <div className="story-list-item-description-column">
          <a className="story-list-item-description" href={story.url} onTouchTap={handleArticleTouchTap}>
            <h3>{story.position}. {story.title}</h3>
            <p>
              <Badge>{story.score} points</Badge>
              {' '}
              <span className="story-list-item-meta small text-muted">
                submitted {moment(story.time*1000).fromNow()} by {story.by}
              </span>
            </p>
          </a>
        </div>
        <div className="story-list-item-comments-column">
          <Button
            onTouchTap={this.handleGotoCommentsTouchTap}
            href={this.makeHref(...this.getGotoCommentsRoute())}
            rStyle="primary"
            className="story-list-item-comments"
            outlined
          >
            comments <Icon right />
          </Button>
        </div>
      </TableViewCell>
    )
  }
})

module.exports = StoryListItem
