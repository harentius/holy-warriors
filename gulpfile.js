'use strict';

let gulp = require('gulp'),
  fs = require('fs'),
  argv = require('yargs').argv,
  less = require('gulp-less'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  nunjucks = require('gulp-nunjucks'),
  minify = require('gulp-minify'),
  cleanCSS = require('gulp-clean-css'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer')
;

// Environment detecting
let env = argv.env || 'prod',
  confFile = 'build-config.json'
;

if (!fs.existsSync(confFile)) {
  throw `Config file ${confFile} not found`;
}

let config = JSON.parse(fs.readFileSync(confFile, 'utf8'));
let platform = config.platform;

if (!argv.env) {
  env = config.env;
}

gulp.task('less', function() {
  let resource = gulp.src('./src/css/**/*.less')
    .pipe(less())
    .pipe(concat('style.css'))
  ;

  if (env === 'prod') {
    resource = resource.pipe(cleanCSS())
  }

  resource.pipe(gulp.dest('./www/css/'))
});

gulp.task('js', function() {
  let resource = browserify({
      entries: [`./src/js/${platform}/app.js`, './node_modules/event-class/EventClass.js'],
      debug: false
    })
      .transform(babelify, {presets: ['es2015']})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
  ;

  if (env === 'prod') {
    resource = resource
      .pipe(minify({
        noSource: true,
        ext: {
          min: '.js'
        }
      }))
    ;
  }

  resource.pipe(gulp.dest('./www/js'));
});

gulp.task('template', function() {
  return gulp.src(`./src/templates/index_${platform}.html.nunj`)
    .pipe(nunjucks.compile({
      assetVersion: Math.random().toString(36).substr(2, 15),
      env: env,
      debug: env === 'dev',
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./www/'))
    ;
});

let tasks = ['js', 'less', 'template'];

if (env === 'dev') {
  gulp.task('watch', function() {
    gulp.watch(['./src/js/**/*.js'], ['js']);
    gulp.watch(['./src/templates/*'], ['template']);
    gulp.watch(['./src/css/**/*.less'], ['less']);
  });

  tasks.push('watch');
}

gulp.task('default', tasks);
