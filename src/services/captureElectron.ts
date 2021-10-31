
let sources: any

export const getSourcesElectron = async () => {
    if (!sources) {
        // @ts-ignore
        sources = window.ELECTRON_SOURCES
    }
        
    return sources
}

export const captureDeviceElectron = async (device: MediaDeviceInfo) => {
    const stream = await navigator.mediaDevices.getUserMedia({
        // @ts-ignore
        audio: { mandatory: { chromeMediaSource: 'desktop' }},
        // @ts-ignore
        video: { mandatory: { chromeMediaSource: 'desktop', chromeMediaSourceId: device.deviceId} }
    })
    return stream

}

export const captureScreenElectron = async () => {
    const gdmOptions = {
        audio: {
            mandatory: {
                chromeMediaSource: 'desktop'
            }
        },
        video: {
            mandatory: {
                chromeMediaSource: 'desktop'
            }
        }
    }
    // @ts-ignore
    const stream = await navigator.mediaDevices.getDisplayMedia(gdmOptions)
    return stream
}