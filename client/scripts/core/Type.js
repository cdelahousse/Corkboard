// Generic Parent Class View for Note Types
define(['backbone','underscore', 'utils'], function (Backbone, _ ,  utils) {
  'use strict';

  var Type = function (options) {
    Backbone.View.apply(this, [options]);

    if (! this.model instanceof Backbone.Model) {
      throw new Error('Note Type needs a model!');
    }
    utils.loadCss('types/' + this.model.get('type') + '.css');
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.render();

  };

  _.extend(Type.prototype, Backbone.View.prototype, {
    render : function () {
      throw new Error('Implement render method for Note Type!');
    },
    edit : function () {
      throw new Error('Implement edit method for Note Type!');
    },
    save : function () {
      throw new Error('Implement save method for Note Type!');
    }
  });

  Type.extend = Backbone.View.extend;

  return Type;
});

