//socket.io info and set up
define(['socketio', 'utils'], function (io, utils) {
  'use strict';

  function init () {
    var socket = io.connect();

    socket.on('connect', function () {
      utils.log('Socket.io connected');
    });

    return socket;
  }

  return {
    init : init
  };

});
