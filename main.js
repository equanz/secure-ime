// require
const menubar = require('menubar')
const path = require('path')
const fs = require('fs')
const {ipcMain} = require('electron')

// initialize
let mb = null
let home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]
let filename = path.join(home, ".secure-ime", "privkey.pem")

// if file exists
fs.access(filename, (err) => {
  if(err){
    mb = menubar({
      index: `file://${path.join(__dirname, '/src/init.html')}`, // init.html
      icon: path.join(__dirname, '/illust/icon.png') //set icon
    })
  }
  else{
    mb = menubar({
      index: `file://${path.join(__dirname, '/src/index.html')}`, // index.html
      icon: path.join(__dirname, '/illust/icon.png') //set icon
    })
  }

  // ready request handler
  mb.on('ready', () => {
    console.log('app is ready.')
  })
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

ipcMain.on('load',function(event){
  let home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]
  let root = path.join(home,'.secure-ime','privkey.pem')
  fs.readFile(root,'utf8',function(err,data){
    if(err){
      throw err
    }
    event.sender.send('retrun_data',data)
  })
})
