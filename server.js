var fs = require('fs')
var express = require('express')
var _ = require('underscore')
var React = require('react')
var Router = require('react-router')

var TopStory = require('./stores/top-story')
var routes = require('./components/routes')
var toJSONSafe = require('./util/to-json-safe')

var app = express()

var engines = require('consolidate')
app.engine('html', engines.hogan)
app.set('view engine', 'html')
app.set('views', __dirname + '/server-views')

app.use(express.static('assets', {maxAge: '1 month'}))

// hacky way of preventing bad asset requests from hitting main router
app.get(/.*\.\w+$/, function(req, res) {
  res.sendStatus(404)
})

app.use(function (req, res) {
  Router.run(routes, req.url, (Handler) => {
    var initialData = toJSONSafe({topStories: TopStory.toJSON()})
    var body = React.renderToString(<Handler />)
    res.render('index', {body, initialData})
  })
})

var server = app.listen(process.env.PORT || 3000, () => {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
})
