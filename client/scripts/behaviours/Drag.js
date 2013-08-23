//Generic dragging behaviour for views
define(['underscore'], function ( _ ) {
  'use strict';

  function DragView (view) {
    this.view = view;

    //Bind instance to event handlers so they can access instance state
    var instance = this;
    this.boundHandlers = {
      start : _.bind(start, instance),
      move : _.bind(move , instance),
      end: _.bind(end, instance),
      cancel: _.bind(cancel, instance)
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
  //These need a fixed receiver
  function start (e) {
    var target = e.target;

    this.startOffsetX = this.view.el.getBoundingClientRect().left;
    this.startOffsetY = this.view.el.getBoundingClientRect().top;

    target.addEventListener('drag-move', this.boundHandlers.move);
    target.addEventListener('drag-end', this.boundHandlers.end);
    target.addEventListener('drag-cancel', this.boundHandlers.cancel);

    this.view.el.classList.add('dragging');

    this.userHandlers.start && this.userHandlers.start(e);
  }
  function move (e) {

    var transform = typeof e.target.style.transform === 'string' ?
      'transform' : 'webkitTransform';

    var dx = e.detail.deltaX;
    var dy = e.detail.deltaY;
    this.view.el.style[ transform ] =
      'translate(' + dx + 'px, ' + dy + 'px)';

    this.view.el.classList.add('dragging');

    this.userHandlers.move && this.userHandlers.move(e);
  }
  function end(e) {
    this.removeListenersFromTarget(e);
    var dx = e.detail.deltaX;
    var dy = e.detail.deltaY;
    var top = this.startOffsetY + dy;
    var left = this.startOffsetX + dx;
    var transform = typeof e.target.style.transform === 'string' ?
      'transform' : 'webkitTransform';

    var view = this.view;
    view.el.style.top = top + 'px';
    view.el.style.left = left + 'px';
    view.el.style.position = 'absolute';
    view.el.style[ transform ] = '';


    view.el.classList.remove('dragging');

    this.userHandlers.end && this.userHandlers.end({
      x : left,
      y : top
    });
  }
  function cancel(e) {
    this.removeListenersFromTarget(e);
    var transform = typeof e.target.style.transform === 'string' ?
      'transform' : 'webkitTransform';
    this.view.el.style[ transform ] = '';

    this.view.el.classList.remove('dragging');

    this.userHandlers.cancel && this.userHandlers.cancel(e);
  }

  return DragView;

});
