var _ = require('underscore')
var {EventEmitter} = require('events')

var getFirebase = require('../util/firebase')
var bind = require('../util/bind')

class TopStoryStore extends EventEmitter {
  constructor() {
    this.handleCollectionUpdate = bind(this.handleCollectionUpdate, this)
    this.handleItemUpdate = bind(this.handleItemUpdate, this)

    this.itemPath = '/item'
    this.itemIds = []
    this.items = {}
    this.itemFirebases = {}

    this.collectionPath = '/topstories'
    this.collectionFirebase = getFirebase(this.collectionPath)
    this.collectionFirebase.on('value', this.handleCollectionUpdate)
  }
  handleCollectionUpdate(dataSnapshot) {
    var currentItemIds = dataSnapshot.val()
    var addedItemIds = _.difference(currentItemIds, this.itemIds)
    var removedItemIds = _.difference(this.itemIds, currentItemIds)

    addedItemIds.forEach((itemId) => {
      var itemFirebase = getFirebase(this.itemPath, itemId)
      itemFirebase.on('value', this.handleItemUpdate)
      this.itemFirebases[itemId] = itemFirebase
    })

    removedItemIds.forEach((itemId) => {
      var itemFirebase = this.itemFirebases[itemId]
      itemFirebase.off('value', this.handleItemUpdate)
      delete this.itemFirebases[itemId]
      delete this.items[itemId]
    })

    this.itemIds = currentItemIds

    if (removedItemIds.length) {
      this.emit('change')
    }
  }
  handleItemUpdate(dataSnapshot) {
    var item = dataSnapshot.val()
    this.items[item.id] = item
    this.emit('change')
  }
  getCurrentIds() {
    return this.itemIds
  }
  get(id) {
    return this.items[id]
  }
  all() {
    return _.values(this.items)
  }
  ordered() {
    return this.itemIds.reduce((orderedItems, itemId, index) => {
      var item = this.get(itemId)
      if (item) {
        orderedItems.push(Object.assign({position: index+1}, item))
      }
      return orderedItems
    }, [])
  }
}

module.exports = new TopStoryStore
