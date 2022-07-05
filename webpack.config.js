const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const path = require("path");

const plugins = [
  new HTMLWebpackPlugin({
    title: "Hosting",
    filename: "index.html",
    template: path.join(__dirname, "src/index.pug"),
  }),
  new HtmlWebpackPugPlugin(),
  new CleanWebpackPlugin(),
];

module.exports = {
  target: "web",
  entry: "./index.js",
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: "pug-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: plugins,

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    onListening: (devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      const port = devServer.server.address().port;
      console.log(`Listening on port:, ${port}`);
    },
    open: true,
    liveReload: true,
    static: ["src"],
  },
};
