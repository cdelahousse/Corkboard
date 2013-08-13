require.config({
  baseUrl: '/scripts/',
  paths: {
    jquery: '../bower_components/jquery/jquery.min',
    require : '../bower_components/requirejs/require', // Minify?
    underscore: '../bower_components/underscore/underscore-min',
    backbone: '../bower_components/backbone/backbone-min',
    text : '../bower_components/requirejs-text/text',
    socketio : '../bower_components/socket.io-client/dist/socket.io.min',
    gest : '../bower_components/gest/gest',
    templates: '../templates'
  },
  shim: {
    underscore: { exports: '_' },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    gest : { exports : "Gest" },
    socketio : { exports : "io" }
  }
});

require(['views/core/App', 'collections/Notes', 'config', 'utils',
    'sockets', 'gest'], function (AppView, Notes, config, utils, sockets) {
  'use strict';

  utils.log('Initializing ...');

  config.init();
  var socket = sockets.init(config.url);

  var notes = new Notes({
    url : config.apiUrl,
    socket : socket
  });

  // notes.fetch();

  new AppView({
    el : '#app',
    collection : notes
  });
});
