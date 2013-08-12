// View for Notes of type text
define(['backbone'], function (Backbone) {
  'use strict';

  var Text = Backbone.View.extend({
    initialize : function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.render();
    },
    render : function () {
      var text = this.model.escape('data');
      this.el.innerHTML = text;
    },
    edit : function () {
      var text = this.model.get('data');
      this.el.innerHTML = '<textarea>' + text + '</textarea>';
    },
    save : function () {
      var text = this.$el.find('textarea').val();
      this.model.save('data', text);
    }
  });

  return Text;

});

