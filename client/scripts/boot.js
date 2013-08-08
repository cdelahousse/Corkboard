require.config({
  baseUrl: '/scripts/',
  paths: {
    jquery: '../bower_components/jquery/jquery.min',
    require : '../bower_components/requirejs/require', // Minify?
    underscore: '../bower_components/underscore/underscore-min',
    backbone: '../bower_components/backbone/backbone-min',
    text : '../bower_components/requirejs-text/text',
    templates: '../templates',
    gest : '../bower_components/gest/gest'
  },
  shim: {
    underscore: {
      exports: '_',
      init: function ( ) {
        'use strict';
        this._.templateSettings = {
            interpolate : /\{\{(.+?)\}\}/g
          };
        return this._;
      }
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    gest : {
      exports : "Gest"
    }
  }
});

require(['utils', 'app'], function (utils, app) {
  'use strict';
  utils.log('Bootstrapping...');
  app.init();
});
