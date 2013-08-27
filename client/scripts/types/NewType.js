// Boilerplate code for creating new Note types. Similar to a vanilla backbone
// View, but inherits from the core Type View.
define(['core/Type'], function (ViewType) {
  'use strict';

  var NewType = ViewType.extend({
    initialize : function () {
      //Optional. Used to initialize this Note Type's content
    },
    render : function () {
      //Render stuff
    },
    edit : function () {
      // What to do when you enter edit mode
    },
    save : function () {
      // What to do when you want to save a note type's content.
    }
  });
  return NewType;
});

