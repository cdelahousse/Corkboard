//Client configuration settings
/* global requirejs */ //JSHint
define(['underscore'], function  ( _ ) {
  'use strict';

  _.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };

  return {
    appUrl : 'http://localhost:3000',
    apiUrl : '/notes',
    requireBaseUrl : requirejs.s.contexts.baseUrl,
    requireTypeViews : 'views/types/',
    requireCoreViews : 'views/core/'
  };
  
});
