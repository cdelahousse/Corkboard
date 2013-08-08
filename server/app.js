'use strict';

var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , config = require('./config') // Configuation constants
  ;

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', config.pathServer + '/views');
app.use(express.favicon(config.pathClient + '/favicon.ico'));
app.use(express.logger('tiny'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(config.pathClient));


if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
