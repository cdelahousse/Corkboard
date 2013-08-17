
define(['backbone', 'models/Note'], function (Backbone, Note) {
  'use strict';

  var Notes = Backbone.Collection.extend({
    model : Note,
    initialize : function () {
      this.ioBind('create', this.add,  this);
    },
  });

  return Notes;
});
