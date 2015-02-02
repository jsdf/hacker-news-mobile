var _ = require('underscore')
var {EventEmitter} = require('events')

var getFirebase = require('../config/firebase')
var bind = require('../util/bind')

var BATCH_INTERVAL = 50

class FirebaseStore extends EventEmitter {
  constructor(itemPath) {
    this.emitChange = _.debounce(() => this.emit('change'), BATCH_INTERVAL)
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
    this.emitChange()
  }
  addItem(itemId) {
    if (this.itemFirebases[itemId]) return

    var itemFirebase = getFirebase(this.itemPath, itemId)
    itemFirebase.on('value', this.handleItemUpdate)
    this.itemFirebases[itemId] = itemFirebase
    this.emitChange()
  }
  removeItem(itemId) {
    if (!this.itemFirebases[itemId]) return
    
    var itemFirebase = this.itemFirebases[itemId]
    itemFirebase.off('value', this.handleItemUpdate)
    delete this.itemFirebases[itemId]
    delete this.items[itemId]
    this.emitChange()
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
