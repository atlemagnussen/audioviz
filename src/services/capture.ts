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
    const gdmOptions: DisplayMediaStreamConstraints = {
        video: true,
        audio: {
            echoCancellation: true,
            sampleRate: 44100
        }
    }
    const stream = await navigator.mediaDevices.getDisplayMedia(gdmOptions)
    return stream;
}