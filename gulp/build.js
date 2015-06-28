'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

module.exports = function(options) {

    gulp.task('build', ['inject', 'other', 'clean'], function () {
      var jsFilter = $.filter('**/*.js');
      var cssFilter = $.filter('**/*.css');
      var assets;

      return gulp.src(options.app + 'index.html')
      .pipe(assets = $.useref.assets())
      .pipe(jsFilter)
      .pipe($.ngAnnotate())
      .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
      .pipe(jsFilter.restore())
      .pipe(cssFilter)
      .pipe($.minifyCss())
      .pipe(cssFilter.restore())
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe(gulp.dest(options.dist + '/'))
      .pipe($.size({ title: options.dist + '/', showFiles: true }));
    });

    // Only applies for fonts from bower dependencies
    // Custom fonts are handled by the "other" task
    gulp.task('fonts', function () {

        return gulp.src($.mainBowerFiles())
            .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
            .pipe($.flatten())
            .pipe(gulp.dest(options.dist + '/fonts/'));
    });

    gulp.task('fontconvert', function () {
        return gulp.src([
                options.app + '/fonts/**/*.ttf'
            ])
            .pipe($.ttf2woff())
            .pipe(gulp.dest(options.dist + '/fonts/'));
    });

    gulp.task('other', ['fontconvert'], function () {
        return gulp.src([
                options.app + '**/*',
                options.app + '.htaccess',
                '!' + options.app + '/**/*.{css,js,scss,ttf,json}',
                '!' + options.app + 'index.html',
                '!' + options.app + 'scripts/**/*',
                '!' + options.app + 'scripts',
                '!' + options.app + 'styles/**/*',
                '!' + options.app + 'styles',
                '!' + options.app + 'node_modules/**/*',
                '!' + options.app + 'node_modules',
                '!' + options.app + 'bower_components/**/*',
                '!' + options.app + 'bower_components',
                '!' + options.app + 'gulp/**/*',
                '!' + options.app + 'gulp'
            ])
            .pipe(gulp.dest(options.dist + '/'));
    });
};
