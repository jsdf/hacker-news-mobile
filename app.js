var React = require('react')
var ReactFireMixin = require('reactfire')
var {NavBar, NavButton, TableView, TableViewCell, Title} = require('react-ratchet')
var moment = require('moment')

var BASE_URL = 'https://hacker-news.firebaseio.com/v0'

var Item = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState() {
    return {
      item: {}
    }
  },
  componentWillMount() {
    var {itemId} = this.props
    this.bindAsObject(new Firebase(BASE_URL+'/item/'+itemId), 'item')
  },
  render() {
    var {item} = this.state
    return (
      <TableViewCell navigateRight href={item.url}>
        <div>
          <p>{item.title}</p>
          <p className="small text-muted">{moment(item.time*1000).fromNow()}</p>
        </div>
        <span className="badge">{item.score}</span>
      </TableViewCell>
    )
  }
})

var App = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState() {
    return {
      items: []
    }
  },
  componentWillMount() {
    this.bindAsArray(new Firebase(BASE_URL+'/topstories'), 'items')
  },
  renderItem(itemId) {
    return <Item itemId={itemId} />
  },
  renderItemsTableView() {
    var tableItems = this.state.items.map(this.renderItem)
    return  <TableView children={tableItems} />
  },
  render() {
    return (
      <div>
        <NavBar>
          <Title>Hacker News Mobile</Title>
        </NavBar>
        <div className="content">
          {this.renderItemsTableView()}
        </div>
      </div>
    )
  }
})

module.exports = App
