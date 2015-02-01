var React = require('react')
var {TableView, TableViewCell, Button, Badge, Icon} = require('react-ratchet')
var {CSSTransitionGroup} = require('react/addons').addons
var moment = require('moment')
var FirebaseMixin = require('reactfire')

var getFirebase = require('../config/firebase')

var Comment = React.createClass({
  mixins: [FirebaseMixin],
  getInitialState() {
    return {
      comment: null,
      open: true,
    }
  },
  componentDidMount() {
    this.bindAsObject(getFirebase('item', this.props.commentId), "comment");
  },
  handleDisclosureClick(e) {
    this.setState({open: !this.state.open})
  },
  renderBody(comment) {
    var __html = (comment.text||'').split('<p>').map((para) => `<p>${para}</p>`).join('\n')
    return (
      <div>
        <div className="comment-text" dangerouslySetInnerHTML={{__html}} />
        <CommentList commentIds={comment.kids||[]} />
      </div>
    )
  },
  render() {
    var {comment, open} = this.state
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
  renderComment(id) {
    return <Comment key={id} commentId={id} />
  },
  render() {
    return (
      <TableView className="comment-list">
        {this.props.commentIds.map(this.renderComment)}
      </TableView>
    )

  }
})

module.exports = CommentList
