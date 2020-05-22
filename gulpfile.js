const { src, dest, parallel, watch, task, series } = require('gulp')
// const pug = require('gulp-pug')
// const gulp = require('gulp');
// const validator = require('gulp-html');
const scss = require('gulp-sass')
const gulplog = require('gulplog')
const notifier = require('node-notifier')
const bs = require('browser-sync')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

console.log(webpackConfig)

//
// HTML
//

// const html = () => {
//   return gulp.src('html/index.html')
//     .pipe(validator({
//       errorHandler: notify.onError(function (err) {
//         return {
//           title: 'HTML Error',
//           message: err.message
//         }
//       })
//     }))
//     .pipe(gulp.dest('build/'));
// };

function html() {
  return src('html/*.html')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'html Error',
          message: err.message
        }
      })
    }))
    // .pipe(pug({
    //   pretty: true
    // }))
    .pipe(dest('build'))
}



//
// CSS
//

function css() {
  return src('scss/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'SCSS Error',
          message: err.message
        }
      })
    }))
    .pipe(scss())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(dest('build/css'))
}



//
// JS
//

task('webpack', function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if (!err) { // no hard error
      // try to get a soft error from stats
      err = stats.toJson().errors[0];
    }

    if (err) {
      notifier.notify({
        title: 'Webpack',
        message: err
      })

      gulplog.error(err)
    } else {
      gulplog.info(stats.toString({ colors: true }))
    }

    callback()
  })
})



//
// Copy images, fonts
//

function copyImg() {
  return src('img/**/*.{jpg,jpeg,gif,png,svg}').pipe(dest('build/img'))
}

function copyFonts() {
  return src('fonts/*.*').pipe(dest('build/fonts'))
}



//
// Gulp Watcher
//

task('watcher', _=> {
  watch('html/**/*.html', series(html))
  watch('scss/**/*.scss', series(css))
  watch('img/**/*.{jpg,jpeg,gif,png,svg}', series(copyImg))
  watch('fonts/*.*', series(copyFonts))
})



//
// BrowserSync
//

task('serve', _ => {
  bs({
      server: {
          baseDir: 'build'
      },
      port: 1234,
      notify: true,
      open: false
  })

  bs.watch('build/**/*.*').on('change', bs.reload)
})



//
// TASKS
//

exports.default = parallel(
  series(html, css, 'webpack', copyImg, copyFonts, 'watcher'),
  'serve'
)
