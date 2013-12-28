// View for Note Bezel. This this is the physical bezel around a note's content.
// Controls that will toggle the note's edit mode and the note's deletion will
// be here.
define(['text!templates/core/noteBezel.html', 'backbone', 'underscore',
    'require', 'utils', 'config' ],
    function (noteTmpl, Backbone, _ , require, utils, config ) {
  'use strict';

  var NoteBezel = Backbone.View.extend({
    template : noteTmpl,
    attributes : function (){
      return { class : 'note note-' + this.model.get('type') };
    },
    initialize : function () {

      this.listenTo(this.model, 'destroy', this.remove);

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

    //Switch visual representation between edit and normal mode
    toggleNav : function (){ this.$el.find('.edit,.save').toggleClass('hide');},

  });

  return NoteBezel;

});
