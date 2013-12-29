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
    //Insert tests here
    'tests/utils.js'
  ], function () {
    QUnit.start();
  });

})();

