var gulp = require('gulp');
var injectPartials = require('gulp-inject-partials');
var watch = require('gulp');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var sassGlob = require('gulp-sass-glob');
var importer = require('node-sass-globbing');
var mustache = require('gulp-mustache');
var hb = require('gulp-hb');
var log = require('fancy-log');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var del = require('del');

const sass = require('gulp-sass')(require('sass'));
const { series } = require('gulp');

var paths = {
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/styles/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/scripts/'
  }
};

// Default configuration.
var config = {
  scss: './src/**/*.scss', // The top level scss files that include all other scss.
  watch: ['./node_modules/bootstrap/scss/bootstrap.scss', './src/**/*.scss'], // All scss files that should trigger a recompile.
  css: './dist/css', // The path to the generated css files.
  node_modules: './node_modules', // The path to the node modules directory.
};

// Error notifications
var reportError = function(error) {
  notify({
    title: 'Gulp Task Error',
    message: 'SASS Error, check console logs.'
  }).write(error);
  console.log(error.toString());
  this.emit('end');
}

// Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function() {
//   return gulp.src(config.scss)
//     .pipe(sourcemaps.init())
//     .pipe(sassGlob())
//     .pipe(sass())
//     .on('error', reportError)
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(config.css))
// });

// CSS task
function css() {
  return gulp.src(config.scss)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass({
      sourceComments: 'map',    // Add comments to the compiles css file
      sourceMap: 'sass',        // The comments will be mapped to the source scss file
      outputStyle: "expanded"   // Makes the css more human-readable. Setting to "nested" would make the file a bit smaller.
    }))
    .pipe(gulp.dest(config.css))  // Output the css files in the css directory
    .pipe(browserSync.stream());
}

function compile() {
  // return gulp.src('./src/04-content/test-mustache/*')
  //   .pipe(mustache('./src/04-content/test-mustache/test-mustache.json'))
  //   .pipe(gulp.dest('./dist'));  

  del(['./dist/**/*.html']).then(paths => {
    console.log('Deleted html files:\n', paths.join('\n'));
  });

  var options = {
    debug: false,
    parsePartialName: function(options, file) {
      //log(file);
      return file.path
        .replace(file.base, '')
        .split(/[\/]/)
        .pop()
        .split(/\./)
        .slice(-2)[0]
    },
    parseDataName: function(options, file) {
      //log(file);
      return file.path
        .replace(file.base, '')
        .split(/[\/]/)
        .pop()
        .split(/\./)
        .slice(-2)[0]
    }
  };

  return gulp.src('./src/**/*.html')
  .pipe(hb(options)
    .partials('./src/**/*.hbs')
    .helpers('./src/helpers/*.js')
    .data('./src/**/*.json')
  )
  .pipe(rename({dirname: ''}))
  .pipe(gulp.dest('./dist'));

  // return gulp.src('./src/05-pages/**/*.html')
  //         .pipe(injectPartials({
  //           start: '<## {{path}}>',
  //           end: '</##>'
  //         }))
  //         .pipe(gulp.dest('./dist'));
}

// Watch the scss files and push changes automatically.
function watchFiles() {
  // Setup a browsersync server.
  browserSync.init({
    proxy: 'http://appserver', // Could be 'http://appserver' if you're running apache or ngnix http://appserver_nginx'
    socket: {
      domain: 'https://handlebars.lndo.site', // The node proxy domain you defined in .lando.yaml. Must be https?
      port: 80 // NOT the 3000 you might expect.
    },
    open: false,
    logLevel: "debug",
    logConnections: true,
  });
  // Trigger the scss-compile task whenever any file in the defined location changes.
  gulp.watch(config.watch, css);
  gulp.watch(['./src/**/*.html', './src/**/*.hbs', './src/**/*.json'], compile);
  gulp.watch("./dist/pages/*.html").on('change', browserSync.reload);
}

// Export the functions so we can call them from the command line
exports.watch = watchFiles;
exports.css = css;
exports.compile = compile;

exports.build = series(css, compile);

// By setting the default, we can simply run 'lando gulp' to start watching for changes.
exports.default = watchFiles;