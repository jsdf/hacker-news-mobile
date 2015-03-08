var express = require('express')
var React = require('react')
var Router = require('react-router')

var routes = require('./components/routes')
var getRoutesInitialData = require('./components/get-routes-initial-data')
var toJSONSafe = require('./util/to-json-safe')
var assetPath = require('./server/util/asset-path')
var config = require('./config.json')

// express boilerplate
var app = express()
var engines = require('consolidate')
app.engine('html', engines.hogan)
app.set('view engine', 'html')
app.set('views', __dirname + '/server/views')
app.use(express.static('assets'))

// hacky way of preventing bad asset requests from hitting main router
app.get(/.*\.\w+$/, (req, res) => res.sendStatus(404))

app.use((req, res) => {
  Router.run(routes, req.url, (Handler, routerState) => {
    getRoutesInitialData(routerState)
      .then((routesInitialData) => {
        res.render('page', {
          initialDataJSON: toJSONSafe(routesInitialData),
          body: React.renderToString(<Handler />),
          assetPath,
        })
      })
  })
})

const LISTEN_PORT = process.env.PORT || config.port || 3000
app.listen(LISTEN_PORT, () => console.log('it lives'))
