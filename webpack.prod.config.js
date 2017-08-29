const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const merge = require("webpack-merge");
const basicSetting = require("./webpack.config.js");

const settings = merge.strategy({
  entry: "replace",
  output: "replace",
  target: "replace",
  plugins: "replace",
})(basicSetting, {
  entry: ["./app/index.tsx"],
  output: {
    libraryTarget: "commonjs",
    library: "ssr",
    filename: "./dist/bundle.js",
  },
  target: "node",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});

delete settings.node;

module.exports = settings;
