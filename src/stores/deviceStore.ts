import { BehaviorSubject } from "rxjs"

const audioDevicesSubject = new BehaviorSubject<MediaDeviceInfo[]>([])
export const audioDevices = audioDevicesSubject.asObservable()

const selectedDeviceSubject = new BehaviorSubject<MediaDeviceInfo|null>(null)
export const selectedDevice = selectedDeviceSubject.asObservable()
export const setSelectedDevice = (device: MediaDeviceInfo) => {
    selectedDeviceSubject.next(device)
}

const loadSources = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const audioDevices = devices.filter(d => d.kind == "audioinput" || d.kind == "audiooutput")
    audioDevicesSubject.next(audioDevices)
}

document.addEventListener("DOMContentLoaded", () => {
    loadSources()
}, {
    once: true
})