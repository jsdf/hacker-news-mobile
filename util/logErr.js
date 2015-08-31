function logErr(err) {
  console.error(new Date().toString(), err && err.stack || err)
}

module.exports = logErr
