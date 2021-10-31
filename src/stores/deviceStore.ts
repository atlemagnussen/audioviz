import { BehaviorSubject } from "rxjs"
import config from "@app/config"

const audioDevicesSubject = new BehaviorSubject<MediaDeviceInfo[]>([])
export const audioDevices = audioDevicesSubject.asObservable()

const selectedDeviceSubject = new BehaviorSubject<MediaDeviceInfo|null>(null)
export const selectedDevice = selectedDeviceSubject.asObservable()
export const setSelectedDevice = (device: MediaDeviceInfo) => {
    selectedDeviceSubject.next(device)
}

export const loadSources = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const audioDevices = devices.filter(d => d.kind == "audioinput" || d.kind == "audiooutput") // 
    audioDevicesSubject.next(audioDevices)
    
    // const constrains = await navigator.mediaDevices.getSupportedConstraints()
    // console.log(constrains)
}

const loadElectronSources = () => {
    if (config.isElectron) {
        // @ts-ignore
        const electronDevices = window.ELECTRON_SOURCES
        const devices = electronDevices.map((e: { id: any; name: any }) => {
            const d: MediaDeviceInfo = {
                deviceId: e.id,
                label: e.name,
                kind: "audiooutput",
                groupId: "",
                toJSON: () => {}
            }
            return d
        })
        audioDevicesSubject.next(devices)
    }
}

document.addEventListener("electron-sources-ready", (e: Event) => {
    // const evt = e as CustomEvent
    // console.log(evt.detail)
    loadElectronSources()
}, {
    once: true
})


document.addEventListener("DOMContentLoaded", () => {
    loadSources()
}, {
    once: true
})