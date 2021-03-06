module.exports = function(grunt) {

  const sass = require('node-sass');  

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    responsive_images: {
      myTask: {
        options: {
          quality: 80,
          sizes: [{
            width: 320,
          },{
            width: 640,
          },{
            width: 1024,
          },{
            width: 2048,
          }]
        },
        files: [{
          expand: true,
          src: ['**.*'],
          cwd: './assets/img-src',
          dest: './assets/img-dest'
        }]
      }},


    imageoptim: {
      all: {
        options: {
          jpegMini: false,
          imageAlpha: true,
          quitAfter: true
        },
        src: ['assets/img-dest/**/*.*']
      }
    },

    sass: {
      options: {
        compress: false,
        sourcemap: 'none',
        implementation: sass
      },
      scss: {
        files: [
          {
            expand: true,
            cwd: 'assets/css/',
            src: ['*.scss'],
            dest: 'assets/css/',
            ext: '.min.css'
          }
        ]
      }
    },

    postcss: {
      options: {
        processors: [require('autoprefixer'), require('csswring')]
      },
      mincss: {
        files: [
          {
            expand: true,
            cwd: 'assets/css/',
            src: ['*.min.css'],
            dest: 'assets/css/'
          }
        ]
      }
    },

    shell: {
      jekyll: {
        command: 'bundle exec jekyll build'
      },
      archive: {
        command: 'ruby archive/_generator.ruby'
      }
    },


    copy: {
      mincss: {
        expand: true,
        cwd: 'assets/css/',
        src: ['*.min.css'],
        dest: '_site/assets/css/'
      },
      includes: {
        expand: true,
        cwd: 'assets/css/',
        src: ['*.min.css'],
        dest: '_includes/'
      },
      images: {
        expand: true,
        cwd: 'assets/img-src/',
        src: ['**/*.*'],
        dest: 'assets/img-dest/'
    }
    },


    watch: {
      css: {
        files: ['assets/css/*.scss'],
        tasks: ['sass', 'postcss', 'copy:mincss', 'copy:includes', 'shell:jekyll']
      },
      jekyll: {
        files: ['*.html', '*.md', '*.yml', '*.png', '*.ico', '*.xml', '_includes/**', '_layouts/*', '_posts/*', 'archive/*', 'assets/img/**'],
        tasks: ['archive']
      }
    },

    browserSync: {
      bsFiles: {
        src : './_site/**/*.*'
      },
      options: {
        open: false,
        watchTask: true,
        server: {
          baseDir: "./_site"
        }
      }
    }
  });

  grunt.registerTask('archive', ['shell:jekyll', 'shell:archive', 'shell:jekyll'])

  grunt.registerTask('image', ['newer:imageoptim:all']);
  
  grunt.registerTask('build', ['sass', 'postcss', 'copy:mincss', 'copy:includes', 'responsive_images', 'image', 'archive']);

  grunt.registerTask('serve', ['build', 'browserSync', 'watch']);

}
