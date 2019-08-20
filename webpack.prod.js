const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(), // minify css
      new TerserPlugin() // minifying js, because by define minimizer it will override default
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css"
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        removeAttributeQuotes: true,
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sass|scss)/,
        use: [
          MiniCssExtractPlugin.loader, //3. extract css into files
          "css-loader", //2. extract css to commonjs
          "sass-loader" //1.extract sass to css
        ]
      },
    ]
  }
});