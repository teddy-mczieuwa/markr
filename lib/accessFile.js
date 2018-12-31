const {app,dialog} = require('electron')
const fs = require('fs')

const getFileFromUserSelection = (targetWindow) => {
    let files = dialog.showOpenDialog(targetWindow,{
        properties:['openFile'],
        filters:[
            {name:'Text Files', extensions:['txt','text']},
            {name: 'Markdown Files', extensions:['md','markdown']}
        ]
    })

    if(!files) return

    return files[0]
}

const openFile = (targetWindow,filePath) => {
    let file = filePath || getFileFromUserSelection(targetWindow)
    let content = fs.readFileSync(file).toString()
    app.addRecentDocument(file)
    targetWindow.webContents.send('file-opened', file, content)
}

const saveFile = (targetWindow, file, content) => {
    console.log("saving...");
    if(!file) {
        file = dialog.showSaveDialog(targetWindow, {
            title: 'Save',
            message:'Save File',
            defaultPath: app.getPath('documents'),
            filters: [
                {name:'Markdown Files', extensions:['md', 'markdown']}
            ]
        })
    }

    if(!file) return
    fs.writeFileSync(file, content)
    targetWindow.webContents.send('file-opened', file, content)
  
};

exports.saveFile = saveFile;
exports.getFileFromUserSelection = getFileFromUserSelection
exports.openFile = openFile