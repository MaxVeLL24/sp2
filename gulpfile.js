var gulp = require('gulp'),
	connect = require('gulp-connect'),
  less = require('gulp-less');
var includer = require('gulp-htmlincluder');


gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

gulp.task('less', function () {
  return gulp.src('dev/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
});

    connect = require('gulp-connect');

gulp.task('minify-css', function() {
    return gulp.src('dev/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('html', function() {
    gulp.src('dev/**/*.html')
        .pipe(includer())
        .pipe(gulp.dest('build/'));
});

gulp.task('move', function(){
 gulp.src('dev/img/*.*').pipe(gulp.dest('build/img/'));
 connect.reload();
});

gulp.task('default', function(){
  gulp.start('connect', 'less', 'html', 'move');
  gulp.watch(['dev/less/**/**/*.less'], ['less']);
  gulp.watch(['dev/**/**/*.html'], ['html']);
  gulp.watch(['dev/img/**/*.*'], ['move']);
});