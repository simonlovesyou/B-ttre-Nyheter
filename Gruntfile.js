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
        src: 'chrome-plugin/assets/css/settings.css',
        dest: 'chrome-plugin/assets/css/settings.min.css'
      }
    },
    uglify: {
      js: {
        options: {
          preserveComments: true
        },
        files: {
          'chrome-plugin/assets/js/inject.min.js': 'chrome-plugin/assets/js/inject.js',
          'chrome-plugin/assets/js/options.min.js': 'chrome-plugin/assets/js/options.js'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      css: {
        src: ['modules/css/settings.css'],
        dest: 'chrome-plugin/assets/css/settings.css'
      },
      js: {
        src: ['modules/js/bundle.js', 'node_modules/jquery/dist/jquery.min.js'],
        dest: 'chrome-plugin/assets/js/inject.js'
      },
      options_page: {
        src: ['modules/js/options.js'],
        dest: 'chrome-plugin/assets/js/options.js'
      }
    },
    browserify: {
      extension: {
        options: {
          exclude: ['lapack']
        },
        src: ['index.js', 'modules/js/inject.js'],
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
          "chrome-plugin/assets/json/testData.min.json" : "modules/json/trainData.json",
          "chrome-plugin/manifest.json": "modules/json/manifest.json"
        }
      }
    },
    clean: {
      build: {
        src: ["./modules/js/bundle.js", "./chrome-plugin/assets/settings.css", "./chrome-plugin/assets/js/options.js", "./chrome-plugin/assets/js/inject.js"]
      },
      bundle: "./modules/js/bundle.js"
    },
    compress: {
      deploy: {
        options: {
          archive: 'Bättre_Nyheter.zip'
        },
        files: 
        [
          {
            src: ['chrome-plugin/**'], dest: './'
          }
        ]
      }
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['browserify:extension', 'concat:js', 'concat:options_page', 'uglify', 'clean'],
        options: {
          spawn: false,
        },
      },
      json: {
        files: ['**/*.json', '!**/chrome-plugin/**'],
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
        tasks: ['concat:css', 'cssmin:main',],
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
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');

  //grunt.task.requires()
  grunt.registerTask('default', ['jade:debug', 'jade:release', 'browserify:extension', 'concat', 'uglify', 'jsonmin', 'clean:bundle', 'watch']);
  grunt.registerTask('deploy', ['jade:release', 'browserify:extension', 'concat', 'uglify', 'cssmin:main', 'jsonmin:extension', 'clean', 'compress']);
};