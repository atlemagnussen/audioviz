
import config from "@app/config"
import { captureScreenElectron, captureDeviceElectron } from "./captureElectron"

export const captureDevice = async (device: MediaDeviceInfo) => {
    if (config.isElectron)
        return captureDeviceElectron(device)
    return captureDeviceWeb(device)
}

export const captureScreen = async () => {
    if (config.isElectron)
        return captureScreenElectron()
    return captureScreenWeb()
}

const captureDeviceWeb = async (device: MediaDeviceInfo) => {
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