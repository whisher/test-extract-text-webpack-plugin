const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DIST = path.resolve(__dirname, 'dist');

const config = require('./webpack.common');

module.exports = webpackMerge(config, {
  devtool: 'source-map',
  output: {
    path: DIST,
    publicPath: '/',
    filename: 'be_[name].bundle.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    // Reduces bundles total size
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      mangle: {
        // You can specify all variables that should not be mangled.
        // For example if your vendor dependency doesn't use modules
        // and relies on global variables. Most of angular modules relies on
        // angular global variable, so we should keep it unchanged
        except: [
          '_',
          'localforage',
          'moment',
          'randomstring',
          'file-saver',
          'google',
          'angular']
      },
      mangle: false
    })
  ]
});
