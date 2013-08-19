// View for Note Container, this includes the bezel
define(['text!templates/core/noteContainer.html','behaviours/Drag',
    'backbone', 'underscore', 'require', 'utils', 'config' ],
    function (noteTmpl, DragBehaviour, Backbone, _ , require, utils, config ) {
  'use strict';

  var NoteContainer = Backbone.View.extend({
    template : noteTmpl,
    attributes : function (){
      return { tag : 'div', class : 'note note-' + this.model.get('type') };
    },
    initialize : function () {

      this.listenTo(this.model, 'destroy', this.remove);

      //Add drag behaviour
      this.behaviour = new DragBehaviour(this);

      //Add hook/handlers for different momends
      this.behaviour.start(function () {
        this.$el.addClass('highlight');
      });
      this.behaviour.end(function (pos) {
        this.$el.removeClass('highlight');
        var layouts = this.model.get('layouts');
        if (!layouts.free) {
          layouts.free = {};
        }
        layouts.free.x = pos.x;
        layouts.free.y = pos.y;

        this.model.save('layouts', layouts);
      });
      this.behaviour.cancel(function () {
        this.$el.removeClass('highlight');
      });

      // Dynamically load view type
      var type = this.model.get('type');
      var viewType = [ config.requireTypeViews + utils.capitalize(type) ];
      require(viewType, (function ( ChildView ) {
        this.childView = new ChildView({
          model : this.model,
          el: this.el.querySelector('.note-content')
        });

        //Initialize to Edit Mode on model creation
        if (this.model.isNew()) {
          this.edit();
        }
      }).bind(this));
    },
    render : function () {
      this.el.innerHTML = this.template;
      return this;
    },
    events : {
      'click .nav > .delete' : 'destroy',
      'click .nav > .edit' : 'edit',
      'click .nav > .save' : 'save'
    },

    // Delegated to nested views
    save : function () { this.childView.save(); this.toggleNav(); }, 
    edit : function () { this.childView.edit(); this.toggleNav(); }, 
    destroy : function () { this.model.destroy(); },

    toggleNav : function (){ this.$el.find('.edit,.save').toggleClass('hide');},
  });

  return NoteContainer;

});
