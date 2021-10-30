
export const captureStreamFromDevice = async (device: MediaDeviceInfo) => {
    const gdmOptions: DisplayMediaStreamConstraints = {
        audio: {
            // deviceId: {
            //     exact: device.deviceId
            // }
            deviceId: device.deviceId,
            groupId: device.groupId
        }
    }

    const stream = await navigator.mediaDevices.getUserMedia(gdmOptions)
    return stream
}

export const captureScreen = async () => {
    // @ts-ignore
    const isElectron = window.IN_ELECTRON_ENV
    console.log(`isElectron=${isElectron}`)

    if (isElectron) {
        return captureScreenElectron()
    }
    return captureScreenWeb()
    
}

const captureScreenElectron = async () => {
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

const captureScreenWeb = async () => {
    const gdmOptions: DisplayMediaStreamConstraints = {
        video: true,
        audio: {
            echoCancellation: true,
            sampleRate: 44100
        }
    }
    const stream = await navigator.mediaDevices.getDisplayMedia(gdmOptions)
    return stream
}