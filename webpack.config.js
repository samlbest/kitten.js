const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/kitten.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [ "ts-loader" ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'url-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "kitten.js"
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  output: {
    filename: "kitten.js",
    path: path.resolve(__dirname, "dist")
  }
};