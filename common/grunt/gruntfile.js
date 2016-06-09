
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.config.merge({
    shell: {
      killNode: {
        options: { failOnError: false},
        command: 'pkill -f node'
      }
    },
    nodemon: {
      startNode: {
        options: {
          file: 'app.js',
          watchedFolders: ['app','common','app.js']
        }
      }
    }
  });

  //- Default task
  grunt.registerTask('default', function(){
    console.log('Hi, I am default. Who are you?');
  });

  //- Default task
  grunt.registerTask('startServer', ['shell:killNode', 'nodemon:startNode']);
};