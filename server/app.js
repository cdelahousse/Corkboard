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

app.get('/api', function (req, res ) {
  res.send('API works');
});

app.post('/api/notes', function (req, res) {
  var note = new NoteModel({
    type : req.body.type,
    data : req.body.data,
    state : req.body.state
  });

  note.save(function (err) {
    console.log('craeting new note'); //XXX
    console.log(err); //XXX
  });

  return res.send(note);
});


//XXX Gross, do not use MongoID
app.get( '/api/notes/:id', function( req, res ) {

  console.log('returning note', req.params.id); //XXX
  return NoteModel.findById(req.params.id, function (err, note) {
    if (err) return err; //XXX
    return res.send(note);
  });

});

app.put( '/api/notes/:id', function( req, res ) {
  console.log('updating note', req.params.id); //XXX
  return NoteModel.findById(req.params.id, function (err, note) {
    if (err) return err; //XXX
    note.data = req.body.data;
    note.state = req.body.state;
    note.save(function(err) {
      if (err) return console.log(err);
      return res.send(note);
    });

  });
});

app.delete( '/api/notes/:id', function( req, res ) {
  console.log('deleting note', req.params.id); //XXX
  return NoteModel.findById(req.params.id, function (err, note) {
    if (err) return err; //XXX
    return note.remove(function (err) {
      if (err) return err; //XXX
      return res.send( '' );
    });
  });
});

app.get('/api/notes', function (req, res) {
  return NoteModel.find(function (err, notes) {
    if (err) return err; //XXX
    console.log('returning notes'); //XXX
    return res.send(notes);
  });
});

