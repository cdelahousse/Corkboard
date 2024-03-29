//Wrapper that helps the Layout manage the note view's placement within the
//layout
define(['behaviours/Drag', 'backbone' ], function (DragBehaviour, Backbone) {
  'use strict';

  var FreeLayoutElementWrapper = Backbone.View.extend({
    attributes : { tag : 'div', class : 'note-wrapper note-wrapper-free' },
    initialize : function () {

      this.wrappedView = this.options.view;
      this.model = this.options.view.model;
      this.layout = this.options.layout;

      // this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'change:layouts', this.setLocation);

      //Create wrap note
      this.el.appendChild(this.wrappedView.el);

      this.setLocation();
      this.behaviour = new DragBehaviour(this);

      // var view = this;
      //Add hook/handlers for different moments
      this.behaviour.end(function (e) {
        this.el.style.zIndex = this.layout.zIndexOfTopElement++;
        this.el.classList.remove('note-wrapper-free-active');

        var top = e.startY + e.deltaY;
        var left = e.startX + e.deltaX;
        this.el.style.top = top + 'px';
        this.el.style.left = left + 'px';
        this.el.style.position = 'absolute';

        var layouts = this.model.get('layouts');

        if (!layouts.free) {
          layouts.free = {};
        }
        layouts.free.x = left;
        layouts.free.y = top;

        this.model.save('layouts', layouts);
      });

    },
    //Sets the wrapped note's location within the layout
    setLocation : function () {
      var layouts = this.model.get('layouts');
      if (layouts.free) {
        this.el.style.position = 'absolute';
        this.el.style.left = layouts.free.x + 'px';
        this.el.style.top = layouts.free.y + 'px';
      }
    }
  });

  return FreeLayoutElementWrapper;

});

