const menubar = require('menubar')

let mb = menubar({
  index: `file://${__dirname}/index.html`
})

mb.on('ready', () => {
  console.log('menubar is ready.')
})

