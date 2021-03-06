/*global require*/
"use strict";

var domainName = 'https://www.kdoveton.com';

var gulp = require('gulp'),
  path = require('path'),
  data = require('gulp-data'),
  pug = require('gulp-pug'),
  prefix = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  pump = require('pump'),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync'),
  sitemap = require('gulp-sitemap');

// var transformer = require('jstransformer');
// var markdown = transformer(require('jstransformer-markdown-it'));

/*
 * Directories here
 */
var paths = {
  public: './build/',
  js: './build/js/',
  css: './build/css/',
  images: './build/img/',
  data: './src/_data/',
  pug: './src/pug/',
  sass: './src/sass/',
  assets: './assets/',
  src: './src/'
};

/**
 * Compile .pug files and pass in data from json file
 * matching file name. index.pug - index.pug.json
 */
gulp.task('pug', function (cb) {
  pump([
    gulp.src([
      paths.pug+'/**/*.pug', 
      '!'+paths.pug+'/**/includes/**/*.pug', 
      '!'+paths.pug+'/**/_*.pug'
    ]),
    pug(),
    gulp.dest('./build/')
  ],function(e) {
    if(e) {
      console.log(e);
    }
    cb();
  });
  return;
});

gulp.task('js', function(cb) {
  // User
  pump([
    gulp.src('./src/js/user/*.js'),
    concat('dist.js'),
    uglify(),
    gulp.dest(paths.js)
  ],function() {
    
  });

  // Vendor
  pump([
    gulp.src('./src/js/vendor/*.js'),
    concat('vendor.js'),
    uglify(),
    gulp.dest(paths.js)
  ], function(e) {
    cb();
  });

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
    notify: true
  });
});

/**
 * Compile .scss files into public css directory With autoprefixer no
 * need for vendor prefixes then live reload the browser.
 */
gulp.task('sass', function (cb) {
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
  ], function(e) {
    if (e !== undefined) {
      console.log(e);
    }
    cb();
  });
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
gulp.task('build', ['sass', 'pug', 'js', 'sitemap']);

// gulp php
gulp.task('php', function() {
  gulp.src(paths.src + '**/*.php')
    .pipe(gulp.dest(paths.public));
})

gulp.task('assets', function() {
  gulp.src(paths.assets + '**/*.jpg')
    .pipe(gulp.dest(paths.images));
})

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync then watch
 * files for changes
 */
gulp.task('default', ['browser-sync', 'watch']);

gulp.task('sitemap', function (cb) {
  pump([
    gulp.src(paths.public + '/**/*.html', {
      read: false
    }),
    sitemap({
      siteUrl: domainName,
      fileName: 'sitemap.xml',
      changefreq: 'monthly',
      getLoc(siteUrl, loc, entry) {
        return loc.substr(0, loc.lastIndexOf('.html')) || loc; // Removes the file extension
      }
    }),
    gulp.dest(paths.public)
  ], function(err) {
    cb(null);
  });
});

// FTP DEPLOY
// var ftp = require('vinyl-ftp');
// var gutil = require('gulp-util');
// var minimist = require('minimist');
// var args = minimist(process.argv.slice(2));
// 
// gulp.task('deploy', function() {
//   var remotePath = '/kdoveton/';
//   var conn = ftp.create({
//     host: 'kdoveton.com',
//     user: args.user,
//     password: args.password,
//     log: gutil.log
//   });
//   gulp.src(['./public/**/*.*'])
//     .pipe(conn.newer(remotePath))
//     .pipe(conn.dest(remotePath));
// });
