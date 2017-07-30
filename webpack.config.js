var path           = require('path')
,   webpack        = require('webpack')
,   UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var paths          = { };
paths.BASE         = path.join(__dirname, 'candis', 'app');
paths.APP          = path.join(paths.BASE, 'client', 'app');

var config         = require(path.join(paths.APP, 'config'));

module.exports     = {
  entry: [
    path.join(paths.APP, 'Client.jsx'),
    path.join(paths.APP, 'plugins.js')
  ],
  output: {
    path: path.join(paths.BASE, 'assets', 'js'),
    filename: 'bundle.min.js',
    publicPath: 'http://' + config.host + ':' + config.port
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
  plugins: config.debug ? 
    [
      // debug plugins go here.
    ]
      : 
    [
      // production plugins go here.
      new UglifyJSPlugin({
        output: {
          comments: false
        }
      })
    ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
};
