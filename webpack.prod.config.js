const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.tsx',
  ],
  output: {
    filename: './dist/bundle.js',
  },
  devtool: 'source-map',
  tagget: 'node',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.NoErrorsPlugin(),
  ],
};
