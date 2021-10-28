export const captureStreamFromDevice = async (device: MediaDeviceInfo) => {
    const gdmOptions: DisplayMediaStreamConstraints = {
        audio: {
            deviceId: device.deviceId,
            groupId: device.groupId
        }
    }

    const stream = await navigator.mediaDevices.getUserMedia(gdmOptions)
    return stream
}