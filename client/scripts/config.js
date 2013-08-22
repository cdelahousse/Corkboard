//Client configuration settings
/* global requirejs */ //JSHint
define(['underscore'], function  ( _ ) {
  'use strict';

  function init() {
    _.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };
  }

  return {
    init : init,
    appUrl : 'http://localhost:3000',
    apiUrl : 'notes',
    requireBaseUrl : requirejs.s.contexts.baseUrl,
    requireTypeViews : 'views/types/',
    requireCoreViews : 'views/core/',
    noteTypes : [ 'image', 'text' ]
  };
  
});
