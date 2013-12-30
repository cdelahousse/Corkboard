require.config({
  baseUrl: '/scripts/',
  paths: {
    jquery: '../bower_components/jquery/jquery.min',
    require : '../bower_components/requirejs/require', // Minify?
    underscore: '../bower_components/underscore/underscore-min',
    backbone: '../bower_components/backbone/backbone-min',
    text : '../bower_components/requirejs-text/text',
    iosync : '../bower_components/backbone.iobind/dist/backbone.iosync.min',
    iobind : '../bower_components/backbone.iobind/dist/backbone.iobind.min',
    socketio : '../bower_components/socket.io-client/dist/socket.io.min',
    gest : '../bower_components/gest/gest',
    templates: '../templates'
  },
  shim: {
    underscore: { exports: '_' },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    iobind : {
      deps : ['backbone', 'jquery', 'iosync', 'socketio']
    },
    iosync : {
      deps : ['backbone', 'jquery', 'socketio']
    },
    gest : { exports : "Gest" },
    socketio : { exports : "io" }
  }
});

