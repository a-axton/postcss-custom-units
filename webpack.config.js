var webpack = require('webpack');
var isProduction = process.env.NODE_ENV === 'production';
var isTest = process.env.NODE_ENV === 'test';

var plugins = isProduction ? [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
] : [];
var entry = isTest ? './test/tests.js' : './src/index.js';
var output = isTest
  ? {
    path: './tmp',
    filename: 'tests.js'
  } 
  : {
    path: './dist',
    filename: 'index.js'
  };
module.exports = {
  entry: entry,
  output: output,
  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}
    ],
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  eslint: {
    formatter: require('eslint/lib/formatters/stylish'),
    configFile: './eslintrc'
  },
  plugins: plugins
};
