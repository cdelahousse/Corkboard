//Wrapper that helps the Layout manage the note view's placement within the
//layout
define(['behaviours/Drag', 'backbone'], function (DragBehaviour, Backbone) {
  'use strict';

  var ColumnElementWrapper = Backbone.View.extend({
    attributes : {
      class : 'note-wrapper note-wrapper-column'
    },
    initialize : function () {

      this.innerView = this.options.view;
      this.model = this.options.view.model;
      this.layout= this.options.layout;

      this.listenTo(this.model, 'change:layouts', this.setLocation);

      //Add inner view to this wrapper
      this.el.appendChild(this.innerView.el);

      //Add drag behaviour
      this.behaviour = new DragBehaviour(this);

      this.behaviour.move(function (e) {
        var num = overColumnNumber.call(this,e);
      }.bind(this));


      //Add hook/handlers for different moments
      this.behaviour.end(function (e) {
        var layouts = this.model.get('layouts');
        var overCol = overColumnNumber.call(this,e);
        if (overCol > -1) {
          layouts.column = overCol;
        }

        this.model.save('layouts', layouts);
        this.setLocation();
      }.bind(this));

    },
    //Sets the wrapped note's location within the layout
    setLocation : function () {
      var layouts = this.model.get('layouts');
      if ('column' in layouts) {
        this.layout.remove(this);
        this.layout.add(this);
      }
    }
  });

  //Determine over which column note is at
  function overColumnNumber(e) {
    var columns = this.layout.columns;
    var len = columns.length;
    for (var col = 0; col < len; col++) {
      var rect = columns[col].elem.getBoundingClientRect();
      if (e.pointerPageX >= rect.left && e.pointerPageX <= rect.right) {
        return col;
      }
    }
    return -1;
  }

  return ColumnElementWrapper;

});

