//Application specific constants and helpers
define(['underscore', 'config'], function (_, config) {
  'use strict';

  // Logger abstraction
  function log() {
    var args = _.toArray(arguments);
    return console.log.apply(console,args);
  }
  function error(msg) {
    throw new Error(msg);
  }

  // Capitalize first letter of word
  function capitalize (s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Load CSS relative to the style sheet directory
  var loadedSheets = [];
  function loadCss (url) {
    if (loadedSheets.indexOf(url) > -1) { return; }
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = config.cssUrl + url;
    document.getElementsByTagName("head")[0].appendChild(link);
  }


  return {
    log : log,
    error: error,
    capitalize : capitalize,
    loadCss : loadCss
  };
});
