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

      this.listenTo(this.model, 'change:layouts', this._setLocationInLayout);

      //Add inner view to this wrapper
      this.el.appendChild(this.innerView.el);

      //Add drag behaviour
      this.behaviour = new DragBehaviour(this);

      //Add hook/handlers for different moments
      this.behaviour.end(function (e) {
        if ( hasMoved(e) ) {

          this._setColumnNumberOnModel(e);
          this._setLocationInLayout();
        }
      });

    },
    _setColumnNumberOnModel: function (event) {
      var layouts = this.model.get('layouts');
      var overCol = overColumnNumber.call(this,event);
      if (overCol > -1) {
        layouts.column = overCol;
      }

      this.model.save('layouts', layouts);
    },
    _setLocationInLayout: function () {
      //XXX This may be a hack. Double check this functionality
      var layouts = this.model.get('layouts');
      if ('column' in layouts) {
        this.layout.remove(this);
        this.layout.add(this);
      }
    }
  });

  function hasMoved (e) {
    var TOLERANCE = 3;
    return e.deltaX > TOLERANCE || e.deltaY > TOLERANCE;
  }
  //Determine over which column note is at
  function overColumnNumber(e) {
    //XXX Move this to Layout?
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

