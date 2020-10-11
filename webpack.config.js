const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const path = require('path');

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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    isProductionMode(mode) ? new CleanWebpackPlugin() : () => {},
    new DotenvWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],
});
