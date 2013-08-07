"use strict";

var path = require('../config').path;

module.exports.index = function(req, res){
  res.sendfile(path + '/public/index.html');
};
