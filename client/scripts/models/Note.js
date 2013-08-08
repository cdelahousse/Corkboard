// Model for generic Note
define(['backbone'], function (Backbone) {
  'use strict';

  var Note = Backbone.Model.extend({
    defaults : {
      type : 'text',
      state : { },
      data : 'Nadda'
    }
  });

  return Note;
});
