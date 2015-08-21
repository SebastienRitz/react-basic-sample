var path = require('path');
var node_modules_dir = path.resolve(__dirname, '../node_modules');
var webpack = require('webpack');

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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [node_modules_dir],
      // Config is read right to left so first babelize
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, '../client/app')
    }]
  }
};

module.exports = config;
