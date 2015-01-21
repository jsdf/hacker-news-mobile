var React = require('react')
var {TableView, TableViewCell, Button} = require('react-ratchet')
var moment = require('moment')

var Story = React.createClass({
  render() {
    var {story} = this.props
    return (
      <TableViewCell href={story.url}>
        <div>
          <p>{story.position}. {story.title}</p>
          <p className="small text-muted"><span className="badge">{story.score} points</span> submitted {moment(story.time*1000).fromNow()} by {story.by}</p>
        </div>
      </TableViewCell>
    )
  }
})

module.exports = Story
