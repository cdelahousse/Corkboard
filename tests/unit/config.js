/** Any Unit Test configuration code should go here */
(function () {
  'use strict';

  require.config({
    baseUrl: '../../client/scripts/',
    paths: {
      'tests': '../../tests/unit/tests'
    }
  });

  QUnit.config.autostart = false;

  require([
    'tests/utils.js',
    'tests/column.js'
  ], function () {
    QUnit.start();
  });

})();

