var _ = require('underscore')
var {EventEmitter} = require('events')

var getFirebase = require('../config/firebase')
var bind = require('../util/bind')

class FirebaseStore extends EventEmitter {
  constructor(itemPath) {
    this.handleItemUpdate = bind(this.handleItemUpdate, this)

    this.itemPath = itemPath
    this.items = {}
    this.itemFirebases = {}
  }
  reset(items) {
    this.items = items
    _.each(items, (item) => this.addItem(item.id))
  }
  handleItemUpdate(dataSnapshot) {
    var item = dataSnapshot.val()
    if (!(item && item.id != null)) return 
    this.items[item.id] = item
    this.emit('change')
  }
  addItem(itemId) {
    if (this.itemFirebases[itemId]) return

    var itemFirebase = getFirebase(this.itemPath, itemId)
    itemFirebase.on('value', this.handleItemUpdate)
    this.itemFirebases[itemId] = itemFirebase
    this.emit('change')
  }
  removeItem(itemId) {
    if (!this.itemFirebases[itemId]) return
    
    var itemFirebase = this.itemFirebases[itemId]
    itemFirebase.off('value', this.handleItemUpdate)
    delete this.itemFirebases[itemId]
    delete this.items[itemId]
    this.emit('change')
  }
  get(id) {
    return this.items[id]
  }
  all() {
    return _.values(this.items)
  }
  toJSON() {
    return this.items
  }
}

module.exports = FirebaseStore
