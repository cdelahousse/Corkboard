
module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');

  var TEST_SERVER_PORT = 9999;
  grunt.initConfig({
    qunit: {
      'unit': {
        options: {
          urls: [
            'http://localhost:' + TEST_SERVER_PORT + '/tests/unit/index.html'
          ]
        }
      }
    },
    connect: {
      'test-server': {
        options: {
          port: TEST_SERVER_PORT,
          base: '.',
        }
      }
    },
    exec : {
      drop : {
        cmd : 'mongo corkboard --eval \'db.dropDatabase()\''
      },
      server : {
        cmd: 'node server/app.js'
      }
    }
  });

  grunt.registerTask('unit', 'Run unit tests', ['connect:test-server', 'qunit:unit']);
  grunt.registerTask('drop', 'Drop the database', ['exec:drop']);
  grunt.registerTask('server', 'Run the server', ['exec:server']);
};
