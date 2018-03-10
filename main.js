// require
const menubar = require('menubar')
const path = require('path')
const fs = require('fs')
const {ipcMain} = require('electron')

let mb = menubar({
  index: `file://${path.join(__dirname, '/src/index.html')}` // index.html
})

// ready request handler
mb.on('ready', () => {
  console.log('app is ready.')
})

// save privkey
ipcMain.on('save',function(event,ciphertext){
  let home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]
  let folroot = path.join(home,".secure-ime")
  if (!fs.existsSync(folroot)) {
    fs.mkdirSync(folroot)
  }
  let fileroot = path.join(folroot,"privkey.pem")
  fs.writeFile(fileroot,ciphertext)
})
