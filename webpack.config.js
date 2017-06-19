var path           = require('path')
,   webpack        = require('webpack')
,   UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var paths          = { };
paths.BASE         = path.join(__dirname, 'candis', 'app');
paths.APP          = path.join(paths.BASE, 'client', 'app');

module.exports     = {
  entry: [
    path.join(paths.APP, 'Client.jsx'),
    path.join(paths.APP, 'plugins.js')
  ],
  output: {
    path: path.join(paths.BASE, 'assets', 'js'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      {
           test: /\.(js|jsx)$/,
         loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      output: {
        comments: false
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  }
};
