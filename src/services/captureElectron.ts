import { DesktopCapturerSource } from "electron"

let sources: DesktopCapturerSource[]



export const getSourcesElectron = (): DesktopCapturerSource[] => {
    console.log("sources before", sources)
    ///@ts-ignore
    sources = window.electron.getSources()
    console.log("sources after", sources)
        
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

export const captureSoureElectron = async (source: DesktopCapturerSource) => {
    const gdmOptions = {
        audio: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: source.id
            }
        },
        video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: source.id
            }
          }
    }

    const supported = navigator.mediaDevices.getSupportedConstraints()
    console.log("supported", supported)

    // @ts-ignore
    const stream = await navigator.mediaDevices.getDisplayMedia(gdmOptions)
    return stream
}