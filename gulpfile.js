'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
 
gulp.task('sass', function () {
  return gulp.src('./src/assets/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/assets/styles/css'));
});
 
gulp.task('watch', function () {
  gulp.watch('./src/assets/styles/**.scss', ['sass']);
});

