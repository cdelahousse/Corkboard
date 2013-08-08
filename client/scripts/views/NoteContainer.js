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
      var that = this;
      this.el.addEventListener('drag-start', function (e) { 
        that.drag.call(this, that, e);
      });
        
      return this;
    },
    events : {
      // 'drag-start' : 'drag'
    },

    drag : function (view, e) {
      console.log(view);

      var target = this,
          startOffsetX = view.el.getBoundingClientRect().left,
          startOffsetY = view.el.getBoundingClientRect().top;

      var cssTransform = 'webkitTransform';

      
      target.addEventListener('drag-move', move);
      target.addEventListener('drag-end', end);
      target.addEventListener('drag-cancel', end);

      function move (e) {

        var dx = e.detail.deltaX;
        var dy = e.detail.deltaY;
        view.el.style[ cssTransform ] =
          'translate(' + dx + 'px, ' + dy + 'px)';
      }

      function end(e) {
        var dx = e.detail.deltaX;
        var dy = e.detail.deltaY;
        var top = startOffsetY + dy;
        var left = startOffsetX + dx;
        view.el.style.top = top + 'px';
        view.el.style.left = left + 'px';
        view.el.style.position = 'absolute';
        view.el.style[ cssTransform ] = '';

        target.removeEventListener('drag-move', move);
        target.removeEventListener('drag-end', end);
        target.removeEventListener('drag-cancel', end);


      }


    }
  });

  return NoteContainer;

});
