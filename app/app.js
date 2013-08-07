'use strict';

var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  ;

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
