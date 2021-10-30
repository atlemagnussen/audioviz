
const { app, BrowserWindow, systemPreferences, desktopCapturer } = require("electron")
const path = require("path")
//import * as path from "path"

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile("index.html")

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    console.log("check consent")
    const consent = systemPreferences.getMediaAccessStatus("screen")
    console.log(consent)
    console.log("try get sources")
    desktopCapturer.getSources({ types: ['window', 'screen'] }).then(sources => {
        for (const source of sources) {
            console.log(source)
        }
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    // const consent = systemPreferences.getMediaAccessStatus("screen")
    // console.log(consent)
})

app.on("window-all-closed", function () {
    if (process.platform !== 'darwin') app.quit()
})
