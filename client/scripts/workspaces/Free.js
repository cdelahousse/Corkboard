//Basic workspace with only a free layout
define(['core/Workspace', 'layouts/free/Layout'], function (Workspace, Layout) {
  'use strict';

  var FreeWorkspace = Workspace.extend({
    initialize: function () {
      var layoutArea = this.el;
      this.layout = new Layout(layoutArea);
    }
  });

  return FreeWorkspace;
});

