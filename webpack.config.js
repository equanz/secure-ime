const path = require('path')

module.exports = {
  entry: {
    app: './src/app.js', // entry point
    init: './src/init.js' // entry point
  },
  output: {
    filename: '[name].bundle.js', // save ${entry.keyname}.bundle.js
    path: path.join(__dirname, '/src'),
    libraryTarget: 'commonjs2' // モジュールを呼ぶ方式
  },
  cache: true,
  externals: [
    'electron',
    'fs',
    'path'
  ]
}
