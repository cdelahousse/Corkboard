"use strict";

module.exports.index = function(req, res){
  var pathClient = require('../config').pathClient;
  res.sendfile(pathClient + '/index.html');
};
