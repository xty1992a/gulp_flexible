var gulp = require('gulp');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
var connect = require('gulp-connect');

gulp.task('css', function () {
  var processors = [px2rem({remUnit: 75})];
  return gulp.src('./src/css/*.css')
      .pipe(postcss(processors))
      .pipe(gulp.dest('./dist/css'))
      .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('./dist/pages/*.html')
      .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./src/js/*.js')
      .pipe(gulp.dest('./dist/js'))
      .pipe(connect.reload());
});

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    port: '8000',
    livereload: true
  })
});


gulp.task('watch', function () {
  gulp.watch(['./dist/pages/*.html'], ['html'])
  gulp.watch(['./src/css/*.css'], ['css'])
  gulp.watch(['./src/js/*.js'], ['js'])
});

gulp.task('default', ['css', 'html', 'js', 'connect', 'watch']);
