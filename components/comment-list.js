var React = require('react')
var {TableView, TableViewCell, Button, Badge, Icon} = require('react-ratchet')
var {CSSTransitionGroup} = require('react/addons').addons
var moment = require('moment')

var Comment = React.createClass({
  getInitialState() {
    return {
      open: true,
    }
  },
  handleDisclosureClick(e) {
    this.setState({open: !this.state.open})
  },
  renderBody(comment) {
    var __html = (comment.text||'').split('<p>').map((para) => `<p>${para}</p>`).join('\n')
    return (
      <div>
        <div className="comment-text" dangerouslySetInnerHTML={{__html}} />
        <CommentList comments={comment.childItems} />
      </div>
    )
  },
  render() {
    var {open} = this.state
    var {comment} = this.props
    var commentElement

    if (comment) {
      commentElement = (
        <TableViewCell className="comment">
          <p className="comment-title small" onTouchTap={this.handleDisclosureClick}>
            <Icon
              className="disclosure"
              type={`${open ? 'down' : 'right'}-nav`}
            />
            {' '}
            {moment(comment.time*1000).fromNow()} by {comment.by}
          </p>
          {open ? this.renderBody(comment) : null}
        </TableViewCell>
      )
    } else {
      commentElement = null
    }

    return (
      <CSSTransitionGroup transitionName="transition">
        {commentElement}
      </CSSTransitionGroup>
    )
  }
})

var CommentList = React.createClass({
  renderComment(comment) {
    return <Comment key={comment.id} comment={comment} />
  },
  render() {
    return (
      <TableView className="comment-list">
        {(this.props.comments||[]).map(this.renderComment)}
      </TableView>
    )

  }
})

module.exports = CommentList
