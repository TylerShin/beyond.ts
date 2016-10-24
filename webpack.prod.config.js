const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    './src/index.tsx',
  ],
  output: {
    filename: './dist/bundle.js',
  },
  target: 'node',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.json?$/, loader: 'json-loader' },
      { test: /\.tsx?$/, loader: 'babel?presets[]=stage-0,presets[]=es2015,plugins=transform-runtime!ts' },
      {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader',
          'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
          'postcss-loader'
        ]
      }
    ]
  },
  postcss() {
    return {
      defaults: [autoprefixer],
      cleaner: [autoprefixer({ browsers: [] })],
    };
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.NoErrorsPlugin(),
  ],
};
