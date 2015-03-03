var {map} = require('bluebird').Promise

function getRoutesInitialData(routerState) {
  var routesInitialDataPromises = routerState.routes.reduce((storesInitialData, route) => {
    if (route.handler && route.handler.getStoresInitialData) {
      var routeInitialData = route.handler.getStoresInitialData(routerState.params, routerState.query)

      Object.keys(routeInitialData).forEach((storeName) => {
        if (storesInitialData[storeName]) throw new Error('store intitial data already populated')
        storesInitialData[storeName] = routeInitialData[storeName]
      })
    }
    return storesInitialData
  }, {})

  var routesInitialData = {}
  return map(Object.keys(routesInitialDataPromises), (storeName) => {
    return routesInitialDataPromises[storeName].then(storeInitialData => {
      routesInitialData[storeName] = storeInitialData
    })
  })
    .then((intitialDatas) => routesInitialData)
}

module.exports = getRoutesInitialData
