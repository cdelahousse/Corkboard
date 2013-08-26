define(['layouts/column/Wrapper', 'utils'], function (Wrapper, utils) {
  'use strict';

  var ColumnLayout = function (parentElem, numberOfColumns) {

    //Default to six columns
    this.numberOfColumns = numberOfColumns || 6;

    utils.loadCss('layouts/column.css');

    //Clear whatever's there
    parentElem.innerHTML = '';

    //Prepare div where layout will reside
    var layoutArea = this.layoutArea = document.createElement('div');
    layoutArea.className = 'layout layout-column';

    //Create column divs, add to layout area
    this.columns = [];
    for (var col = 0; col < this.numberOfColumns; col++) {
      var elem = document.createElement('div');
      elem.className = 'column col' + this.numberOfColumns;
      elem.id = 'column' + col;
      layoutArea.appendChild(elem);
      this.columns[col] =  {
        elem : elem
      };
    }

    parentElem.appendChild(layoutArea);

  };

  ColumnLayout.prototype = {
    // Add single view to layout
    add : function (view) {
      //Wrap in in layout wrapper before adding to layout
      var wrapped = new Wrapper({
        view : view,
        layout : this
      });

      var layouts = view.model.get('layouts');
      var elem = wrapped.el;

      //Add to specific column if possible, if not, add to first column
      if ('column' in layouts && layouts.column > -1 &&
          this.numberOfColumns > layouts.column) {
        var colNum = Number(layouts.column);
        var col = document.getElementById('column'+colNum);
        col.appendChild(elem);
      } else {
        var col0 = document.getElementById('column0');
        col0.appendChild(elem);
      }
    },

    // Remove single view from layout
    remove : function (view) { 
      view.el.parentNode.removeChild(view.el);
    },
  };

  return ColumnLayout;
});

