var exec = require('child_process').exec;

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    scsslint: {
      allFiles: ['src/css/**/*.scss']
    },
    clean: ["dist/js", "dist/css"],
    concat: {
        options: {
          separator: '\n\n',
        },
        dist: {
          src: ['src/js/**/*.js'],
          dest: 'dist/js/<%= pkg.name %>.js'
        }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.scss'],
          dest: 'dist/',
          ext: '.css'
        }]
      }
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          src: ['dist/css/main.css'],
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
      files: ['<%= jshint.all.src %>', 'src/tests/**/*.js','src/css/**/*.scss'],
      tasks: ['test'],
      options: {
        spawn: false,
      }
    },
    concurrent: {
      run: {
          tasks: ['jekyll','watch'],
          options: {
              logConcurrentOutput: true
          }
      }
    }
  });

  grunt.event.on('watch', function(action, filepath) {
    grunt.config('jshint.all.src', filepath);
  });

  grunt.registerTask('launch', 'Launches web browser', function(){
    exec('open -a Chrome "http://localhost:8000"');
  });

  // grunt watch to apply changes as they happen and test them
  grunt.registerTask('lint', ['jshint','scsslint']);
  grunt.registerTask('minify', ['clean','concat','uglify','sass:dist','cssmin']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('run', ['launch','concurrent:run']);
  
  // Default task runs everything
  grunt.registerTask('default', ['lint','minify','test','run']);
};