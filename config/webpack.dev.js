const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = common.map(config => merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ]
}))
