const windowController = (BrowserWindow,dialog, shell) => {
    const windows = new Set();
    let newWindow = null;

    const createWindow = () => {
        newWindow = new BrowserWindow({
            width: 900,
            height: 500,
            show: false,
            //frame: false
        });

        Object.defineProperty(newWindow, "documentEdited", {
            value: false,
            enumerable: true,
            configurable: true,
            writable: true
        });

        

        windows.add(newWindow);

        newWindow.loadFile("index.html")
        newWindow.setTitle('Markr')

        newWindow.on("ready-to-show", () => {
            newWindow.show();
        });

        newWindow.on("close", e => {
            
            if (newWindow.documentEdited) {
                e.preventDefault();
                shell.beep()
                const result = dialog.showMessageBox({
                    title: "Save Changes?",
                    message: "Your changes will be discarded if you do not save",
                    buttons: ["Quit Anyway", "Cancel"],
                    defaultId: 0,
                    cancelId: 1
                });

                if (result === 0) newWindow.destroy();
            }
        });

        newWindow.on("closed", () => {
            newWindow = null
            windows.delete(newWindow)
        })
    }

    return createWindow
}

module.exports = windowController