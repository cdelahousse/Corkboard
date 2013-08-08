
define(['backbone', 'models/Note'], function (Backbone, Note) {
  'use strict';

  var Notes = Backbone.Collection.extend({
    model : Note
  });

  return Notes;
});
