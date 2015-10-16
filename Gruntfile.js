module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jade: {
      debug: {
        options: {
          data: {
            debug: true
          },
          pretty: true
        },
        files: {
          "debug/popup.html": "modules/jade/popup.jade"
        }
      },
      release: {
        options: {
          data: {
            debug: false
          },
          pretty: false
        },
        files: {
          "chrome-plugin/popup.html": ["modules/jade/popup.jade"],
        },
        compile: {
          expand: true
        }
      }
    },
    cssmin: {
      main: {
        src: 'chrome-plugin/assets/css/plugin.css',
        dest: 'chrome-plugin/assets/css/plugin.min.css'
      }
    },
    uglify: {
      js: {
        options: {
          preserveComments: true
        },
        files: {
          'chrome-plugin/assets/js/popup.min.js': 'chrome-plugin/assets/js/popup.js'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: ['modules/js/bundle.js'],
        dest: 'chrome-plugin/assets/js/popup.js'
      }
    },
    browserify: {
      extension: {
        options: {
          exclude: ['lapack']
        },
        src: ['index.js', 'modules/js/popup.js'],
        dest: 'modules/js/bundle.js'
      }
    },
    jsonmin: {
      extension: {
        options: {
          stripWhitespace: true,
          stripComments: true
        },
        files: {
          "chrome-plugin/assets/json/testData.min.json" : "testData.json",
          "chrome-plugin/manifest.json": "manifest.json"
        }
      }
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['browserify:extension', 'concat:js', 'uglify:js'],
        options: {
          spawn: false,
        },
      },
      json: {
        files: ['**/*.json', '!**/assets/**'],
        tasks: ['jsonmin:extension']
      },
      jade: {
        files: ['**/*.jade'],
        tasks: ['jade:debug', 'jade:release'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['**/*.css'],
        tasks: ['cssmin:main',],
        options: {
          spawn: false,
        },
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-jsonmin');

  //grunt.task.requires()
  grunt.registerTask('default', ['jade:debug', 'jade:release', 'browserify:extension', 'concat:js', 'uglify:js', 'cssmin:main', 'jsonmin:extension', 'watch']);
};

/*
# Only concat CSS files
grunt concat:css 

# Concat CSS and JS files, but don't do anything else