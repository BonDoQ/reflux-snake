var gulp = require('gulp');
var gutil = require('gulp-util');
var react = require('gulp-react');
var bower = require('gulp-bower');
var webserver = require('gulp-webserver');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var watch = require('gulp-watch');


// watch file Changes
gulp.task('watch', function () {
    return gulp.watch('src/**/*.*', ['develop']);
});

// copy Images
gulp.task('cpy-img', function(){
    return gulp.src(['img/**/*']).pipe(gulp.dest('dist/img'));
});
// clean build and dist folders
gulp.task('clean', function () {
    return gulp.src(['build/', 'dist/'])
        .pipe(clean());
});

// bower install
gulp.task('bower', function () {
    return bower()
});

// JS hint task
gulp.task('jshint', function () {
    return gulp.src(['src/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// JSX Compiling
gulp.task('reactJSX', function () {
    return gulp.src(['src/js/components/*.jsx'])
        .pipe(react())
        .pipe(gulp.dest('build/js/components'));
});


// JS / CSS Usemin
gulp.task('usemin', function () {
    return gulp.src('./index.html')
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            js: [uglify(), rev()],
            jslib: [uglify(), rev()]
        }))
        .pipe(gulp.dest('dist/'));
});

// JS WebServer
gulp.task('server', function () {
    return gulp.src('dist/')
        .pipe(webserver({
            open: true,
            fallback: 'index.html'
        }));
});

gulp.task('devServer', function () {
    return gulp.src('')
        .pipe(webserver({
            livereload: true,
            open: true,
            fallback: '../index.html'
        }));
});

gulp.task('develop', function (callback) {
    runSequence('clean', 'reactJSX', 'jshint', callback);
});

gulp.task('run', function (callback) {
    runSequence ('clean', 'bower', 'reactJSX', 'jshint', 'usemin', 'cpy-img', 'server', callback);
});