//All Create, Read, Update, and Delete operations
"use strict";

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); //XXX

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

function create(options, next) {
  NoteModel.create( {
    //XXX Refactor
    type : options.type,
    data : options.data,
    state : options.state
  }, function (err, note) {
    next(err, note);
  });
}

function read(options,next) {
  function cb (err,note) { return next(err,note); }
  if (options && '_id' in options) {
    NoteModel.findById(options.id, cb);
  } else {
    NoteModel.find(cb);
  }
}

function update(options, next) {
  if (options && '_id' in options) {
    NoteModel.findById(options._id, function (err, note) {
      if (err) { return  next(err); }
      //XXX This stuff should be refactored
      note.data = options.data;
      note.state = options.state;
      note.save(function(err) {
        if (err) { return next(err); }
        return next(null, note);
      });
    });
  } else {
    return next("Update DB error");
  }
}

function del(options, next) {
  if (options && '_id' in options) {
    NoteModel.findById(options._id, function (err, note) {
      if (err) { return  next(err); }
      note && note.remove(function (err) {
        if (err) { return  next(err); }
        return next(); 
      });
    });
  }
}

module.exports = {
  del : del,
  update : update,
  read : read,
  create : create
};
