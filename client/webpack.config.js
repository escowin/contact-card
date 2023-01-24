const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

// indicates to webpack which entry point to use for bundling. webpack then generates a web dependency located in /dist
module.exports = {
  mode: "production",
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
      {
        // babel handles javascript files
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
      title: "Webpack Plugin", // defines content of the index.html <title> element
    }),
    new InjectManifest({
      swSrc: "./src/sw.js",
      swDest: "service-worker.js",
    }),
    // pwa installation
    new WebpackPwaManifest({
      name: "Contact Cards Application",
      short_name: "Contact Cards",
      description: "Keep track of contacts!",
      background_color: "#7eb4e2",
      theme_color: "#7eb4e2",
      start_url: "./",
      publicPath: "./",
      icons: [
        {
          src: path.resolve("src/images/icon-manifest.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
        },
        {
          src: path.resolve("src/images/icon-manifest.png"),
          size: "1024x1024",
          destination: path.join("assets", "icons"),
          purpose: "maskable",
        },
      ],
    }),
  ],
};
