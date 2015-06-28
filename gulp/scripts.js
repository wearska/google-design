'use strict';

var gulp = require('gulp');
var series = require('stream-series');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

module.exports = function(options) {
    gulp.task('scripts', function() {

        return gulp.src([
                options.app + 'modules/**/*.js'
            ])
            .pipe($.concat('google-design.js'))
            .pipe(gulp.dest(options.app))
            .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
            .pipe($.rename({
                suffix : '.min'
            }))
            .pipe(gulp.dest(options.app))
    });
};