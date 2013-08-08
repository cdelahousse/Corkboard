define(['views/NoteContainer', 'backbone', 'underscore', 'utils'], 
    function (NoteView ,Backbone, _ , utils) {
  'use strict';

  var Wall = Backbone.View.extend({
    initialize : function () {
      this.$el.empty();

      this.listenTo(this.collection, 'add', this.add);

      this.collection.each(function(model) {
        this.add(model);
      }, this);
    },
    render : function () {
      return this;
    },

    //Add Note to wall
    add : function (model) {
      utils.log('Adding new Note: ' + model.cid); //XXX change to id
      var view = new NoteView({ model : model });
      this.$el.append(view.render().el);
    },

  });

  return Wall;

});
