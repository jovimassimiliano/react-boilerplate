const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)/,
        use: [
          "style-loader", //3. inject styles to DOM
          "css-loader", //2. extract css to common js
          "sass-loader" //1.extract sass to css
        ]
      },
    ]
  }
});