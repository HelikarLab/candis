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
  entry: [
    path.join(paths.APP, 'Client.jsx'),
    path.join(paths.APP, 'plugins.js')
  ],
  output: {
    path: path.join(paths.BASE, 'assets', 'js'),
    filename: 'bundle.min.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, paths.BASE, 'assets'),
    compress: true,
    host: '0.0.0.0',
    port: process.env.NODE_PORT,
    hot: true,
    inline: true,
    progress: true,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /(node_modules)/
    },
    {
      test: /\.scss$/,
      use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
        'file-loader'
      ]
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
      inject: true,
      template: './candis/app/assets/js/index.html'
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