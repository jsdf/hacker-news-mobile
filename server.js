var express = require('express')
var React = require('react')
var Router = require('react-router')

var routes = require('./components/routes')
var getRoutesInitialData = require('./components/get-routes-initial-data')
var toJSONSafe = require('./util/to-json-safe')

// express boilerplate
var app = express()
var engines = require('consolidate')
app.engine('html', engines.hogan)
app.set('view engine', 'html')
app.set('views', __dirname + '/server-views')
app.use(express.static('assets'))

app.use((req, res) => {
  Router.run(routes, req.url, (Handler, routerState) => {
    getRoutesInitialData(routerState)
      .then((routesInitialData) => {
        res.render('page', {
          initialDataJSON: toJSONSafe(routesInitialData),
          body: React.renderToString(<Handler />),
        })
      })
  })
})

app.listen(3000, () => console.log('it lives'))
