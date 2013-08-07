define(['underscore'], function (_) {
  'use strict';

  function log() {
    var args = _.toArray(arguments);
    return console.log.apply(console,args);
  }


  return {
    log : log
  };
});
