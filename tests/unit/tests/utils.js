define(['utils'], function (utils) {
  'use strict';

  module('utils#capitalize');

  test('capitalizes text', function () {
    expect(1);
    var text = 'a uncapped sentence';
    equal(utils.capitalize(text), 'A uncapped sentence');
  });

});
