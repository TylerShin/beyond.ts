const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    './app/index.tsx',
  ],
  output: {
    libraryTarget: "commonjs",
    library: "ssr",
    filename: './dist/bundle.js',
  },
  target: 'node',
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
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'react/addons': true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.OccurrenceOrderPlugin,
    new webpack.NoErrorsPlugin(),
  ],
};
