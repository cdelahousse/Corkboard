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

function error(msg) {
  console.log(msg);
}
var crud = require('./crud.js');

io.sockets.on('connection', function (socket) {

  console.log('New Connection');
  socket.on('notes:read', function (notes, next) {
    crud.read(null,function (err, data) {
      if (err) { return error(err); } //XXX
      next(null,data);
    });
  });

  socket.on('notes:update', function (note, next) {
    crud.update(note, function(err, data) {
      if (err) { return error(err); } //XXX
      var namespace = 'notes/' + note._id + ':update';
      socket.emit( namespace, data);
      socket.broadcast.emit( namespace, data);
      next(null, data);
    });
  });
  socket.on('notes:create', function (data, next) {
    crud.create(data, function (err, note) {
      if (err) { return error(err); } //XXX
      var namespace = 'notes:create';
      console.log(namespace);
      socket.emit( namespace, note);
      socket.broadcast.emit( namespace, note);
      next(null, note);
    });
  });

  //BUG: Deletes, even if not in DB
  socket.on('notes:delete', function (data, next) {
    crud.del(data, function (err) {
      if (err) { return error(err); } //XXX
      var namespace = 'notes/' + data._id + ':delete';
      socket.emit( namespace, data);
      socket.broadcast.emit( namespace, data);
      next(null, data);
    });

  });
});


