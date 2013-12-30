//Main bootstrapping code
define(['backbone','Router', 'collections/Notes', 'config', 'utils',
    'sockets','iobind'], function (Backbone, Router, Notes, config,
      utils, sockets) {
  'use strict';

  return {
    init: function () {
      config.init();
      var socket = sockets.init();

      //XXX This should not be a global, this should be passed into the collection.
      //Needed for ioBind.
      window.socket = socket;

      var notes = new Notes([],{
        url : config.apiUrl,
      });

      new Router({collection : notes});
      Backbone.history.start();

      notes.fetch();
    }
  }
});

