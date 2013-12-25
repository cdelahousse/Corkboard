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
      this.view.el.addEventListener('mousedown', this.boundHandlers.start);
    },
    removeListeners : function () {
      this.view.el.removeEventListener('drag-start', this.boundHandlers.start);
      this.view.el.removeEventListener('mousedown', this.boundHandlers.start);
    },
    removeListenersFromTarget : function (e) {
      e.target.removeEventListener('drag-move', this.boundHandlers.move);
      e.target.removeEventListener('drag-end', this.boundHandlers.end);
      e.target.removeEventListener('drag-cancel', this.boundHandlers.cancel);

      document.removeEventListener('mousemove', this.boundHandlers.move);
      e.target.removeEventListener('mouseup', this.boundHandlers.end);
    },
    _addDragStartStateToInstance: function (e) {
      this.pointerStartX = isGestEvent(e) ? e.detail.startX : e.clientX;
      this.pointerStartY = isGestEvent(e) ? e.detail.startY : e.clientY;

      var viewBoundingRect = this.view.el.getBoundingClientRect();
      this.startOffsetX = viewBoundingRect.left;
      this.startOffsetY = viewBoundingRect.top;
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
  //
  //jshint validthis: true
  function onDragStart(e) {
    var target = e.target;

    this._addDragStartStateToInstance(e);

    target.addEventListener('drag-move', this.boundHandlers.move);
    target.addEventListener('drag-end', this.boundHandlers.end);
    target.addEventListener('drag-cancel', this.boundHandlers.cancel);

    document.addEventListener('mousemove', this.boundHandlers.move);
    target.addEventListener('mouseup', this.boundHandlers.end);

    this.view.el.classList.add(CSSCLASSES.DRAGGING);

    this.userHandlers.start && this.userHandlers.start(/* e */);
  }

  //TODO: use requestAnimation Frame
  function onDragMove(e) {

    e.preventDefault();

    var newEvent = prepareEventObject(e, this);
    var dx = newEvent.deltaX;
    var dy = newEvent.deltaY;

    this.view.el.style[ TRANSFORM ] =
      'translate(' + dx + 'px, ' + dy + 'px)';

    this.view.el.classList.add(CSSCLASSES.DRAGGING);

    this.userHandlers.move && this.userHandlers.move(newEvent);
  }

  function onDragEnd(e) {

    this.removeListenersFromTarget(e);
    this.view.el.style[ TRANSFORM ] = '';
    this.view.el.classList.remove(CSSCLASSES.DRAGGING);

    var newEvent = prepareEventObject(e, this);
    this.userHandlers.end && this.userHandlers.end(newEvent);
  }

  function onDragCancel(e) {

    var newEvent = prepareEventObject(e, this);
    this.removeListenersFromTarget(e);

    this.view.el.style[ TRANSFORM ] = '';

    this.view.el.classList.remove(CSSCLASSES.DRAGGING);

    this.userHandlers.cancel && this.userHandlers.cancel(newEvent);
  }

  function prepareEventObject (e, dragInstance) {
    var deltas = getDeltasFromEvent(e, dragInstance);
    return {
      deltaX: deltas.deltaX,
      deltaY: deltas.deltaY,
      pointerStartX: dragInstance.pointerStartX,
      pointerStartY: dragInstance.pointerStartY,

      //Initial View position
      //TODO: find better name. startNoteX? StartX
      startOffsetX: dragInstance.startOffsetX,
      startOffsetY: dragInstance.startOffsetY
    };
  }

  function getDeltasFromEvent(e, dragInstance) {
    return {
      deltaX : isGestEvent(e) ? e.detail.deltaX : e.clientX - dragInstance.pointerStartX,
      deltaY : isGestEvent(e) ? e.detail.deltaY : e.clientY - dragInstance.pointerStartY
    };
  }

  //TODO: Make feature req so that all gest events be instances of GestEvent
  function isGestEvent(e) {
    return e instanceof CustomEvent;
  }

  return DragView;

});
