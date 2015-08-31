var memwatch = require('memwatch')
var heapdump = require('heapdump')

memwatch.on('leak', function(info) {
 console.error(info)

 var file = __dirname + process.pid + '-' + Date.now() + '.heapsnapshot'

 heapdump.writeSnapshot(file, (err) => {
   if (err) console.error(err)
   else console.error('Wrote snapshot: ' + file)
  })
})
