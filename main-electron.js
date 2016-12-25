// electron
var electron = require('electron'),
    app = electron.app,
    BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
  if(process.platform != 'darwin'){
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 400, height: 300});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
