var path = require('path'),
  webpack = require('webpack'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
  Jarvis = require('webpack-jarvis');
const HtmlWebpackPlugin = require('html-webpack-plugin')

require('dotenv').config()

var paths = {};
paths.BASE = path.join(__dirname, 'candis', 'app');
paths.APP = path.join(paths.BASE, 'client', 'app');

var config = require(path.join(paths.APP, 'config'));

module.exports = {
  mode: 'development',
  entry: [
    path.join(paths.APP, 'Client.jsx'),
    path.join(paths.APP, 'plugins.js')
  ],
  output: {
    path: path.join(paths.BASE, 'assets', 'js'),
    filename: 'bundle.min.js',
    publicPath: path.join(paths.BASE, 'assets', 'js')
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /(node_modules)/
    }]
  },
  plugins: process.env.NODE_ENV === 'development' ? [
    // debug plugins go here.
    new Jarvis(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      title: "Candis App",
      filename: "../index.html",
      inject: true
    }),
  ] : [
    // production plugins go here.
    new UglifyJSPlugin({
      uglifyOptions: {
        beautify: false,
        ecma: 6,
        compress: true,
        comments: false
      }
    })
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
};