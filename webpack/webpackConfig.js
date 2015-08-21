var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var constants = require('./const.dev');
var sprintf = require('sprintf');

var sassLoaders = [
  "css-loader",
  "autoprefixer-loader?browsers=last 2 version",
  "sass-loader?indentedSyntax=sass&includePaths[]=" + constants.CLIENT_FOLDER_PATH,
];

var config = {
  devtool: 'eval',
  debug: true,
  watch: true,
  entry: [
    // WebpackDevServer host and port
    sprintf('webpack-dev-server/client?http://%s:%s', constants.BASE_URL, constants.PORT),
    'webpack/hot/only-dev-server',
    constants.ENTRY_FILE_PATH
  ],
  output: {
    path: constants.DEST_FOLDER_PATH,
    filename: constants.SINGLE_JS_FILENAME,
    publicPath: constants.OUTPUT_PUBLIC_PATH
  },
  plugins: [
    new ExtractTextPlugin(constants.SINGLE_CSS_FILENAME),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.sass'],
    modulesDirectories: ['client', 'node_modules']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [constants.NODE_MODULES_DIR],
      // Config is read right to left so first babelize
      loaders: ['react-hot', 'babel'],
      include: constants.CLIENT_APP_DIR
    }, {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
    }]
  }
};

module.exports = config;
