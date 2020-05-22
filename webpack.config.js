const path = require('path')

module.exports = {
  entry: {
    scripts: './js/index',
  },
  output: {
    path: __dirname + '/build/js',
    filename: '[name].js'
  },
  watch: true,
  mode: 'development',
  devtool: 'cheap-module-inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'js'),
        loader: 'babel-loader?presets[]=@babel/env'
      }
    ]
  }
}
