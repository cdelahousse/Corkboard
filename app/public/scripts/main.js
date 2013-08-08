require.config({
  baseUrl: '/scripts/',
  paths: {
    jquery: '../bower_components/jquery/jquery.min',
    require : '../bower_components/requirejs/require', // Minify?
    underscore: '../bower_components/underscore/underscore-min',
    Backbone: '../bower_components/backbone/backbone-min',
    text : '../bower_components/requirejs-text/text',
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

require(['utils'], function (utils) {
  'use strict';
  utils.log('Bootstrapping...');
});
