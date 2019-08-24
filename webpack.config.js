// webpack v4
const path = require('path');

//const nodeExternals = require('webpack-node-externals');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const WebpackMd5Hash = require('webpack-md5-hash');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  // target: 'node',
  // externals: [nodeExternals()],
  // devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    open: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: {
        //   loader: "babel-loader"
        // }
        use: [{ loader: "babel-loader" }, { loader: "eslint-loader" }]
      },
      {
        test: /\.scss$/,
        use:  [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [ 
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new StylelintPlugin({
      files: ['src/**/*.scss']
    }),
    new WebpackMd5Hash()
  ]
};