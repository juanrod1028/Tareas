const HtmlWebPackPlugin = require("html-webpack-plugin");
const MinicssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");
module.exports = {
  mode: "production",
  output: {
    clean: true,
    filename: "main.[contenthash].js",
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizer(), new Terser()],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /styles\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles\.css$/,
        use: [MinicssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new MinicssExtractPlugin({
      filename: "[name].[fullhash].css",
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets/" }],
    }),
  ],
};
