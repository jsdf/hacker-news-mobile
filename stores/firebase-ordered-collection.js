var _ = require('underscore')

var getFirebase = require('../config/firebase')
var bind = require('../util/bind')
var FirebaseStore = require('./firebase')

class FirebaseOrderedCollectionStore extends FirebaseStore {
  constructor(orderPath, itemPath) {
    this.handleOrderUpdate = bind(this.handleOrderUpdate, this)
    this.cleanupItems = false

    super(itemPath)

    this.orderPath = orderPath || itemPath
    this.orderIds = []
    this.orderFirebase = getFirebase(this.orderPath)
    this.orderFirebase.on('value', this.handleOrderUpdate)
  }
  reset({items, orderIds}) {
    super(items)
    this.orderIds = orderIds
    orderIds.forEach((orderId) => this.addItem(orderId))
  }
  handleOrderUpdate(dataSnapshot) {
    var currentOrderIds = dataSnapshot.val()
    var addedOrderIds = _.difference(currentOrderIds, this.orderIds)
    var removedOrderIds = _.difference(this.orderIds, currentOrderIds)

    addedOrderIds.forEach((itemId) => this.addItem(itemId))
    if (this.cleanupItems) {
      removedOrderIds.forEach((itemId) => this.removeItem(itemId))
    }

    this.orderIds = currentOrderIds
    this.emit('change')
  }
  getCurrentIds() {
    return this.orderIds
  }
  ordered() {
    return this.orderIds.reduce((orderedItems, itemId, index) => {
      var item = this.get(itemId)
      if (item) {
        orderedItems.push(Object.assign({position: index+1}, item))
      }
      return orderedItems
    }, [])
  }
  toJSON() {
    return {
      items: this.items,
      orderIds: this.orderIds,
    }
  }
}

module.exports = FirebaseOrderedCollectionStore
