'use strict';

const path = require('path');
const fs = require('fs');
const argv = require('yargs').argv;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const confFile = 'build-config.json';
const config = JSON.parse(fs.readFileSync(confFile, 'utf8'));
const platform = config.platform;

let env = argv.env || 'prod';

if (!argv.env) {
  env = config.env;
}

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');
const assetVersion = Math.random().toString(36).substr(2, 15);

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
  new ExtractTextPlugin('../css/style.css'),
  new OptimizeCssAssetsPlugin(),
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: './src/templates/index.ejs',
  }),
  new webpack.DefinePlugin({
    ASSET_VERSION: `'${assetVersion}'`,
    DEBUG: JSON.stringify(env === 'dev'),
  }),
];

const rules = [
  { test: /\.ttf$/, loader: 'url-loader?limit=100000' },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('css-loader'),
  },
  { test: /\.js$/, loader: 'babel-loader' },
  { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
  { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
  { test: /p2\.js/, use: ['expose-loader?p2'] },
];

let webpackConfig = {};

if (env === 'dev') {
  // eslint-disable-next-line
  const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
  plugins.push(new BrowserSyncPlugin({
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 3000,
    server: {
      baseDir: ['./', './www'],
    },
  }));

  rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    enforce: 'pre',
    loader: 'eslint-loader',
    options: {
      failOnWarning: true,
      failOnError: true,
    },
  });

  webpackConfig = Object.assign(webpackConfig, {
    watch: true,
    devtool: 'cheap-source-map',
  });
} else if (env === 'prod') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    drop_console: true,
    minimize: true,
    output: {
      comments: false,
    },
  }));
}

webpackConfig = Object.assign(webpackConfig, {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, `./src/js/${platform}/app.js`),
    ],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader'],
  },
  output: {
    path: path.resolve(__dirname, './www/js'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  plugins,
  module: {
    rules,
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  resolve: {
    alias: {
      phaser,
      pixi,
      p2,
    },
  },
});

module.exports = webpackConfig;
