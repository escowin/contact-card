const path = require("path");

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
};
