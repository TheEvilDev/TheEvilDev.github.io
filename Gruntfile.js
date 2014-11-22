module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
       all: {
          src: ['<%= concat.dist.src %>'],
          options: {
            // options here to override JSHint defaults
            globals: {
              jQuery: true,
              console: true,
              module: true,
              document: true
            }
          }
       },
    },
    karma: {
      default: {
        configFile: "karma.conf.js"
      },
      unit: {
        configFile: 'karma.conf.js',
        runnerPort: 9999,
        singleRun: true,
        browsers: ['PhantomJS'],
        logLevel: 'ERROR'
      }
    },
    jekyll: {
      default: {
        options : {
          src: '<%= app %>',
          serve : true,
          port : 8000,
          auto : true
        }
      }
    },
    watch: {
      files: ['<%= jshint.all.src %>', 'tests/**/*.js'],
      tasks: ['test'],
      options: {
        spawn: false,
      }
    }
  });

  grunt.event.on('watch', function(action, filepath) {
    grunt.config('jshint.all.src', filepath);
  });

  // grunt watch to apply changes as they happen and test them
  grunt.registerTask('test', ['jshint','concat','uglify','karma:unit']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('run', ['default','jekyll']);

};