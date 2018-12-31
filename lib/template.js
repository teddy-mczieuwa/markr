const template = (BrowserWindow, dialog, ipcMain) => {
    let accessFile = require('./accessFile')
    let createWindow = require('./windowController')(BrowserWindow, dialog)
    
    return [{
        label: 'File',
        submenu: [{
            label: 'New File',
            accelerator: 'CmdOrCtrl+N',
            click(){
                console.log('new file')
                createWindow()
            }
        },
        {
            label: 'Open File',
            accelerator: 'CmdOrCtrl+O',
            click(items, focusedWindow) {
                focusedWindow.webContents.send('open-file')
                // let { file, content } = accessFile.openFile(focusedWindow)
                // focusedWindow.webContents.send('file-opened', file, content)
            }
        },{
            type: 'separator'
        },
        {
            label: 'Save',
            accelerator: 'CmdOrCtrl+S',
            click(items, focusedWindow) {
                focusedWindow.webContents.send('save-file')         
            }
        }]
    }, {
        label: 'dev',
        submenu: [{
            label: 'toggle Devtools',
            accelerator: 'CmdOrCtrl+Alt+I',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            }
        }],

    }]
}

module.exports = template