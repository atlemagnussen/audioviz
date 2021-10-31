let isElectron = false
let platform: Platform = "web"
let versions = {chrome: "", node: "", electron: ""}
// @ts-ignore this is set in preload.js
if (window.ELECTRON_ENV) {
    isElectron = true
    // @ts-ignore
    platform = window.ELECTRON_ENV.platform
    // @ts-ignore
    versions.chrome = window.ELECTRON_ENV.chrome
    // @ts-ignore
    versions.node = window.ELECTRON_ENV.node
    // @ts-ignore
    versions.electron = window.ELECTRON_ENV.electron
}

const features = {
    getUserMedia: false,
    getDisplayMedia: false
}

if (navigator.mediaDevices) {
    if ("getUserMedia" in navigator.mediaDevices)
        features.getUserMedia = true
    if ("getDisplayMedia" in navigator.mediaDevices)
        features.getDisplayMedia = true
}
let noCaptureSupport = (!features.getUserMedia && !features.getDisplayMedia)
if (platform == "darwin")
    noCaptureSupport = true

export default { features, isElectron, platform, versions, noCaptureSupport }