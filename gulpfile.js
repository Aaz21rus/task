const { src, dest, parallel, watch, task, series } = require('gulp')
const pug = require('gulp-pug')
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

function html() {
  return src('pug/pages/*.pug')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'Pug Error',
          message: err.message
        }
      })
    }))
    .pipe(pug({
      pretty: true
    }))
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
    // .pipe(minifyCSS())
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
  watch('pug/**/*.pug', series(html))
  watch('scss/**/*.scss', series(css))
  watch('img/**/*.{jpg,jpeg,gif,png,svg}', series(copyImg))
  watch('fonts/*.*', series(copyFonts))
  // watch('js/**/*.js', series(js))
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
