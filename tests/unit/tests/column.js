define(['underscore', 'layouts/column/Layout'], function ( _, Layout) {
  'use strict';

  var fixture;
  var layout;
  module('layouts#column', {
    setup: function() {
      fixture = document.getElementById('qunit-fixture');
      layout = new Layout(fixture);
    },
    teardown: function () {
      layout = null;
    }
  });


  function query(selector) {
    return fixture.querySelector(selector);
  }

  function queryAll(selector) {
    return fixture.querySelectorAll(selector);
  }
  function exists(selector) {
    return !!query(selector);
  }
  function doesNotExist(selector) {
    return !exists(selector);
  }
  function numberOfElements (selector) {
    return queryAll(selector).length;
  }
  function hasClass(className, elem) {
    return elem.classList.contains(className);
  }

  var colCss = '.column';
  var COLUMNCLASSNAME = 'column';
  var defaultNumOfCols = 6; //XXX
  test('Constructor with no other args creates default amount of columns', 1, function () {
    layout = new Layout(fixture);

    equal(numberOfElements(colCss), defaultNumOfCols, 'Default number of columns are created');
  });

  test('Columns are named approriately', 2, function () {
    var lastCol = colCss + (defaultNumOfCols - 1);
    ok(exists(lastCol));

    var passedLastCol = colCss + defaultNumOfCols;
    ok(doesNotExist(passedLastCol), 'Columns have appropriate CSS');
  });

  test('Contructor with given number',1 ,function () {
    var num = 3;
    layout = new Layout(fixture,num);
    equal(numberOfElements(colCss), num);
  });

  test('Titles added to columns', function () {
    var titles = ['a', 'b', 'c', 'dee', 'eeee' ];
    layout = new Layout(fixture,titles);

    equal(numberOfElements('.column-inner'), titles.length);

    var titleboxes = queryAll('.column-title');
    _.each(titleboxes, function(box, index) {
      equal(box.textContent, titles[index]);
    });

  });

  test('getColumn(number)', 3, function () {
    var col0 = layout.getColumn(0);
    var col1 = layout.getColumn(1);
    var col2 = layout.getColumn(2);


    ok(hasClass(COLUMNCLASSNAME + 0, col0));
    ok(hasClass(COLUMNCLASSNAME + 1, col1));
    ok(hasClass(COLUMNCLASSNAME + 2, col2));

  });
  test('getColumn with invalid number',1, function () {
    throws(function () {
      layout.getColumn(10000);
    });
  });

  function createTestElem() {
    var elem = document.createElement('div');
    elem.id = 'testElem';
    return elem;
  }
  test('prependToColumn', function () {
    var elem = createTestElem();
    layout.prependToColumn(0, elem);

    var col = layout.getColumn(0);
    equal(col.firstChild.id, elem.id);
  });

  test('appendToColumn', function () {
    var elem = createTestElem();
    layout.appendToColumn(0, elem);

    var col = layout.getColumn(0);
    equal(col.lastChild.id, elem.id);
  });

});
