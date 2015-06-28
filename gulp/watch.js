'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

function isOnlyChange(event) {
    return event.type === 'changed';
}

module.exports = function(options) {

    gulp.task('watch', ['inject'], function() {

        gulp.watch([options.app + '/*.html', 'bower.json'], ['inject']);

        gulp.watch([
            options.app + 'modules/**/*.scss'
        ], function(event) {
            if (isOnlyChange(event)) {
                gulp.start('styles');
            } else {
                gulp.start('styles');
            }
        });

        gulp.watch(options.app + 'modules/**/*.js', function(event) {
            if (isOnlyChange(event)) {
                gulp.start('scripts');
            } else {
                gulp.start('scripts');
            }
        });
    });

};
