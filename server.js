var fs = require('fs')
var express = require('express')
var _ = require('underscore')
var React = require('react')
var Router = require('react-router')

var TopStory = require('./stores/top-story')
var routes = require('./components/routes')

var config = {}
try { config = require('./config.json') } catch (e) {}

var html = fs.readFileSync(__dirname+'/index.html', {encoding: 'utf8'})
var renderPage = _.template(html, {variable: 'data'})

var app = express()

app.use(express.static('assets'))

// hacky way of preventing bad asset requests from hitting main router
app.get(/.*\.\w+$/, function(req, res) {
  res.sendStatus(404)
})

app.use(function (req, res) {
  Router.run(routes, req.url, (Handler) => {
    var body = React.renderToString(<Handler />)
    res.send(renderPage({body, topStories: TopStory.toJSON()}))
  })
})

var server = app.listen(process.env.PORT || config.port || 3000, () => {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
})
