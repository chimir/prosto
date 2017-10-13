'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var mqpacker = require('css-mqpacker');
var cssmin = require('gulp-cssmin');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');


var jsmin = require('gulp-jsmin');
var concat = require('gulp-concat');

var server = require('browser-sync').create();
var run = require('run-sequence');
var del = require('del');

gulp.task('style', function() {
  gulp.src('less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 2 versions'
      ]}),
      mqpacker({
        sort: false
      })
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(cssmin())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('html:copy', function() {
  return gulp.src('*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('html:update', ['html:copy'], function(done) {
  server.reload();
  done();
});

gulp.task('images', function() {
  return gulp.src('build/img/**/*.{png,jpg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('js', ['scripts'], function () {
  gulp.src('build/js/*.js')
    .pipe(jsmin())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('serve', ['style'], function() {
  server.init({
    server: 'build/'
  });

  gulp.watch('less/**/*.less', ['style']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('*.html', ['html:update']);
});


gulp.task('copy', function() {
  return gulp.src([
    'img/**',
    '*.html',
    'fonts/**',
    'plugins/**'
  ], {
    base: '.'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build');
});

gulp.task('build', function(fn) {
  run(
    'clean',
    'copy',
    'style',
    'js',
    'images',
    fn
  );
});
