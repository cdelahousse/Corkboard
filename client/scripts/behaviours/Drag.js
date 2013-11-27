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

    var viewBoundingRect = this.view.el.getBoundingClientRect();
    this.startOffsetX = viewBoundingRect.left;
    this.startOffsetY = viewBoundingRect.top;

    if  (this.detail) {
      this.detail.startX = e.clientX;
      this.detail.startY = e.clientY;
    } else {
      this.startX = e.clientX;
      this.startY = e.clientY;
    }

    target.addEventListener('drag-move', this.boundHandlers.move);
    target.addEventListener('drag-end', this.boundHandlers.end);
    target.addEventListener('drag-cancel', this.boundHandlers.cancel);

    document.addEventListener('mousemove', this.boundHandlers.move);
    target.addEventListener('mouseup', this.boundHandlers.end);

    this.view.el.classList.add(CSSCLASSES.DRAGGING);

    this.userHandlers.start && this.userHandlers.start(/* e */);
  }

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

  function prepareEventObject (e, receiver) {
    var deltas = getDeltasFromEvent(e, receiver);
    return {
      deltaX: deltas.dx,
      deltaY: deltas.dy,
      startX: receiver.startX,
      startY: receiver.startY,

      //TODO: find better name
      startOffsetX: receiver.startOffsetX,
      startOffsetY: receiver.startOffsetY
    };
  }

  function getDeltasFromEvent(e, receiver) {
    var dx, dy;
    if (e instanceof CustomEvent) {
      dx = e.detail.deltaX;
      dy = e.detail.deltaY;
    } else {
      dx = e.clientX - receiver.startX;
      dy = e.clientY - receiver.startY;
    }

    return {
      dx : dx,
      dy : dy
    };
  }

  return DragView;

});
