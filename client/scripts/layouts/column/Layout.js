define(['underscore', 'layouts/column/Wrapper', 'utils'], function ( _ , Wrapper, utils) {
  'use strict';

  var DEFAULTNUMCOLUMNS = 6;
  var LAYOUTCLASSNAMES = 'layout layout-column';
  var COLUMNCLASSNAME = 'column';
  var ColumnLayout = function (parentElem, numberOfColumns) {

    this.numberOfColumns = numberOfColumns || DEFAULTNUMCOLUMNS;

    this.el = parentElem;
    this.columns = [];

    this._init();

  };

  ColumnLayout.prototype = {
    _init: function () {

      utils.loadCss('layouts/column.css');

      this.layoutArea = this._buildLayoutArea();
      this.el.innerHTML = ''; //Clear whatever's there
      this.el.appendChild(this.layoutArea);

    },
    _buildLayoutArea: function () {
      var layoutArea = document.createElement('div');
      LAYOUTCLASSNAMES.split(' ').forEach(layoutArea.classList.add.bind(layoutArea.classList));
      var columns = this._buildColumns(this.numberOfColumns);
      layoutArea.appendChild(columns);
      return layoutArea;
    },
    _buildColumns: function (numberOfColumns) {
      var frag = document.createDocumentFragment();
      for (var col = 0; col < numberOfColumns; col++) {
        var elem = this._buildColumn(col);
        frag.appendChild(elem);

        //XXX - DO I NEED THIS?
        this.columns[col] =  {
          elem : elem
        };
      }
      return frag;
    },
    _buildColumn: function (columnNumber) {
      var elem = document.createElement('div');
      elem.classList.add(COLUMNCLASSNAME);
      elem.classList.add(COLUMNCLASSNAME + columnNumber);
      elem.classList.add('col' + this.numberOfColumns); //XXX - May be able to remove this. Change CSS file.
      return elem;
    },

    // Add single view to layout
    add : function (view) {
      var wrappedView = this._wrapView(view);
      var layouts = view.model.get('layouts');
      var colNum = Number(layouts.column);
      this._addToColumns(wrappedView, colNum);

    },
    _wrapView: function (view) {
      if (view instanceof Wrapper) {
        return view;
      } else {
        return new Wrapper({
          view : view,
          layout : this
        });
      }
    },
    _addToColumns: function (wrappedView, columnNumber) {
      //if possible, Add to specific column, if not, add to first column
      var isAddable = this._isAddableToColumns(columnNumber);
      var query = '.' + COLUMNCLASSNAME + (isAddable ? columnNumber : 0);
      var elem = wrappedView.el;
      var col = this.layoutArea.querySelector(query);
      col.appendChild(elem);
    },
    _isAddableToColumns: function (columnNumber) {
      return _.isFinite(columnNumber) && columnNumber > -1 && this.numberOfColumns > columnNumber;
    },

    // Remove single view from layout
    remove : function (view) {
      view.el.parentNode.removeChild(view.el);
    },
  };

  return ColumnLayout;
});

