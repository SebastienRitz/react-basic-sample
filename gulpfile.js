var gulp = require('gulp');
var gutil = require('gulp-util');
var template = require('gulp-template');
var watch = require('gulp-watch');

var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');

var WebpackDevServer = require('webpack-dev-server');
var constants = require('./webpack/const.dev');
var webpackConfig = require('./webpack/webpackConfig');


gulp
.task('watch', function () {
  watch('./client/index.html', function () {
    gulp.start('index');
  });
});


gulp
  .task('webpack-dev-server', function (callback) {

    new WebpackDevServer(webpack(webpackConfig), {
      publicPath: constants.OUTPUT_PUBLIC_PATH,
      hot: true,
      historyApiFallback: true
    }).listen(constants.PORT, constants.BASE_URL, function (err, result) {
      if (err) {
        console.log(err);
      }

      console.log('Listening at localhost:3000');
    });

  });

// Copy index.html into the build folder
gulp
  .task('index', function () {

    return gulp.src('./client/index.html')
      .pipe(template({
        script_path: '.',
        css_path: '.'
      }))
      .pipe(gulp.dest(constants.DEST_FOLDER_PATH));

  });


// Run Webpack and concat all JS script into the build folder
gulp
  .task('build-webpack', function () {

    return gulp
      .src(constants.ENTRY_FILE_PATH)
      .pipe(gulpWebpack(webpackConfig))
      .pipe(gulp.dest(constants.DEST_FOLDER_PATH));

  });


gulp
  .task('build', ['index', 'build-webpack']);

gulp
  .task('default', ['build', 'watch', 'webpack-dev-server']);
