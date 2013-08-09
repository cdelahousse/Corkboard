define(['views/NoteContainer', 'backbone', 'underscore', 'utils'], 
    function (NoteView ,Backbone, _ , utils) {
  'use strict';

  var Wall = Backbone.View.extend({
    initialize : function () {
      this.$el.empty();
      this.addAll();
      this.listenTo(this.collection, 'add', this.addOne);
    },

    render : function () {
      return this;
    },

    // Add Note to wall
    addOne : function (model) {
      utils.log('Adding new Note: ' + model.cid); //XXX change to id
      var view = new NoteView({ model : model });
      this.$el.append(view.render().el);
    },
    //Add all nodes to wall
    addAll : function () {
      this.collection.each(function(model) {
        this.addOne(model);
      }, this);
    }

  });

  return Wall;

});
