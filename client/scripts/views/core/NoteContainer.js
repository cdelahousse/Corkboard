// View for Note Container, this includes the bezel 
define(['text!templates/core/noteContainer.html','backbone', 'underscore', 
    'require' ],
    function (noteTmpl, Backbone, _ , require ) {
  'use strict';

  var NoteContainer = Backbone.View.extend({
    tagName : 'div',
    className : 'note',
    template : _.template(noteTmpl),
    initialize : function () {
      var type = this.model.get('type');

      type = 'text'; //XXX DEBUG

      var childTemplate = 'text!templates/types/' + type;

      var templates = [
        childTemplate + '.html',
        childTemplate + 'Edit.html',
      ];
        
      var parentView = this; 
      require(templates, function ( typeTmpl, typeEditTmpl ) {
        console.log(typeTmpl);
      });


    },
    render : function () {
      this.$el.html(this.template( this.model.toJSON() ));

      // Add drag behaviour while preserving what should be the value of 'this'
      // in Dom event handlers
      var view = this;
      this.el.addEventListener('drag-start', function () { 
        // 'this' is DOM element
        view.drag.call(this, view);
      });
        
      return this;
    },
    events : {
      'click .nav > .delete' : 'delete',
      'click .nav > .edit' : function () { this.toggleNav(); this.edit(); },
      'click .nav > .save' : function () { this.toggleNav(); this.save(); }
    },

    toggleNav : function () {
      this.$el.find('.edit').toggleClass('hide');
      this.$el.find('.save').toggleClass('hide');
    },
    // This should be overridden in nested view
    save : function () {
      //OR
      //this.childView.save();

    },
    // This should be overridden in nested view
    edit : function () {
      //OR
      // this.childView.edit()
    },
    delete : function () {
      this.model.destroy();
      // this.childView.remove(); //XXX when I have nested views
      this.remove();
    },

    // Note drag behaviour
    // XXX Modularize and abstract away
    drag : function (view) {

      var target = this, //DOM elem
          startOffsetX = view.el.getBoundingClientRect().left,
          startOffsetY = view.el.getBoundingClientRect().top;

      var transform = typeof target.style.transform === 'string' ?
        'transform' : 'webkitTransform'; 
      
      target.addEventListener('drag-move', move);
      target.addEventListener('drag-end', end);
      target.addEventListener('drag-cancel', end);

      function move (e) {

        var dx = e.detail.deltaX;
        var dy = e.detail.deltaY;
        view.el.style[ transform ] =
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
        view.el.style[ transform ] = '';

        target.removeEventListener('drag-move', move);
        target.removeEventListener('drag-end', end);
        target.removeEventListener('drag-cancel', end);
      }
    }
  });

  return NoteContainer;

});
