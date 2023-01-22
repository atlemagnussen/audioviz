const { ipcRenderer, contextBridge } = require("electron")

let sources = []

ipcRenderer.on('SET_SOURCES', async (event, src) => {
    try {
        sources = src
        console.log("SET_SOURCES", sources)
        
        // gets all devices here
        const devices = await navigator.mediaDevices.enumerateDevices()
        devices.map(d => {
            console.log("preload media devices", d)
        })

        //const stream = await navigator.mediaDevices.getUserMedia({
        //    audio: true,
            // video: {
            //     mandatory: {
            //         chromeMediaSource: 'desktop',
            //         chromeMediaSourceId: sourceId,
            //         minWidth: 1280,
            //         maxWidth: 1280,
            //         minHeight: 720,
            //         maxHeight: 720
            //     }
            // }
        //})
        //handleStream(stream)
    } catch (e) {
        handleError(e)
    }
})

function handleError(e) {
    console.log(e)
}

const electronEnv = { platform: process.platform }
for (const type of ['chrome', 'node', 'electron']) {
    electronEnv[type] = process.versions[type]
    process.platform
}

contextBridge.exposeInMainWorld("ELECTRON_ENV", electronEnv)

function getSources() {
    return sources
}

contextBridge.exposeInMainWorld(
    "electron",
    {
        getSources: () => getSources() 
    })

// let sources = []
// window.addEventListener("DOMContentLoaded", () => {
//     desktopCapturer.getSources({ types: ['window', 'screen'] }).then(ss => {
//         for(const source of ss) {
//             sources.push(source)
//             console.log(source)
//         }
//         contextBridge.exposeInMainWorld("ELECTRON_SOURCES", sources)
//         const event = new CustomEvent('electron-sources-ready', { detail: sources })
//         document.dispatchEvent(event)
//     })
// })
