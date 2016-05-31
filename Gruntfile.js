module.exports = function(grunt) {
  grunt.initConfig({
    config: require('./common/config/gruntConfig.js')
  });

  grunt.loadTasks('common/grunt');
};