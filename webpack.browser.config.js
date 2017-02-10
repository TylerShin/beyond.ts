const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const BROWSER_BUNDLE_FILE_NAME = "bundleBrowser.js";

module.exports = {
  entry: [
    'babel-polyfill',
    './app/index.tsx',
  ],
  output: {
    filename: `./dist/${BROWSER_BUNDLE_FILE_NAME}`,
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [{
      test: /\.json?$/,
      loader: 'json-loader'
    }, {
      test: /\.svg$/,
      loader: 'svg-inline?classPrefix',
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader?transpileOnly'
    }, {
      test: /\.scss$/,
      loaders: [
        'isomorphic-style-loader',
        'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
        'sass-loader',
        'postcss-loader'
      ]
    }]
  },
  postcss() {
    return {
      defaults: [autoprefixer],
      cleaner: [autoprefixer({
        browsers: []
      })],
    };
  },
  node: {
    fs: "empty"
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ko)$/),
    new webpack.ContextReplacementPlugin(/react-intl[\\\/]locale-data$/, /^\.\/(en|ko)$/),
    new webpack.NoErrorsPlugin(),
  ],
};
