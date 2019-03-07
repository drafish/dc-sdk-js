const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [{
  entry: {
    'index': path.resolve(__dirname, '../src/index.js'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index-sdk.html',
      template: path.resolve(__dirname, '../src/index.html'),
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'iframe.html',
      template: path.resolve(__dirname, '../src/iframe.html'),
      inject: false
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime'
              ],
              [
                '@babel/plugin-transform-modules-commonjs'
              ]
            ]
          }
        }
      }
    ]
  }
}]
