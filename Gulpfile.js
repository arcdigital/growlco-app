var gulp    = require('gulp');
var plumber = require('gulp-plumber');
var traceur = require('gulp-traceur');
var watch   = require('gulp-watch');

var sources = ['./src/**/*.js'];
var runtime = './node_modules/gulp-traceur/node_modules/'
            + 'traceur/bin/traceur-runtime.js';
//var tests  = ['./test/**/*.js'];
var out = './out/';

gulp.task('default', function () {
	gulp.src(sources)
		.pipe(watch(function (files) {
			return files
				.pipe(plumber())
				.pipe(traceur({
					experimental: true
				}))
				.pipe(gulp.dest(out));
		}));
	gulp.src(runtime)
		.pipe(gulp.dest(out));
});
