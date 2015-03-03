function toJSONSafe(obj) {
  return JSON.stringify(obj).replace('</', '<\\/')
}

module.exports = toJSONSafe
