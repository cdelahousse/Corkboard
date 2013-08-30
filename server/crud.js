//All Create, Read, Update, and Delete operations
"use strict";

var mongoose = require('mongoose');
var dbUrl = require('./config').dbUrl;
mongoose.connect(dbUrl);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Database connection made');
});

var Schema = mongoose.Schema;
var NoteSchema = new Schema({ 
  title : String,
  type : String,
  meta : Schema.Types.Mixed,
  layouts : Schema.Types.Mixed,
  data :  Schema.Types.Mixed
});

var NoteModel = mongoose.model('Note', NoteSchema);

function create(options, next) {
  NoteModel.create( {
    //XXX Refactor
    title : options.title,
    type : options.type,
    layouts : options.layouts,
    data : options.data,
    meta : options.meta
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
      note.title = options.title;
      note.layouts = options.layouts;
      note.data = options.data;
      note.meta = options.meta;
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
