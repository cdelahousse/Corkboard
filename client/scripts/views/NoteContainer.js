// View for Note Container
define(['text!templates/core/noteContainer.html','backbone', 'underscore'],
    function (noteTmpl, Backbone, _ ) {
  'use strict';

  var NoteContainer = Backbone.View.extend({
    tagName : 'div',
    className : 'note',
    template : _.template(noteTmpl),
    initialize : function () {

    },
    render : function () {
      this.$el.html(this.template( this.model.toJSON() ));
      return this;
    }
  });

  return NoteContainer;

});
