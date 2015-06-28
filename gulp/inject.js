'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function (options) {

    gulp.task('inject',['styles', 'scripts'], function () {
        var injectStyles = gulp.src([
          options.app + 'google-design.css'
        ], {
            read: false
        });

        var injectScripts = gulp.src([
            options.app + 'google-design.js'
        ], {
            read: false,
        });

        var injectOptions = {
            addRootSlash: false
        };

        return gulp.src(options.app + 'index.html')
            .pipe($.inject(injectStyles, injectOptions))
            .pipe($.inject(injectScripts, injectOptions))
            .pipe(wiredep(options.wiredep))
            .pipe(gulp.dest(options.app));
    });
};
