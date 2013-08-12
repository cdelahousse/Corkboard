//Client configuration settings
/* global requirejs */ //JSHint
define(['underscore'], function  ( _ ) {
  'use strict';

  return {
    requireBaseUrl : requirejs.s.contexts.baseUrl,
    requireTypeViews : 'views/types/',
    requireCoreViews : 'views/core/',
    init : function () {
      _.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };
    }
  };
  
});
