const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');

const isProductionMode = (mode) => mode === 'production';

module.exports = (mode) => ({
  mode,
  entry: [path.resolve(__dirname, 'src', 'index.jsx')],
  output: {
    filename: 'weather-app-[contenthash].min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: isProductionMode(mode) ? 'none' : 'source-map',
  devServer: isProductionMode(mode) ? {} : {
    historyApiFallback: true,
    writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.html?$/,
        loader: 'html-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s(c|a)ss/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'src', 'styles')],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackAssetsManifest({
      output: path.join(__dirname, 'dist/asset-manifest.json'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, 'public'), to: path.join(__dirname, 'dist') },
      ],
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(dotenv.config().parsed) }),
  ],
});
