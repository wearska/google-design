'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function (options) {

    gulp.task('html', ['inject'], function () {

        var htmlFilter = $.filter('*.html');
        var jsFilter = $.filter('**/*.js');
        var cssFilter = $.filter('**/*.css');
        var assets;

        return gulp.src(options.tmp + '/serve/*.html')
            .pipe(assets = $.useref.assets())
            .pipe($.rev())
            .pipe(jsFilter)
            .pipe($.uglify({
                preserveComments: $.uglifySaveLicense
            })).on('error', options.errorHandler('Uglify'))
            .pipe(jsFilter.restore())
            .pipe(cssFilter)
            .pipe($.minifyCss())
            .pipe(cssFilter.restore())
            .pipe(assets.restore())
            .pipe($.useref())
            .pipe($.revReplace())
            .pipe(htmlFilter)
            .pipe($.minifyHtml({
                empty: true,
                spare: true,
                quotes: true,
                conditionals: true
            }))
            .pipe(htmlFilter.restore())
            .pipe(gulp.dest(options.dist + '/'))
            .pipe($.size({
                title: options.dist + '/',
                showFiles: true
            }));
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
                options.app + '/**/*',
                '!' + options.app + '/**/*.{css,js,scss,ttf}',
                '!' + options.app + '/index.html',
                '!' + options.app + '/**/components/**/*.js'
            ])
            .pipe(gulp.dest(options.dist + '/'));
    });

    gulp.task('clean', function (done) {
        $.del([options.dist + '/', options.tmp + '/'], done);
    });

    gulp.task('build', ['html', 'fonts', 'other']);

};
