define(['underscore', 'core/Workspace', 'layouts/column/Layout', 'text!kanban/templates/addNote.tpl'],
       function (_, Workspace, ColumnLayout, addNoteTpl) {
  'use strict';
  var KanbanWorkspace = Workspace.extend({
    initialize: function () {
      var layoutArea = this.el;
      this.layout = new ColumnLayout(layoutArea, [ 'Backlog', 'In Progress', 'Done'] );
    },
    render: function () {
      this._buildUi();
    },
    events : {
      'click #note-add': '_newNote',
    },
    _newNote: function () {
      this.collection.add({
        title: $('#note-title').val(),
        layouts: {
          column: 0
        },
        data: $('#note-text').val()
      });
    },

    _buildUi: function () {
      var addNoteUi = document.createElement();
      addNoteUi.innerHTML = addNoteTpl;
      this.layout.prependToColumn(0, addNoteUi);
    }
  });
  return KanbanWorkspace;
});
