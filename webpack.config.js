var path = require('path')
  , webpack = require('webpack')
  , UglifyJSPlugin = require('uglifyjs-webpack-plugin')
  , Jarvis = require('webpack-jarvis');

require('dotenv').config()

var paths = {};
paths.BASE = path.join(__dirname, 'candis', 'app');
paths.APP = path.join(paths.BASE, 'client', 'app');

var config = require(path.join(paths.APP, 'config'));

module.exports = {
  entry: [
    path.join(paths.APP, 'Client.jsx'),
    path.join(paths.APP, 'plugins.js')
  ],
  output: {
    path: path.join(paths.BASE, 'assets', 'js'),
    filename: 'bundle.min.js',
    publicPath: 'http://' + config.host + ':' + config.port
  },
  devServer: {
    port: 9000,
    proxy: {
      '/api': '0.0.0.0:5000',
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: process.env.ENV === 'development' ?
    [
      // debug plugins go here.
      new Jarvis(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      })
    ]
    :
    [
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
