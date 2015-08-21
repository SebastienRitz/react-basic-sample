var path = require('path');
var node_modules_dir = path.resolve(__dirname, '../node_modules');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var sassLoaders = [
  "css-loader",
  "autoprefixer-loader?browsers=last 2 version",
  "sass-loader?indentedSyntax=sass&includePaths[]=" + path.resolve(__dirname, "../client"),
];

var config = {
  devtool: 'eval',
  debug: true,
  watch: true,
  entry: [
    // WebpackDevServer host and port
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, '../', 'client/app/app.js')
  ],
  output: {
    path: path.resolve(__dirname, '../', 'client/build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.sass'],
    modulesDirectories: ['src', 'node_modules']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [node_modules_dir],
      // Config is read right to left so first babelize
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, '../client/app')
    }, {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract("style-loader", sassLoaders.join("!")),
    }]
  }
};

module.exports = config;
