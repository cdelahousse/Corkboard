
// Main entry point for the app after bootstrapping
define(['views/Wall', 'collections/Notes', 'utils', 'gest', 
    'jquery' ], function (WallView, Notes, utils, Gest, $) {
  'use strict';

  // var $wall= $('#wall');
  var notes = new Notes(); 

  //Mock data
  notes.add([
    {data: 'ahhhhhhhhhhhh'},
    {data: 'ahhhhhhhhhhhh'},
    {data: 'ahhhhhhhhhhhh'},
    {data: 'ahhhhhhhhhhhh'}
  ]);
  var wall;
  function init () {
    utils.log('Initializing ...');

    wall = new WallView({
      el : '#wall',
      collection : notes
    });

    $('#add-note').on('tap click', function () {
      notes.add([ { data: 'arsta' } ]);
    });
  }
  return {
    init : init
  };
});
