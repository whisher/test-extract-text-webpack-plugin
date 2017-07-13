const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const SRC = path.resolve(__dirname, 'src');
const CLIENT = path.resolve(SRC, 'client');
const IMG = path.resolve(SRC, 'img');
const LOGO = path.resolve(IMG, 'bed.png');

const config = require('./webpack.common');

module.exports = webpackMerge(config, {
  devtool: 'cheap-module-source-map',
  output: {
    path: CLIENT,
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  plugins: [
    new WebpackNotifierPlugin({
      title: 'Test',
      contentImage: LOGO
    }),
    // Adds webpack HMR support. It act's like livereload,
    // reloading page after webpack rebuilt modules.
    // It also updates stylesheets and inline assets without page reloading.
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    })
  ]
});
