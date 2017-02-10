require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack/hot/dev-server',
    './app/index.tsx',
  ],
  output: {
    filename: './dist/bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [{
      test: /\.json?$/,
      loader: 'json-loader'
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader?transpileOnly'
    }, {
      test: /\.svg$/,
      loader: 'svg-inline?classPrefix',
    }, {
      test: /\.html$/,
      loader: 'raw'
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
    'react/addons': true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ko)$/),
    new webpack.ContextReplacementPlugin(/react-intl[\\\/]locale-data$/, /^\.\/(en|ko)$/),
    new HtmlWebpackPlugin({
      template: 'app/index.ejs',
      inject: false,
    }),
  ],
};
