
// Main entry point for the app after bootstrapping
define(['views/core/Wall', 'collections/Notes', 'utils', 'gest', 
    'jquery' ], function (WallView, Notes, utils, Gest, $) {
  'use strict';

  // var $wall= $('#wall');
  var notes = new Notes(); 

  //Mock data
  notes.add([
    {data: 'ahhhhhhhhhhhh'},
    {data: 'ahhhhhhhhhhhh'},
    {type : 'image',
      data: 'http://dummyimage.com/200/00bda7/0011ff.png&text=Test+Image'},
    {data: 'ahhhhhhhhhhhh'}
  ]);
  var wall;
  function init () {
    utils.log('Initializing ...');

    wall = new WallView({
      el : '#wall',
      collection : notes
    });

    $('#add-note').on('click', function () {
      notes.add([ { data: 'arsta' } ]);
    });
  }
  return {
    init : init
  };
});
