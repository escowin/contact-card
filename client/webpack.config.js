const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin")

// indicates to webpack which entry point to use for bundling. webpack then generates a web dependency located in /dist
module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        // handles static images
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        // prepocesses css stylesheets
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      { // babel handles javascript files
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: "./index.html", // template basis
        title: "Webpack Plugin" // defines content of the index.html <title> element
    }),
    new WorkboxPlugin.GenerateSW()
  ]
};
