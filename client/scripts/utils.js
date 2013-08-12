//Application specific constants and helpers
define(['underscore'], function (_) {
  'use strict';

  // Logger abstraction
  function log() {
    var args = _.toArray(arguments);
    return console.log.apply(console,args);
  }

  // Capitalize first letter of word
  function capitalize (s) {
    return s.charAt(0).toUpperCase() + s.slice(1); 
  }

  return {
    log : log,
    capitalize : capitalize
  };
});
