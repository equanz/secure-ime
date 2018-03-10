// require
const menubar = require('menubar')
const path = require('path')

let mb = menubar({
  index: `file://${path.join(__dirname, '/src/index.html')}` // index.html
})

// ready request handler
mb.on('ready', () => {
  console.log('app is ready.')
})

