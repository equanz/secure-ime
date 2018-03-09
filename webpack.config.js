const path = require('path')

module.exports = {
  entry: './src/app.js', // entry point
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/src')
  },
  cache: true
}
