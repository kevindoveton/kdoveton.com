/*global require*/
"use strict";

var gulp = require('gulp'),
  path = require('path'),
  data = require('gulp-data'),
  pug = require('gulp-pug'),
  prefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  pump = require('pump'),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync');

// var transformer = require('jstransformer');
// var markdown = transformer(require('jstransformer-markdown-it'));

/*
 * Directories here
 */
var paths = {
  public: './public/',
  js: './public/js/',
  css: './public/css/',
  data: './src/_data/'
};

/**
 * Compile .pug files and pass in data from json file
 * matching file name. index.pug - index.pug.json
 */
gulp.task('pug', function () {
	pump([
		gulp.src('./src/*.pug'),
		pug(),
		gulp.dest(paths.public)
	]);
	return;
});

gulp.task('js', function() {
	// User
	pump([
		gulp.src('./src/js/user/*.js'),
		concat('dist.js'),
		// uglify(),
		gulp.dest(paths.js)
	]);

	// Vendor
	pump([
		gulp.src('./src/js/vendor/*.js'),
		concat('vendor.js'),
		uglify(),
		gulp.dest(paths.js)
	]);

	return;
});

/**
 * Compile .scss files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function () {
	pump([
		gulp.src('./src/sass/*.sass'),
		sass({
			includePaths: [paths.sass],
			outputStyle: 'compressed'
		}),
		prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
			cascade: true
		}),
		gulp.dest(paths.css),
		browserSync.reload({
	      stream: true
	    })
	]);
	return;
});

/**
 * Recompile .pug files and live reload the browser
 */
gulp.task('rebuild', ['pug'], function () {
  browserSync.reload();
});

/**
 * Wait for pug and sass tasks, then launch the browser-sync Server
 */
gulp.task('browser-sync', ['sass', 'pug', 'js'], function () {
  browserSync({
    server: {
      baseDir: paths.public
    },
	tunnel: true,
    notify: true
  });
});

/**
 * Compile .scss files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function () {
	pump([
		gulp.src(paths.sass + '*.sass'),
		sass({
			includePaths: [paths.sass],
			outputStyle: 'compressed'
		}),
		prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
			cascade: true
		}),
		gulp.dest(paths.css),
		browserSync.reload({
	      stream: true
	    })
	]);
	return;
});

/**
 * Watch scss files for changes & recompile
 * Watch .pug files run pug-rebuild then reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(paths.sass + '**/*.sass', ['sass']);
  gulp.watch('./src/**/*.pug', ['rebuild']);
  gulp.watch('./src/includes/**/*.md', ['rebuild']);
  gulp.watch('./src/js/**/*.js', ['js', 'rebuild']);
});

// Build task compile sass and pug.
gulp.task('build', ['sass', 'pug', 'js']);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['browser-sync', 'watch']);
