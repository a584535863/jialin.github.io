const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: path.join(__dirname, "./scripts/main.ts"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|bmp)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 30000,
              fallback: {
                loader: "file-loader",
                options: {
                  publicPath: "../assets/images",
                  outputPath: "./assets/images",
                  name: "[name].[ext]?[hash]",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 30000,
              fallback: {
                loader: "file-loader",
                options: {
                  publicPath: "../assets/font",
                  outputPath: "./assets/font",
                  name: "[name].[ext]?[hash]",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/transform-runtime"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/],
            configFile: path.resolve(__dirname, "./tsconfig.json"),
          },
        },
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "./js/[name]-[fullhash].js",
    chunkFilename: "./js/[name]-[contenthash].js",
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: "~",
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./index.html"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./css/[name]-[fullhash].css",
      chunkFilename: "./css/[name]-[contenthash].css",
    }),
    new OptimizeCssAssetsPlugin({}),
    new CleanWebpackPlugin(),
  ],
};
