//Basic workspace with only a column layout
define(['core/Workspace', 'layouts/column/Layout'], function (Workspace, Layout) {
  'use strict';

  var ColumnWorkspace = Workspace.extend({
    initialize: function () {
      var layoutArea = this.el;
      var numberOfColumns = this.options.numberOfColumns;
      this.layout = new Layout(layoutArea, numberOfColumns);
    }
  });

  return ColumnWorkspace;
});

