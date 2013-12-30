define(['underscore', 'layouts/column/Wrapper', 'utils'], function ( _ , Wrapper, utils) {
  'use strict';

  var DEFAULTNUMCOLUMNS = 6;
  var LAYOUTCLASSNAMES = 'layout layout-column';
  var COLUMNCLASSNAME = 'column';
  var ColumnLayout = function (parentElem, option) {

    if (!parentElem) {
      utils.error('Need container element');
    }

    if (Array.isArray(option) && option.length > 0) {
      this.numberOfColumns = option.length;
      this.columnTitles = option;
    } else if (_.isFinite(option) && option <= 0) {
      utils.error('Invalid option argument');
    } else {
      this.columnTitles = null;
      this.numberOfColumns = option || DEFAULTNUMCOLUMNS;
    }

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

      //XXX Gross.
      LAYOUTCLASSNAMES.split(' ').forEach(_.bind(layoutArea.classList.add,layoutArea.classList));

      var columns = this._buildColumns(this.columnTitles);
      layoutArea.appendChild(columns);
      return layoutArea;
    },
    _buildColumns: function (titles) {
      if (Array.isArray(titles)) {
        return this._buildColumnsWithTitles(titles);
      }
      else {
        return this._buildColumnsWithoutTitles(this.numberOfColumns);
      }
    },
    _buildColumnsWithoutTitles: function (numberOfColumns) {
      var frag = document.createDocumentFragment();
      for (var col = 0; col < numberOfColumns; col++) {
        var elem = this._buildColumnWithoutTitle(col);
        frag.appendChild(elem);

        //XXX - DO I NEED THIS?
        this.columns[col] =  {
          elem : elem
        };
      }
      return frag;
    },
    _buildColumnsWithTitles: function (titles) {
      var frag = document.createDocumentFragment();
      _.each(titles, function (title, col) {
        var elem  = this._buildColumnWithTitle(title, col);
        frag.appendChild(elem);

        //XXX - DO I NEED THIS?
        this.columns[col] =  {
          elem : elem
        };
      }, this);
      return frag;

    },
    _buildColumnWithoutTitle: function (columnNumber) {
      var elem = document.createElement('div');
      elem.classList.add(COLUMNCLASSNAME);
      elem.classList.add(COLUMNCLASSNAME + columnNumber);
      elem.classList.add('col' + this.numberOfColumns); //XXX - May be able to remove this. Change CSS file.
      elem.innerHTML = '<div class="column-inner"></div>';
      return elem;
    },
    _buildColumnWithTitle: function (title, columnNumber) {
      var column = this._buildColumnWithoutTitle(columnNumber);
      var elem = document.createElement('div');
      elem.innerHTML = title;
      elem.className = 'column-title';
      column.insertBefore(elem, column.firstChild);
      return column;
    },

    // Add single view to layout
    add : function (view) {
      var wrappedView = this._wrapView(view);
      var layouts = view.model.get('layouts');
      var colNum = Number(layouts.column);
      this._addToColumn(wrappedView, colNum);
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
    _addToColumn: function (wrappedView, columnNumber) {
      var elem = wrappedView.el;
      this._getInnerColumn(columnNumber).appendChild(elem);
    },
    _getInnerColumn: function (columnNumber) {
      //if possible, Add to specific column, if not, add to first column
      var isAddable = this._isAddableToColumns(columnNumber);
      var query = '.' + COLUMNCLASSNAME + (isAddable ? columnNumber : 0) + '> .column-inner';
      return this.layoutArea.querySelector(query);
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

