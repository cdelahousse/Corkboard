'use strict';

var express = require('express')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , config = require('./config') // Configuation constants
  ;

var app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  ;

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

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function (socket) {

});


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Database connection made');
});

var Schema = mongoose.Schema;
var NoteSchema = new Schema({ 
  // id : String,
  type : String,
  state : Schema.Types.Mixed,
  data :  Schema.Types.Mixed
});

var NoteModel = mongoose.model('Note', NoteSchema);


