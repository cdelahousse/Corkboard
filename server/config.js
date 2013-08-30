"use strict";

// Global configuration contents

var config = {};

var path = require('path');
config.path = path.join(__dirname, '..');
config.pathClient = path.join(config.path , '/client');
config.pathServer = path.join(config.path , '/server');
config.dbUrl = 'mongodb://localhost/corkboard';

module.exports = config;
