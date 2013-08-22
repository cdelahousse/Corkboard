define(['views/core/Note', 'backbone', 'underscore', 'utils'], 
    function (NoteView ,Backbone, _ , utils) {
  'use strict';

  var Workspace = Backbone.View.extend({
    initialize : function () {
      this.listenTo(this.collection, 'add', this.addOne);
    },
    render : function () {
      this.$el.empty();
      this.addAll();
    },

    // Add Note to Workspace
    addOne : function (model) {
      utils.log('Adding new Note: ' + model.cid); //XXX change to id
      var view = new NoteView({ model : model });
      this.$el.append(view.render().el);
    },
    //Add all nodes to Workspace
    addAll : function () {
      this.collection.each(function(model) {
        this.addOne(model);
      }, this);
    }

  });

  return Workspace;

});
