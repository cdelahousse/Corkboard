// Model for generic Note
define(['backbone'], function (Backbone) {
  'use strict';

  var Note = Backbone.Model.extend({
    defaults : {
      type : 'text',
      state : { },
      data : ''
    },
    idAttribute : '_id' //XXX Refactor Mongo Id is bad

  });

  return Note;
});
