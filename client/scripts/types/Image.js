// View for Notes of type Image. Extends core view type.
define(['core/Type'], function (ViewType) {
  'use strict';

  var Image = ViewType.extend({
    initialize : function () {
      this.__initialize();
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

