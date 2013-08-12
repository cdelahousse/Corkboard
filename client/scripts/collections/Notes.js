
define(['backbone', 'models/Note', 'config'], function (Backbone, Note, config) {
  'use strict';

  var Notes = Backbone.Collection.extend({
    url : config.apiUrl,
    model : Note
  });

  return Notes;
});
