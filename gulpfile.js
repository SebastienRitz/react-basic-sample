var gulp = require('gulp');
var template = require('gulp-template');
var watch = require('gulp-watch');
var gulpWebpack = require('webpack-stream');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack/webpackConfig');
var gutil = require('gulp-util');

gulp.task('watch', function () {

  watch('./client/index.html', function () {
    gulp.start('index');
  });

});

gulp
  .task("webpack-dev-server", function (callback) {

    new WebpackDevServer(webpack(webpackConfig), {
      publicPath: webpackConfig.output.publicPath,
      hot: true,
      historyApiFallback: true
    }).listen(3000, 'localhost', function (err, result) {
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
      .pipe(gulp.dest('./client/build'));

  });


// Run Webpack and concat all JS script into the build folder
gulp
  .task('build-webpack', function () {

    return gulp.src(webpackConfig.entry[2])
      .pipe(gulpWebpack(webpackConfig))
      .pipe(gulp.dest(webpackConfig.output.path));

  });


gulp
  .task('build', ['index', 'build-webpack']);

gulp
  .task('default', ['build', 'watch', 'webpack-dev-server']);
