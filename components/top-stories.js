var React = require('react')
var {NavBar, NavButton, TableView, TableViewCell, Title} = require('react-ratchet')

var Story = require('./story')

var TopStoriesView = React.createClass({
  renderStory(story) {
    return <Story key={story.id} story={story} />
  },
  renderStoriesTableView() {
    var storyElements = this.props.topStories.map(this.renderStory)
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
