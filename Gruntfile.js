module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        options: {
          separator: '\n\n',

        },
        dist: {
          src: ['src/js/**/*.js'],
          dest: 'dist/js/<%= pkg.name %>.js'
        }
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css/',
          ext: '.min.css'
        }]
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        mangle: true,
        compress: true
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
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
          auto : true,
          watch : true
        }
      }
    },
    watch: {
      files: ['<%= jshint.all.src %>', 'src/tests/**/*.js','src/css/**/*.css'],
      tasks: ['test'],
      options: {
        spawn: false,
      }
    },
    concurrent: {
      run: {
          tasks: ['default','jekyll','watch'],
          options: {
              logConcurrentOutput: true
          }
      }
    }
  });

  grunt.event.on('watch', function(action, filepath) {
    grunt.config('jshint.all.src', filepath);
  });

  // grunt watch to apply changes as they happen and test them
  grunt.registerTask('test', ['default','karma:unit']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify','cssmin']);
  grunt.registerTask('run', ['concurrent:run']);

};