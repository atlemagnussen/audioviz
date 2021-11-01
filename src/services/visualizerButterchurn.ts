// @ts-ignore
import butterchurn from "butterchurn"
// @ts-ignore
import butterchurnPresets from "butterchurn-presets"

let anim = 0
let stream: MediaStream | null

export const visualize = (str: MediaStream, canvas: HTMLCanvasElement) => {
    if (!str)
        throw new Error("no stream!")
    if (!canvas)
        throw new Error("no canvas!")

    stream = str

    if (anim)
        window.cancelAnimationFrame(anim)
    
    handleAudioStream(canvas)
}

export const stopViz = () => {
    if (anim){
        window.cancelAnimationFrame(anim)
    }
    
    stream?.getAudioTracks().map(at => at.stop())
    stream?.getVideoTracks().map(vt => vt.stop())
    stream = null
}

const handleAudioStream = (canvas: HTMLCanvasElement) => {

    
    const audioContext = new AudioContext()

    const src = audioContext.createMediaStreamSource(stream!)
    const analyzer = audioContext.createAnalyser()

    const visualizer = butterchurn.createVisualizer(audioContext, canvas, {
        width: 800,
        height: 600
    })

    visualizer.connectAudio(src);
    const presets = butterchurnPresets.getPresets()
    const preset = presets['Flexi, martin + geiss - dedicated to the sherwin maxawow']

    visualizer.loadPreset(preset, 0.0)

    visualizer.setRendererSize(canvas.width, canvas.height)

    // render a frame
    const renderFrame = () => {
        anim = requestAnimationFrame(renderFrame)

        visualizer.render();
        
    }
    renderFrame()
}