const { app, BrowserWindow } = require('electron');
const net = require('net');
let win;

function createWindow() {
  win = new BrowserWindow({width: 1200, height: 800});
  win.loadURL(`file://${__dirname}/dist/index.html`);
  win.webContents.openDevTools();
  return win;
}

app.on('ready', createWindow);


app.getNetForTcp = function () {
  return net;
};
