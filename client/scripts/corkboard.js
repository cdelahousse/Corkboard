//Main bootstrapping code
define(['backbone','config', 'utils', 'sockets', 'iobind'],
       function (Backbone, config, utils, sockets) {
  'use strict';

  return {
    init: function () {
      config.init(); //XXX
      var socket = sockets.init();

      //XXX This should not be a global, this should be passed into the collection.  //Needed for ioBind.
      window.socket = socket;
    },
    config: config
  };
});

