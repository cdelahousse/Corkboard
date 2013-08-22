// View for Notes of type Image
define(['backbone'], function (Backbone) {
  'use strict';

  var Image = Backbone.View.extend({
    initialize : function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.render();
    },
    render : function () {
      this.el.innerHTML = '<img src="' + this.model.get('data') + 
        '" style="max-width:100%" />';
    },
    edit : function () {
      var src = this.model.get('data');
      this.el.innerHTML = '<input type="url" value="' + src + '" />';
    },
    save : function () {
      var src = this.$el.find('input').val();
      this.model.save('data', src);
      if (!this.model.hasChanged()) { this.render(); }
    }
  });
  return Image;
});

