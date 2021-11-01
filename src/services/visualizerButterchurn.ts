// @ts-ignore
import butterchurn from "butterchurn"
// @ts-ignore
import { presets, butterPreset } from "@app/stores/settingsStore"

let anim = 0
let stream: MediaStream | null
let canvas: HTMLCanvasElement | null
let visualizer: any|null = null


let presetName = ""
butterPreset.subscribe(name => {
    presetName = name
    if (visualizer) {
        const preset = presets[presetName]
        visualizer.loadPreset(preset, 0.0)
    }
})

export const visualize = (str: MediaStream, can: HTMLCanvasElement) => {
    if (!str)
        throw new Error("no stream!")
    if (!can)
        throw new Error("no canvas!")

    stream = str
    canvas = can

    if (anim)
        window.cancelAnimationFrame(anim)
    
    handleAudioStream()
}

export const stopViz = () => {
    if (anim){
        window.cancelAnimationFrame(anim)
    }
    
    stream?.getAudioTracks().map(at => at.stop())
    stream?.getVideoTracks().map(vt => vt.stop())
    stream = null
}

export const canvasResized = () => {
    if (visualizer)
        visualizer.setRendererSize(canvas?.width, canvas?.height)
}

export const changePreset = (name: string) => {
    const preset = presets[name]
    visualizer.loadPreset(preset, 0.0)
}

const handleAudioStream = () => {

    
    const audioContext = new AudioContext()

    const src = audioContext.createMediaStreamSource(stream!)
    const analyzer = audioContext.createAnalyser()

    visualizer = butterchurn.createVisualizer(audioContext, canvas, {
        width: 800,
        height: 600
    })

    visualizer.connectAudio(src);
    
    const preset = presets[presetName]

    visualizer.loadPreset(preset, 0.0)
    canvasResized()

    const renderFrame = () => {
        anim = requestAnimationFrame(renderFrame)
        visualizer.render();
    }
    renderFrame()
}