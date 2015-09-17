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
    }
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
          'chrome-plugin/popup.min.js': 'chrome-plugin/popup.js'
        }
      }
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['concat:js', 'uglify:js'],
        options: {
          spawn: false,
        },
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.task.requires()
  grunt.registerTask('default', ['concat:basic', 'jade:debug', 'jade:release', 
                      , 'uglify:js', 'cssmin:main', 'cssmin:blog',
                      'watch']);
};

/*
# Only concat CSS files
grunt concat:css 

# Concat CSS and JS files, but don't do anything else
grunt concat
*/