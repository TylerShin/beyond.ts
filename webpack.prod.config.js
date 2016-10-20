const webpack = require('webpack');

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
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.NoErrorsPlugin(),
  ],
};
