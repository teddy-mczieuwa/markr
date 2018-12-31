const {app, BrowserWindow, Menu, dialog,shell, ipcMain} = require('electron')
const template = require('./lib/template')(BrowserWindow, dialog, ipcMain)
const createWindow = require('./lib/windowController')(BrowserWindow,dialog,shell)

require("electron-reload")(__dirname)


app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    createWindow()
})
