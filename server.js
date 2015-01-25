var fs = require('fs')
var express = require('express')
var React = require('react')
var _ = require('underscore')

var ClientApp = require('./components/app')

var config = {}
try { config = require('./config.json') } catch (e) {}

var html = fs.readFileSync(__dirname+'/index.html', {encoding: 'utf8'})
var renderPage = _.template(html, {variable: 'data'})

var app = express()

app.use(express.static('assets'))

app.get('/', function (req, res) {
  var body = React.renderToStaticMarkup(<ClientApp />)
  res.send(renderPage({body}))
})

var server = app.listen(process.env.PORT || config.port || 3000, () => {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
})
