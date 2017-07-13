'use strict';

import path from 'path';
import gulp from 'gulp';
import webpack from 'webpack';
import rename from 'gulp-rename';
import template from 'gulp-template';

import yargs from 'yargs';
import gutil from 'gulp-util';
import del from 'del';
import WebpackDevServer from 'webpack-dev-server';
import colorsSupported from 'supports-color';

const REMOTE_URL = 'http://192.168.10.10:8080';
const LOCAL_URL = 'http://localhost:8080';

const REMOTE = yargs.argv.remote ? true : false;

const BACKEND = REMOTE ? LOCAL_URL : REMOTE_URL;
const PORT = REMOTE ? 9003 : 9002;

const ROOT = 'src/client';
const ENTRY_FILE = path.join(__dirname, ROOT, 'app/index.js');

const SERVER_MAP = {
  '/api': BACKEND,
  '/pics': BACKEND,
  '/oauth/token': BACKEND
};

// helper method for resolving paths
const resolveToApp = (glob = '') => {
  return path.join(ROOT, 'app', glob); // app/{glob}
};

const resolveToComponents = (glob = '') => {
  return path.join(ROOT, 'app/components', glob); // app/components/{glob}
};

// map of all paths
const paths = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  less: resolveToApp('**/*.less'),
  html: [
    resolveToApp('**/*.html'),
    path.join(ROOT, 'index.html')
  ],
  entry: [
    'babel-polyfill',
    ENTRY_FILE
  ],
  output: ROOT,
  blankTemplates: path.join(__dirname, 'generator', 'component/**/*.**'),
  dest: path.join(__dirname, 'dist')
};

// use webpack.config.js to build modules
gulp.task('webpack', ['clean'], cb => {
  const config = require('./webpack.prod');
  config.entry.app = paths.entry;

  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});

gulp.task('serve', () => {
  const config = require('./webpack.dev');
  config.entry.app = [
    'webpack/hot/dev-server',
    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:' + PORT
  ].concat(paths.entry);
  let bundleStart = null;
  const compiler = webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      throw new gutil.PluginError('webpack', err);
    }
  });
  compiler.plugin('compile', () => {
    gutil.log('Bundling...');
    bundleStart = Date.now();
  });
  compiler.plugin('done', () => {
    gutil.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });
  const bundler = new WebpackDevServer(compiler, {
    proxy: SERVER_MAP,
    headers: {'X-Custom-Header': 'yes'},
    publicPath: '/',
    // Configure hot replacement
    hot: true,
    inline: true,
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,
    // The rest is terminal configurations
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  // We fire up the development server and give notice in the terminal
  // that we are starting the initial bundle
  bundler.listen(PORT, 'localhost', () => {
    console.log('Bundling project, please wait...');
  });
});

gulp.task('watch', ['serve']);

gulp.task('clean', cb => {
  del([paths.dest]).then(paths => {
    gutil.log('[clean]', paths);
    cb();
  });
});

gulp.task('default', ['watch']);
