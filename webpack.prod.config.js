const webpack = require('webpack');
const originalWepbackConfig = require('./webpack.config');

const nodeServerSpecificSettings = {
  entry: ['./app/index.tsx'],
  output: {
    libraryTarget: 'commonjs',
    library: 'ssr',
    filename: './dist/bundle.js',
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

delete originalWepbackConfig.node;

const nodeTargetWebpackOptions = { ...originalWepbackConfig, ...nodeServerSpecificSettings };

module.exports = nodeTargetWebpackOptions;
