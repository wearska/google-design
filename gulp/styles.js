'use strict';

var gulp = require('gulp');
var series = require('stream-series');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

module.exports = function(options) {
    gulp.task('styles', function() {

        var sassOptions = {
            style: 'expanded'
        };

        var variables = gulp.src([options.app + 'modules/core/styles/variables/**/*.scss'], {read: false});
        var base = gulp.src([options.app + 'modules/core/styles/base/**/*.scss'], {read: false});
        var layout = gulp.src([options.app + 'modules/core/styles/layout/**/*.scss'], {read: false});
        var animations = gulp.src([options.app + 'modules/core/styles/animations/**/*.scss'], {read: false});
        var components = gulp.src([options.app + 'modules/components/**/*.scss'], {read: false});

        var injectOptions = {
            transform: function(filePath) {
                //filePath = filePath.replace(options.app + '/styles/', '');
                return '@import \'' + filePath + '\';';
            },
            starttag: '// injector',
            endtag: '// endinjector',
            addRootSlash: false
        };


        return gulp.src([
                options.app + 'modules/google-design.scss'
            ])
            .pipe($.inject(series(variables, base, layout, animations, components), injectOptions))
            //.pipe(gulp.dest(options.app + 'modules/'))
            .pipe($.sass(sassOptions)).on('error', options.errorHandler('Sass'))
            .pipe($.autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })).on('error', options.errorHandler('Autoprefixer'))
            .pipe(gulp.dest(options.app))
            .pipe($.minifyCss())
            .pipe($.rename({
                suffix : '.min'
            }))
            .pipe(gulp.dest(options.app))
    });
};