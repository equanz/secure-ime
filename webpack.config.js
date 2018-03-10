const path = require('path')

module.exports = {
  entry: './src/app.js', // entry point
  output: {
    filename: 'bundle.js',
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
