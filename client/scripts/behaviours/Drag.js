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
    this._view = view;

    //Bind instance to event handlers so they can access behaviour instance state
    var instance = this;
    this._boundHandlers = {
      start : _.bind(onDragStart, instance),
      move : _.bind(onDragMove, instance),
      end: _.bind(onDragEnd, instance),
      cancel: _.bind(onDragCancel, instance)
    };

    //Where user defined handlers are stored. Will be defined in view;
    this._userHandlers = {};
    this._addListeners();
  }

  DragView.prototype = {
    _addListeners : function () {
      this._view.el.addEventListener('drag-start', this._boundHandlers.start);
      this._view.el.addEventListener('mousedown', this._boundHandlers.start);
    },
    _removeListeners : function () {
      this._view.el.removeEventListener('drag-start', this._boundHandlers.start);
      this._view.el.removeEventListener('mousedown', this._boundHandlers.start);
    },
    _addEventListenersToTarget: function (e) {
      e.target.addEventListener('drag-move', this._boundHandlers.move);
      e.target.addEventListener('drag-end', this._boundHandlers.end);
      e.target.addEventListener('drag-cancel', this._boundHandlers.cancel);

      document.addEventListener('mousemove', this._boundHandlers.move);
      e.target.addEventListener('mouseup', this._boundHandlers.end);
    },
    _removeEventListenersFromTarget : function (e) {
      e.target.removeEventListener('drag-move', this._boundHandlers.move);
      e.target.removeEventListener('drag-end', this._boundHandlers.end);
      e.target.removeEventListener('drag-cancel', this._boundHandlers.cancel);

      document.removeEventListener('mousemove', this._boundHandlers.move);
      e.target.removeEventListener('mouseup', this._boundHandlers.end);
    },
    _addDragStartStateToInstance: function (e) {
      this.pointerStartX = isGestEvent(e) ? e.detail.startX : e.clientX;
      this.pointerStartY = isGestEvent(e) ? e.detail.startY : e.clientY;

      var viewBoundingRect = this._view.el.getBoundingClientRect();
      this.startX = viewBoundingRect.left;
      this.startY = viewBoundingRect.top;
    },

    //User defined hooks. Should be attached in view's code
    //Let the user of this behaviour have the context be the view
    //'this' in the view that the behaviour is bound to
    start : function (handler) {
      this._userHandlers.start = _.bind(handler, this._view);
    },
    move : function (handler) {
      this._userHandlers.move = _.bind(handler, this._view);

    },
    end: function (handler) {
      this._userHandlers.end = _.bind(handler, this._view);
    },
    cancel : function (handler) {
      this._userHandlers.cancel = _.bind(handler, this._view);
    }
  };

  //These are behaviour related handlers, not user handlers.
  //These need a fixed receiver. See above
  //
  //jshint validthis: true
  function onDragStart(e) {

    this._addDragStartStateToInstance(e);
    this._addEventListenersToTarget(e);

    this._view.el.classList.add(CSSCLASSES.DRAGGING);

    this._userHandlers.start && this._userHandlers.start(/* e */);
  }

  //TODO: use requestAnimation Frame
  function onDragMove(e) {
    e.preventDefault();

    var newEvent = prepareEventObject(e, this);
    var dx = newEvent.deltaX;
    var dy = newEvent.deltaY;

    this._view.el.style[ TRANSFORM ] =
      'translate(' + dx + 'px, ' + dy + 'px)';

    this._view.el.classList.add(CSSCLASSES.DRAGGING);

    this._userHandlers.move && this._userHandlers.move(newEvent);
  }

  function onDragEnd(e) {

    this._removeEventListenersFromTarget(e);
    this._view.el.style[ TRANSFORM ] = '';
    this._view.el.classList.remove(CSSCLASSES.DRAGGING);

    var newEvent = prepareEventObject(e, this);
    this._userHandlers.end && this._userHandlers.end(newEvent);
  }

  function onDragCancel(e) {

    var newEvent = prepareEventObject(e, this);
    this._removeEventListenersFromTarget(e);

    this._view.el.style[ TRANSFORM ] = '';

    this._view.el.classList.remove(CSSCLASSES.DRAGGING);

    this._userHandlers.cancel && this._userHandlers.cancel(newEvent);
  }

  function prepareEventObject (e, dragInstance) {
    // All of these are relative to the drag instance's view element
    var deltas = getDeltasFromEvent(e, dragInstance);
    return {
      deltaX: deltas.deltaX,
      deltaY: deltas.deltaY,
      pointerStartX: dragInstance.pointerStartX,
      pointerStartY: dragInstance.pointerStartY,
      pointerPageX: isGestEvent(e) ? e.detail.pageX : e.pageX,
      pointerPageY: isGestEvent(e) ? e.detail.pageY : e.pageY,
      startX: dragInstance.startX,
      startY: dragInstance.startY
    };
  }

  function getDeltasFromEvent(e, dragInstance) {
    return {
      deltaX : isGestEvent(e) ? e.detail.deltaX : e.pageX - dragInstance.pointerStartX,
      deltaY : isGestEvent(e) ? e.detail.deltaY : e.pageY - dragInstance.pointerStartY
    };
  }

  //TODO: Make feature req so that all gest events be instances of GestEvent
  function isGestEvent(e) {
    return e instanceof CustomEvent;
  }

  return DragView;
});
