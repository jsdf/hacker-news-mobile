function navigateTo(href) {
  window.location.href = href
  window.addEventListener('hashchange', (e) => window.location.href = href)
}

module.exports = navigateTo
