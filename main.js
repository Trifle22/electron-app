const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const electronReload = require('electron-reload');
electronReload(__dirname);

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  window.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})