const webpack = require('webpack');
const originalWepbackConfig = require('./webpack.config');
const BROWSER_BUNDLE_FILE_NAME = 'bundleBrowser.js';

const browserSpecificSetting = {
  output: {
    filename: `./dist/${BROWSER_BUNDLE_FILE_NAME}`,
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

const webpackOptionsForBrowser = { ...originalWepbackConfig, ...browserSpecificSetting };

module.exports = webpackOptionsForBrowser;
