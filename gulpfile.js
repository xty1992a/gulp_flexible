var gulp = require('gulp');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
var connect = require('gulp-connect');
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')

var path = {
  input: {
    js: './src/js/',
    commonjs: './src/common/js/'
  },
  output: {
    js: './dist/js'
  }
}

gulp.task('css', function () {
  var processors = [px2rem({remUnit: 75})];
  return gulp.src('./src/css/*.css')
      .pipe(postcss(processors))
      .pipe(gulp.dest('./dist/css'))
      .pipe(connect.reload());
});

gulp.task('html', function () {
  return gulp.src('./dist/pages/*.html')
      .pipe(connect.reload());
});

gulp.task('js', function () {
  // return gulp.src('./src/js/*.js')
  return gulp.src([
    // path.input.commonjs + 'zepto.js',
    path.input.commonjs + 'extend.js',
    path.input.js + '*.js'
  ])
      .pipe(concat('index.js'))
      // .pipe(uglify())
      .pipe(gulp.dest(path.output.js))
      .pipe(connect.reload());
});

gulp.task('copy', function () {
  return gulp.src('./src/common/js/zepto.js')
      .pipe(uglify())
      .pipe(gulp.dest('./dist/common/js'))
})

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
