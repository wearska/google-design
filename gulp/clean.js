'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});
var wiredep = require('wiredep').stream;

module.exports = function(options) {
    gulp.task('clean', function(done) {
        $.del([options.dist + '/'], done);
    });
}
