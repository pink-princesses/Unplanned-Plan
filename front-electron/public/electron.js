const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const Store = require('./store.js');

const session = new Store({
  configName: 'session',
  defaults: {
    jwt: '',
  },
});

let win = null;

app.on('ready', () => {
  win = new BrowserWindow({
    width: 1440,
    height: 960,
  });
  const jwtToken = session.get('jwt');
  const startUrl = process.env.ELECTRON_START_URL
    ? `${process.env.ELECTRON_START_URL}?jwt=${jwtToken}`
    : url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true,
        query: {
          jwt: jwtToken,
        },
      });

  win.loadURL(startUrl);

  win.webContents.addListener('will-redirect', () => {
    win.webContents
      .executeJavaScript('localStorage.getItem("jwt");', true)
      .then((result) => {
        console.log('save');
        if (result) session.set('jwt', result);
      });
    console.log('redirect');
  });
});
