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
    cssUrl : '/styles/',
    requireBaseUrl : requirejs.s.contexts.baseUrl,
    requireTypeViews : 'types/',
    requireCoreViews : 'core/',
    noteTypes : [ 'image', 'text' ],
    appElement : '#app'
  };

});
