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
      'click #note-add' : function () {
        // XXX Add validation
        var type = $('#note-type').val().trim().toLowerCase();
        var title = $('#note-title').val().trim();
        this.collection.add({ 
          data: 'Created via button',
          type: type,
          title: title
        });
      }
    }

  });

  return App;

});
