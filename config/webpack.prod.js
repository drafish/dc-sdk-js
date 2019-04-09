const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = common.map(config => merge(config, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          // properties -- 用.来重写属性引用，例如foo["bar"] → foo.bar
          // 但我实测发现传false和true结果都一样，估计是新版本作废了这个字段吧，有时间我研究下源码
          // compress: { properties: false },
          ie8: true,
          // mangle默认就是true，会混淆变量名，有时候会想看下没混淆变量名的代码，所以留着这个注释
          // mangle: true
        }
      })
    ]
    // minimize: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}))
