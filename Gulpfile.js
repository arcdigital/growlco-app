var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var concat     = require('gulp-concat');
var plumber    = require('gulp-plumber');
var traceur    = require('gulp-traceur');
var watch      = require('gulp-watch');

var sources = ['./src/**/*.js'];
//var tests  = ['./test/**/*.js'];
var out = './out/';

gulp.task('default', function () {
	gulp.src('./src/index.js')
		.pipe(traceur({
			experimental: true
		}))
		.pipe(browserify())
		.pipe(gulp.dest(out));
});
