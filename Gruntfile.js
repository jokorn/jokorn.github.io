module.exports = function(grunt) {

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    responsive_images: {
      myTask: {
        options: {
          quality: 90,
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
          dest: './assets/img-src/responsive'
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
        sourcemap: 'none'
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
        command: 'jekyll build'
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
        tasks: ['sass', 'postcss','copy:mincss']
      },
      jekyll: {
        files: ['*.html', '*.md', '*.yml', '*.png', '*.ico', '*.xml', '_includes/**', '_layouts/*', '_posts/*', 'assets/img/**'],
        tasks: ['shell:jekyll']
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

  grunt.registerTask('image', ['newer:copy:images','newer:imageoptim:all']);
  
  grunt.registerTask('build', ['sass', 'postcss', 'copy:mincss', 'copy:includes', 'responsive_images', 'image', 'shell:jekyll']);

  grunt.registerTask('serve', ['build', 'browserSync', 'watch']);

}