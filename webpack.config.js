var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var pkg = require('./package.json');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

/* Pass target environment (such as "start") to babel */
process.env.BABEL_ENV = TARGET;

/* Common settings for development and production */
var common = {
    entry: PATHS.app + '/app.jsx',
    module: {
        preLoaders: [{
                test: /\.jsx?$/,
                include: PATHS.app,
                loader: 'source-map'
        }],
        loaders: [{
                test: /\.json?$/,
                include: PATHS.app,
                loaders: ['json-loader']
          },
          {
                test: /\.(jpe?g|png|gif|svg)$/i,
                include: PATHS.app,
                loaders: [
                    'url?limit=8192',
                    'img'
                ]
            }, {
                test: /\.jsx?$/,
                include: PATHS.app,
                loader: 'babel'
        }]
    },
    plugins: [
      new HtmlwebpackPlugin({
        title: 'FINFO-UI',
        template: 'index.html',
        inject: 'body'
      })
    ]
};

/* Development only settings. */
if (TARGET === 'webpack-dev-server' || !TARGET) {
  module.exports = merge(common, {
    entry: PATHS.app + '/app.jsx',
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
      loaders: [{
              test: /\.scss$/,
              include: PATHS.app,
              loaders: [
                  'style',
                  'css',
                  'autoprefixer?browsers=last 3 versions',
                  'sass?outputStyle=expanded'
              ]
      }]
    },
    devtool: 'source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

/* Production only settings. */
if (TARGET === 'build' || TARGET === 'stats') {
  module.exports = merge(common, {
    entry: {
      app: PATHS.app + '/app.jsx',
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: PATHS.build,
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js',
      publicPath: './build'
    },
    module: {
      loaders: [{
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass?outputStyle=expanded', 'autoprefixer?browsers=last 3 versions', 'sass?outputStyle=expanded'),
          include: PATHS.app
      }]
    },
    plugins: [
      new ExtractTextPlugin('styles.[chunkhash].css'),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENT': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  })
};
