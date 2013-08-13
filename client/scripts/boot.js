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
    'socketio', 'gest'], function (AppView, Notes, config, utils, io) {
  'use strict';

  utils.log('Initializing ...');

  var socket = io.connect(config.url);
  socket.on('connect', function (socket) {
    utils.log('Socket.io connected');
  });

  var notes = new Notes();

  // notes.fetch();

  new AppView({
    el : '#app',
    collection : notes
  });
});
