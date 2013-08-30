// Generated on 2013-08-07 using generator-webapp 0.2.7
'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-exec');
  grunt.initConfig({
    exec : {
      drop : {
        cmd : "mongo corkboard --eval 'db.dropDatabase()'"
      },
      reset : {
        cmd : function () {
          return 'mongoimport -d corkboard -c notes --file demo/notes.json';
        }
      }
    }
  });


  grunt.registerTask('reset', ['exec:drop', 'exec:reset']);
};
