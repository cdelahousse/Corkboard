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
      this.view.el.addEventListener('drag-start', this._boundHandlers.start);
      this.view.el.addEventListener('mousedown', this._boundHandlers.start);
    },
    _removeListeners : function () {
      this.view.el.removeEventListener('drag-start', this._boundHandlers.start);
      this.view.el.removeEventListener('mousedown', this._boundHandlers.start);
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

      var viewBoundingRect = this.view.el.getBoundingClientRect();
      this.startOffsetX = viewBoundingRect.left;
      this.startOffsetY = viewBoundingRect.top;
    },

    //User defined hooks. Should be attached in view's code
    //Let the user of this behaviour have the context be the view
    //'this' in the view that the behaviour is bound to
    start : function (handler) {
      this._userHandlers.start = _.bind(handler, this.view);
    },
    move : function (handler) {
      this._userHandlers.move = _.bind(handler, this.view);

    },
    end: function (handler) {
      this._userHandlers.end = _.bind(handler, this.view);
    },
    cancel : function (handler) {
      this._userHandlers.cancel = _.bind(handler, this.view);
    }
  };

  //These are behaviour related handlers, not user handlers.
  //These need a fixed receiver. See above
  //
  //jshint validthis: true
  function onDragStart(e) {
    var target = e.target;

    this._addDragStartStateToInstance(e);

    target.addEventListener('drag-move', this._boundHandlers.move);
    target.addEventListener('drag-end', this._boundHandlers.end);
    target.addEventListener('drag-cancel', this._boundHandlers.cancel);

    document.addEventListener('mousemove', this._boundHandlers.move);
    target.addEventListener('mouseup', this._boundHandlers.end);

    this.view.el.classList.add(CSSCLASSES.DRAGGING);

    this._userHandlers.start && this._userHandlers.start(/* e */);
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

    this._userHandlers.move && this._userHandlers.move(newEvent);
  }

  function onDragEnd(e) {

    this._removeEventListenersFromTarget(e);
    this.view.el.style[ TRANSFORM ] = '';
    this.view.el.classList.remove(CSSCLASSES.DRAGGING);

    var newEvent = prepareEventObject(e, this);
    this._userHandlers.end && this._userHandlers.end(newEvent);
  }

  function onDragCancel(e) {

    var newEvent = prepareEventObject(e, this);
    this._removeEventListenersFromTarget(e);

    this.view.el.style[ TRANSFORM ] = '';

    this.view.el.classList.remove(CSSCLASSES.DRAGGING);

    this._userHandlers.cancel && this._userHandlers.cancel(newEvent);
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
