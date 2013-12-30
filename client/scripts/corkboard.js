//Main bootstrapping code
define(['backbone', 'collections/Notes', 'config', 'utils', 'sockets', 'core/App', 'iobind'],
       function (Backbone, Notes, config, utils, sockets, AppView) {
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

      new AppView({
        el : config.appElement,
        collection : notes
      });

      notes.fetch();
    }
  };
});

