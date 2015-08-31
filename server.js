require('./server/memleak/memleak')

var express = require('express')
var React = require('react')
var Router = require('react-router')
var morgan = require('morgan')

var routes = require('./components/routes')
var getRoutesInitialData = require('./util/get-routes-initial-data')
var toJSONSafe = require('./util/to-json-safe')
var assetPath = require('./server/util/asset-path')
var tags = require('./server/util/tags')
var config = require('./config.json')

// express boilerplate
var app = express()
var engines = require('consolidate')
app.engine('html', engines.hogan)
app.set('view engine', 'html')
app.set('views', __dirname + '/server/views')
app.use(morgan('combined'))
app.use(express.static('assets', {maxAge: '1 month'}))

const renderRoute = (req, res) => {
  Router.run(routes, req.url, (Handler, routerState) => {

    getRoutesInitialData(routerState)
      .then((routesInitialData) => {
        res.set('Cache-Control', 'public, max-age=10000')
        res.render('page', {
          initialDataJSON: toJSONSafe(routesInitialData),
          body: React.renderToString(<Handler />),
          assetPath,
          tags,
        })
      })
  })
}

app.get('/', renderRoute)
app.get('/story/:id', renderRoute)

const LISTEN_PORT = process.env.PORT || config.port || 3000
app.listen(LISTEN_PORT)
