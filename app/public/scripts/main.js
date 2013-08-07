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

require(['helpers'], function (helpers) {
  'use strict';
  helpers.log('Bootstrapping...');
});
