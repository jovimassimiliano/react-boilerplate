const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css"
    }),
    new CleanWebpackPlugin()
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