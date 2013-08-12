define(['views/core/Wall', 'backbone', 'underscore', 'utils'], 
    function (WallView, Backbone, _ , utils) {
  'use strict';

  var App = Backbone.View.extend({
    initialize : function () {
      this.WallView = new WallView({
        el : '#wall',
        collection : this.collection
      });

      this.WallView.render();
    },
    events : {
      'click #add-note' : function () {
        this.collection.add({ data: 'Created via button' });
      }
    }

  });

  return App;

});
