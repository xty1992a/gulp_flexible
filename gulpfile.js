var gulp = require('gulp');
var px2rem = require('postcss-px2rem')
var $ = require('gulp-load-plugins')();

var path = {
  input: {
    js: './src/js/',
    commonjs: './src/common/js/',
    commonSvg: './src/common/svg/*.svg'
  },
  output: {
    js: './dist/js'
  }
}

gulp.task('js', function () {
  return gulp.src([
    path.input.commonjs + 'extend.js',
    path.input.js + '*.js'
  ])
      .pipe($.concat('index.js'))
      // .pipe($.uglify())
      .pipe(gulp.dest(path.output.js))
      .pipe($.connect.reload());
});

gulp.task('svg', function () {
  return gulp.src(path.input.commonSvg)
      .pipe($.svgSprite({
        mode: {
          symbol: {
            prefix: `.svg-`,
            dimensions: {
              maxWidth: 32,
              maxHeight: 32
            },
            sprite: '../icon.svg',
            symbol: true,
            render: {
              css: {
                dest: '../icon.css'
              }
            }
          }
        }
      }))
      .pipe(gulp.dest('dist/common/svg'))
      .pipe($.connect.reload())
});

gulp.task('css', function () {
  var processors = [px2rem({remUnit: 75})];
  return gulp.src('./src/css/*.css')
      .pipe($.postcss(processors))
      .pipe(gulp.dest('./dist/css'))
      .pipe($.connect.reload());
});

gulp.task('html', function () {
  return gulp.src('./dist/pages/*.html')
      .pipe($.connect.reload());
});

gulp.task('copy', function () {
  return gulp.src('./src/common/js/zepto.js')
      .pipe($.uglify())
      .pipe(gulp.dest('./dist/common/js'))
});

gulp.task('connect', function () {
  $.connect.server({
    root: 'dist',
    port: '8000',
    livereload: true
  })
});

gulp.task('watch', function () {
  gulp.watch(['./dist/pages/*.html'], ['html'])
  gulp.watch([path.input.commonSvg], ['svg'])
  gulp.watch(['./src/css/*.css'], ['css'])
  gulp.watch(['./src/js/*.js'], ['js'])
});

gulp.task('default', ['css', 'svg', 'html', 'js', 'connect', 'watch']);
