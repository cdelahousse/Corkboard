require.config({
  baseUrl: '/scripts/',
  paths: {
    jquery: '../bower_components/jquery/jquery.min',
    require : '../bower_components/requirejs/require', // Minify?
    underscore: '../bower_components/underscore/underscore-min',
    backbone: '../bower_components/backbone/backbone-min',
    text : '../bower_components/requirejs-text/text',
    gest : '../bower_components/gest/gest',

    templates: '../templates'
  },
  shim: {
    underscore: { exports: '_' },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    gest : { exports : "Gest" }
  }
});

require(['views/core/App', 'collections/Notes', 'config', 'utils', 'gest'], 
    function (AppView, Notes, config, utils) {
  'use strict';

  utils.log('Initializing ...');

  // Initialize global configuration settings
  config.init();

  var notes = new Notes(); 

  //Mock data
  notes.add([
    {data: 'ahhhhhhhhhhhh'},
    {data: 'ahhhhhhhhhhhh'},
    {type : 'image',
      data: 'http://dummyimage.com/200/00bda7/0011ff.png&text=Test+Image'},
    {data: 'ahhhhhhhhhhhh'}
  ]);

  new AppView({
    el : '#app',
    collection : notes
  });
});
