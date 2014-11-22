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
        files: {
          'dist/css/main.css': 'src/css/main.scss'
        }
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
      tasks: ['clean','lint','minify','test'],
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
    if(filepath.indexOf('.js') > 0){
      grunt.config('jshint.all.src', filepath);
    }
    if(filepath.indexOf('.scss') > 0){
      grunt.config('scsslint.allFiles', filepath);
    }
  });

  // grunt watch to apply changes as they happen and test them
  grunt.registerTask('lint', ['jshint','scsslint']);
  grunt.registerTask('minify', ['concat','uglify','sass:dist','cssmin']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('run', ['concurrent:run']);
  
  // Default task runs everything
  grunt.registerTask('default', ['clean','lint','minify','test','run']);
};