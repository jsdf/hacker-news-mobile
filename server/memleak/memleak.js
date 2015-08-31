var memwatch = require('memwatch')
var heapdump = require('heapdump')
var logErr = require('../../util/logErr')

memwatch.on('leak', function(leakInfo) {
 logErr(leakInfo)

 var snapshotFilepath = __dirname + process.pid + '-' + Date.now() + '.heapsnapshot'

 heapdump.writeSnapshot(snapshotFilepath, (err) => {
   if (err) logErr(err)
   else logErr('Wrote snapshot: ' + snapshotFilepath)
  })
})
