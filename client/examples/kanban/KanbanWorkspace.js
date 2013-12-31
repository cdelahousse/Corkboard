define(['core/Workspace', 'layouts/column/Layout'], function (Workspace, ColumnLayout) {
  'use strict';
  var KanbanWorkspace = Workspace.extend({
    initialize: function () {
      var layoutArea = this.el;
      this.layout = new ColumnLayout(layoutArea, [ 'Backlog', 'In Progress', 'Done'] );
    },
  });
  return KanbanWorkspace;
});
