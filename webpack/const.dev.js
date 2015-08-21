var path = require('path');

var dev_constants = {
  BASE_URL: 'localhost',
  PORT: '3000',
  CLIENT_FOLDER_PATH: path.resolve(__dirname, '../client'),
  CLIENT_APP_DIR: path.resolve(__dirname, '../client/app'),
  ENTRY_FILE_PATH: path.resolve(__dirname, '../client/app/app.js'),
  DEST_FOLDER_PATH: path.resolve(__dirname, '../client/build'),
  NODE_MODULES_DIR: path.resolve(__dirname, '../node_modules'),
  SINGLE_JS_FILENAME: 'bundle.js',
  SINGLE_CSS_FILENAME: 'style.css',
  OUTPUT_PUBLIC_PATH: '/static/'
};

module.exports = dev_constants;
