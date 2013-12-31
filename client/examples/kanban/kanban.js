require.config({
  baseUrl: '../scripts/',
  paths: {
    kanban : '../examples/kanban'
  }
});

require(['corkboard', 'collections/Notes', 'kanban/AppView'], function (Corkboard, Notes, AppView) {
  'use strict';
  Corkboard.init();

  var notes = new Notes([],{
    url : Corkboard.config.apiUrl
  });
  notes.fetch();

  window.Kanban = new AppView({
    el: '#kanban',
    collection: notes
  });
  window.Kanban.render();
});

