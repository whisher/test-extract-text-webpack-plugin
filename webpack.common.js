const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const autoprefixer = require('autoprefixer');

const PluginExtractText = new ExtractTextPlugin({
    /*filename: '[name].css',*/
    filename: 'index.css',
    disable: false,
    allChunks: true
});
const SRC = path.resolve(__dirname, 'src');
const CLIENT = path.resolve(SRC, 'client');
const IMG = path.resolve(SRC, 'img');
const FAVICON = path.resolve(IMG, 'bed.png');
const INDEX = path.resolve(CLIENT, 'index.html');


const config = {
  entry: {},
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: CLIENT,
        loader: 'eslint-loader',
        options: {
          configFile: './.eslintrc'
        }
      },
      {
        test: /\.js$/,
        include: CLIENT,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        include: CLIENT,
        use: [
          { loader: 'ng-annotate-loader' },
          { loader: 'babel-loader' }
        ]
      },
      {
        test: /\.less$/,
        //include: CLIENT,
        use: PluginExtractText.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
             'less-loader'
           ]
        })
        /*use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]*/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
              {
              loader: 'postcss-loader',
                options: {
                  plugins: (loader) => [
                    autoprefixer({browsers: ['last 2 versions']})
                  ]
                }
              }
            ]
        })
        //use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?mimetype=application/font-woff&name=./fonts/[name].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?mimetype=application/x-font-ttf&name=./fonts/[name].[ext]'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?\??$/,
        use: 'file-loader?mimetype=application/vnd.ms-fontobject&name=./fonts/[name].[ext]'
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?mimetype=application/font-otf&name=./fonts/[name].[ext]'
      },
      {
        test: /\.(jpg|png)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [

    new webpack.IgnorePlugin(/spec\.js$/),

    new FaviconsWebpackPlugin({logo: FAVICON, inject: true}),

    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: INDEX,
      inject: 'body',
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module, count) {
        return module.resource && module.resource.indexOf(CLIENT) === -1;
      }
    }),

    PluginExtractText
  ]
};

module.exports = config;
