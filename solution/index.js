"use strict";

const isOSX = process.platform === 'darwin';
const isDevMode = process.env.NODE_ENV === 'development';

const electron = require('electron');
const webContents = electron.webContents;
const path = require('path');
const fs = require('fs');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow = null;
let mainWebContents = null;

function createWindow() {
  const {width: screenWidth, height: screenHeight} = electron.screen.getPrimaryDisplay().workAreaSize;
  const space = 50;
  const x = space;
  const y = space;
  const width = screenWidth - space * 2;
  const height = screenHeight - space * 2;

  mainWindow = new BrowserWindow({
    defaultEncoding: "utf8",
    fullscreenable: true,
    defaultEncoding: "utf8",
    x: x,
    y: y,
    width: width,
    height: height,
  });

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  if (isDevMode) {
    mainWindow.webContents.openDevTools();
  }

  // open links in browser
  mainWebContents = mainWindow.webContents;
  const handleRedirect = (e, url) => {
    if(url != mainWebContents.getURL()) {
      e.preventDefault();
      electron.shell.openExternal(url);
    }
  };

  mainWebContents.on('will-navigate', handleRedirect);
  mainWebContents.on('new-window', handleRedirect);
  mainWebContents.on('dom-ready', () => {
    if (!isDevMode) {
      // mainWindow.setFullScreen(true);
    }
  });
}

app.on('ready', () => {
  setupMenus();
  createWindow();
});

app.on('window-all-closed', () => {
  mainWebContents = null;
  app.quit();
});

app.on('close', () => {
  app.quit();
})

function setupMenus() {
  const menuTemplate = [
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Developer Tools',
          accelerator: isOSX ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.toggleDevTools();
          }
        },
      ]
    },
  ];


  if (isOSX) {
    const name = electron.app.getName();
    menuTemplate.unshift({
      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() { app.quit(); }
        },
      ]
    });
  }

  const menu = electron.Menu.buildFromTemplate(menuTemplate);
  electron.Menu.setApplicationMenu(menu);
}

