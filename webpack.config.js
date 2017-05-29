var path       = require('path')
,   webpack    = require('webpack');

var basepath   = path.join(__dirname, 'candis', 'app');

module.exports = {
  entry: [
    path.join(basepath, 'client', 'app', 'Client.jsx'),
    path.join(basepath, 'client', 'app', 'plugins.js')
  ],
  output: {
    path: path.join(basepath, 'assets', 'js'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      {
          test: /\.jsx$/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  }
};
