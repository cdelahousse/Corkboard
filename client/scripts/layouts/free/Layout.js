define(['layouts/free/Wrapper', 'utils'], function (Wrapper, utils) {
  'use strict';

  var FreeLayout = function (parentElem) {

    //Clear whatever's there
    parentElem.innerHTML = '';

    //Prepare div where layout will reside
    var layoutArea = this.layoutArea = document.createElement('div');
    layoutArea.className = 'layout layout-free';
    parentElem.appendChild(this.layoutArea);

    utils.loadCss('layouts/free.css');
  };

  FreeLayout.prototype = {
    // Add single view to layout
    add : function (view) {
      //Wrap in in layout wrapper before adding to layout
      var wrapped = new Wrapper({ view : view });
      var elem = wrapped.el;
      this.layoutArea.appendChild(elem);
    },

    // Remove single view from layout
    remove : function (view) { },
  };

  return FreeLayout;
});

