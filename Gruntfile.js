'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-exec');

  grunt.initConfig({
    exec : {
      drop : {
        cmd : 'mongo corkboard --eval \'db.dropDatabase()\''
      },
      server : {
        cmd: 'node server/app.js'
      }
    }
  });

  grunt.registerTask('drop', 'Drop the database', ['exec:drop']);
  grunt.registerTask('server', 'Run the server', ['exec:server']);
};
