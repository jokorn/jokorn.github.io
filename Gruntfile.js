module.exports = function(grunt) {

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    
    responsive_images: {
    myTask: {
      options: {
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
        src: ['**.{jpg,gif,png}'],
        cwd: './assets/img-src',
        dest: './assets/img-src/responsive'
      }]
    }},
    
    
    imagemin: {
    all: {
        options: {
            progressive: true,
            optimizationLevel: 7
        },
        files: [{
            expand: true,
            cwd: './assets/img-src',
            src: ['**/*.*'],
            dest: './assets/img-dest/'
        }]
    }},
    
    
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

  grunt.registerTask('build', ['sass', 'postcss', 'copy:mincss', 'copy:includes', 'responsive_images', 'newer:imagemin', 'shell:jekyll']);

  grunt.registerTask('serve', ['build', 'browserSync', 'watch']);
  
  grunt.registerTask('image', ['newer:imagemin']);
}