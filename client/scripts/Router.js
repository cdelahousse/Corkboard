// Main application router
define(['core/App', 'backbone', 'config'], function (AppView, Backbone, config) {
  'use strict';

  var Router = Backbone.Router.extend({
    initialize : function (options) {
      this.collection = options.collection;
    },

    routes : {
      '' : 'index'
    },

    index : function () {
      new AppView({
        el : config.appElement,
        collection : this.collection
      });
    }
  });

  return Router;
});
