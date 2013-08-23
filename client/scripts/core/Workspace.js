define(['core/NoteBezel', 'layouts/free/Layout', 'backbone', 'underscore', 'utils'], 
    function (NoteBezel , Layout, Backbone, _ , utils) {
  'use strict';

  var Workspace = Backbone.View.extend({
    initialize : function () {
      this.listenTo(this.collection, 'add', this.add);
      // This is where you'd want the layout to fill
      var layoutArea = this.el;
      this.layout = new Layout(layoutArea);

    },
    render : function () {
      this.addAll();
    },

    // Add Note to Workspace
    add : function (model) {
      utils.log('Adding new Note: ' + model.cid); //XXX change to id

      var view = new NoteBezel({ model : model });
      this.layout.add(view.render());
    },
    //Add all nodes to Workspace
    addAll : function () {
      this.collection.each(function(model) {
        this.add(model);
      }, this);
    }

  });

  return Workspace;

});
