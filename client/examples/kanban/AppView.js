define(['backbone', 'underscore', 'collections/Notes', 'kanban/KanbanWorkspace', 'text!kanban/templates/app.tpl'],
  function (Backbone, _, Notes, KanbanWorkspace, appTemplate) {
  'use strict';

  var AppView = Backbone.View.extend({
    className: 'kanban',
    template: _.template(appTemplate),
    initialize: function () {


      this.workspace = new KanbanWorkspace({
        collection: this.collection
      });
    },
    render: function () {
      this.el.innerHTML = this.template();
      this.workspace.render();
      this.el.querySelector('.kanban-content').appendChild(this.workspace.el);
    }
  });
  return AppView;

});
