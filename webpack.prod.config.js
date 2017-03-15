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
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        }
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
        options: {
          classPrefix: true
        }
      },
      {
        test: /\.html$/,
        use: ["raw-loader"]
      },
      {
        test: /\.md?$/,
        use: [
          { loader: "html-loader" },
          { loader: "markdown-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {loader: "isomorphic-style-loader"},
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]__[local]__[hash:base64:3]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          },
          { loader: "sass-loader" }
        ]
      }
    ],
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
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
