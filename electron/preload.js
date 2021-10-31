const { contextBridge } = require("electron")
const { desktopCapturer } = require("electron")
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const electronEnv = { platform: process.platform }
for (const type of ['chrome', 'node', 'electron']) {
    electronEnv[type] = process.versions[type]
    process.platform
}

contextBridge.exposeInMainWorld("ELECTRON_ENV", electronEnv)

let sources = []
window.addEventListener("DOMContentLoaded", () => {
    desktopCapturer.getSources({ types: ['window', 'screen'] }).then(ss => {
        for(const source of ss) {
            sources.push(source)
            console.log(source)
        }
        contextBridge.exposeInMainWorld("ELECTRON_SOURCES", sources)
        const event = new CustomEvent('electron-sources-ready', { detail: sources })
        document.dispatchEvent(event)
    })
})
