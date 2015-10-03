module.exports = function(grunt) {

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
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

  grunt.registerTask('build', ['sass', 'postcss', 'shell:jekyll']);

  grunt.registerTask('serve', ['build', 'browserSync', 'watch']);
}