// View for Notes of type text. Extends core view type.
define(['core/Type'], function (NoteType) {
  'use strict';

  var Text = NoteType.extend({
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

      // Render even if model hasn't changed
      if (!this.model.hasChanged()) { this.render(); }
    }
  });

  return Text;

});

