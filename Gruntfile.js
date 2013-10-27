'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-exec');
  grunt.initConfig({
    exec : {
      drop : {
        cmd : "mongo corkboard --eval 'db.dropDatabase()'"
      }
    }
  });

  grunt.registerTask('drop', ['exec:drop']);
};
