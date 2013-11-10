//Generic touch dragging behaviour for views.
define(['underscore', 'gest'], function ( _ ) {
  'use strict';

  var CSSCLASSES = {
      DRAGGING : 'dragging'
  };

  // Feature testing
  var TRANSFORM = typeof document.documentElement.style.transform === 'string'
    ?  'transform' : 'webkitTransform';

  function DragView (view) {
    this.view = view;

    //Bind instance to event handlers so they can access behaviour instance state
    var instance = this;
    this.boundHandlers = {
      start : _.bind(onDragStart, instance),
      move : _.bind(onDragMove, instance),
      end: _.bind(onDragEnd, instance),
      cancel: _.bind(onDragCancel, instance)
    };

    //Where user defined handlers are stored. Will be defined in view;
    this.userHandlers = {};
    this.addListeners();
  }

  DragView.prototype = {
    addListeners : function () {
      this.view.el.addEventListener('drag-start', this.boundHandlers.start);
    },
    removeListeners : function () {
      this.view.el.removeEventListener('drag-start', this.boundHandlers.start);
    },
    removeListenersFromTarget : function (e) {
      e.target.removeEventListener('drag-move', this.boundHandlers.move);
      e.target.removeEventListener('drag-end', this.boundHandlers.end);
      e.target.removeEventListener('drag-cancel', this.boundHandlers.cancel);
    },

    //User defined hooks. Should be attached in view's code
    //Let the user of this behaviour have the context be the view
    //'this' in the view that the behaviour is bound to
    start : function (handler) {
      this.userHandlers.start = _.bind(handler, this.view);
    },
    move : function (handler) {
      this.userHandlers.move = _.bind(handler, this.view);

    },
    end: function (handler) {
      this.userHandlers.end = _.bind(handler, this.view);
    },
    cancel : function (handler) {
      this.userHandlers.cancel = _.bind(handler, this.view);
    }
  };

  //These are behaviour related handlers, not user handlers.
  //These need a fixed receiver. See above
  function onDragStart(e) {
    var target = e.target;

    var boundingRect = this.view.el.getBoundingClientRect();
    this.startOffsetX = boundingRect.left;
    this.startOffsetY = boundingRect.top;

    target.addEventListener('drag-move', this.boundHandlers.move);
    target.addEventListener('drag-end', this.boundHandlers.end);
    target.addEventListener('drag-cancel', this.boundHandlers.cancel);

    this.view.el.classList.add(CSSCLASSES.DRAGGING);

    this.userHandlers.start && this.userHandlers.start(e);
  }

  function onDragMove(e) {

    var dx = e.detail.deltaX;
    var dy = e.detail.deltaY;
    this.view.el.style[ TRANSFORM ] =
      'translate(' + dx + 'px, ' + dy + 'px)';

    this.view.el.classList.add(CSSCLASSES.DRAGGING);

    this.userHandlers.move && this.userHandlers.move(e);
  }

  function onDragEnd(e) {
    this.removeListenersFromTarget(e);
    var dx = e.detail.deltaX;
    var dy = e.detail.deltaY;

    var view = this.view;
    view.el.style[ TRANSFORM ] = '';

    view.el.classList.remove(CSSCLASSES.DRAGGING);

    this.userHandlers.end && this.userHandlers.end(e);
  }

  function onDragCancel(e) {
    this.removeListenersFromTarget(e);
    this.view.el.style[ TRANSFORM ] = '';

    this.view.el.classList.remove(CSSCLASSES.DRAGGING);

    this.userHandlers.cancel && this.userHandlers.cancel(e);
  }

  return DragView;

});
