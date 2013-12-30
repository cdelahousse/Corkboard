define(['core/NoteBezel', 'layouts/column/Layout', 'backbone', 'underscore',
    'utils'], function (NoteBezel , Layout, Backbone, _ , utils) {
  'use strict';

  var Workspace = function (options) {

    Backbone.View.apply(this, [options]);
    this.listenTo(this.collection, 'add', this.add);
  };

  Workspace.extend = Backbone.View.extend;
  Workspace.prototype = Object.create(Backbone.View.prototype);
  _.extend(Workspace.prototype, {
    render : function () {
      this.addAll();
    },
    add : function (model) {
      utils.log('Adding new Note: ' + model.cid); //XXX change to id

      var view = new NoteBezel({ model : model });
      this.layout.add(view.render());
    },
    addAll : function () {
      this.collection.each(function(model) {
        this.add(model);
      }, this);
    }

  });
  return Workspace;

});
