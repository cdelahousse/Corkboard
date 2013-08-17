// Model for generic Note
define(['backbone', 'config'], function (Backbone, config) {
  'use strict';

  var Note = Backbone.Model.extend({
    defaults : {
      type : 'text',
      state : { },
      data : ''
    },
    idAttribute : '_id', //XXX Refactor Mongo Id is bad
    initialize : function () {
      this.ioBind('update', this.set, this);
      this.ioBind('delete', function() {
        this.ioUnbindAll();
        this.destroy();
      }, this);
    },
    urlRoot : config.apiUrl//XXX This should be inherited from the collection
  });

  return Note;
});
