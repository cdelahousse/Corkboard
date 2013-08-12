// View for Note Container, this includes the bezel 
define(['text!templates/core/noteContainer.html','backbone', 'underscore', 
    'require', 'utils', 'config' ],
    function (noteTmpl, Backbone, _ , require, utils, config ) {
  'use strict';

  var NoteContainer = Backbone.View.extend({
    template : noteTmpl,
    attributes : function (){
      return { tag : 'div', class : 'note note-' + this.model.get('type') };
    },
    initialize : function () {
      var type = this.model.get('type');

      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.removeView);

      // Dynamically load view type
      var viewType = [ config.requireTypeViews + utils.capitalize(type) ];
      var parentView = this; 
      require(viewType, function ( ChildView ) {

        parentView.childView = new ChildView({
          model : parentView.model,
          el: parentView.el.querySelector('.note-content')
        });

        parentView.childView.render();

      });
    },
    render : function () {
      this.el.innerHTML = this.template;

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
      'click .nav > .delete' : function () { this.destroy(); },
      'click .nav > .edit' : function () { this.toggleNav(); this.edit(); },
      'click .nav > .save' : function () { this.toggleNav(); this.save(); }
    },

    // Delegated to nested views
    toggleNav : function (){ this.$el.find('.edit,.save').toggleClass('hide');},
    save : function () { this.childView.save(); },
    edit : function () { this.childView.edit(); }, 
    destroy : function () { this.model.destroy(); },

    // Remove this view and child view from DOM
    removeView : function () {
      this.childView.remove();
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
