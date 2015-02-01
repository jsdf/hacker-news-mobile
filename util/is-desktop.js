function isDesktop() {
  return !(typeof window != 'undefined' && 'ontouchstart' in window)
}

module.exports = isDesktop
