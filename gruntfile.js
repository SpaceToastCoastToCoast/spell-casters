module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // this is where you set up your Sass settings. Once you know what you're doing, you can change thse.
    Sass: {
      dist: {
      options: {
        style: 'compressed'
        },
      files: {
        'style.css': 'Sass/style.scss'
        }
      }
    }
  });
// this is where you say, hey, I'm using that Sass thing that I just created settings for.
grunt.loadNpmTasks('grunt-contrib-Sass');
// this is where you have Grunt compile your Sass when you type "grunt" into the terminal
grunt.registerTask('default', ['Sass']);
};