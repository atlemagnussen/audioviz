const { contextBridge } = require("electron")
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
    // @ts-ignore
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element)
            element.innerText = text
    }
    contextBridge.exposeInMainWorld("IN_ELECTRON_ENV", true);
    // for (const type of ['chrome', 'node', 'electron']) {
    //     replaceText(`${type}-version`, process.versions[type])
    // }
})
