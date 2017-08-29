const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const merge = require("webpack-merge");
const basicSetting = require("./webpack.config.js");
const BROWSER_BUNDLE_FILE_NAME = "bundleBrowser.js";

module.exports = merge.strategy({
  plugins: "replace",
  output: "replace",
})(basicSetting, {
  output: {
    filename: `./dist/${BROWSER_BUNDLE_FILE_NAME}`,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
