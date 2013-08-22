define(['views/core/Wall', 'backbone', 'underscore', 'config', 'utils'],
    function (WallView, Backbone, _ , config, utils) {
  'use strict';

  var App = Backbone.View.extend({
    initialize : function () {
      this.WallView = new WallView({
        el : '#wall',
        collection : this.collection
      });

      var nav = this.el.getElementsByTagName('nav')[0];

      //Generate note type pull down
      var select = nav.querySelector('#note-type');
      config.noteTypes.forEach(function (type) {
        var elem = document.createElement('option');
        elem.innerHTML = utils.capitalize(type);
        select.appendChild(elem);
      });

      this.WallView.render();
    },
    events : {
      'click #note-add' : function () {
        // XXX Add validation
        var type = $('#note-type').val().trim().toLowerCase();
        var title = $('#note-title').val().trim();
        var attrs = {
          data : 'Created via button',
          type : type,
          title : title
        };

        //XXX This is stupid. To fix the doubling bug, I can't add it 
        //directly to the collection. For this to work in a nicer way, I should
        //just let the collection do the model creation... Oh sigh...
        var Model = this.collection.model;
        (new Model(attrs)).save();

      }
    }

  });

  return App;

});
