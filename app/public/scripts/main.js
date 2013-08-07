require.config({
  baseUrl: '/scripts/',
  paths: {
    jquery: '../bower_components/jquery/jquery.min',
    underscore: '../bower_components/underscore/underscore-min',
    Backbone: '../bower_components/backbone/backbone-min',
    templates: '../templates'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    Backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    }
  }
});

require(['app', 'jquery'], function (app, $) {
  'use strict';
  // use app here
  console.log(app);
  console.log('Running jQuery %s', $().jquery);
});
