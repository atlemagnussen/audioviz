
let anim = 0

const padding = 15
//const paddingBottom = 60
const barNumber = 27

let WIDTH = 10
let HEIGHT = 10

const ecart = 10
let barWidth: number
let canvas: HTMLCanvasElement

let stream: MediaStream | null
let src: MediaStreamAudioSourceNode | null

export const visualize = async (stream: MediaStream, canv: HTMLCanvasElement) => {
    console.log("Desktop audio capturing")
    canvas = canv
    WIDTH = canvas.width - 2*padding
    HEIGHT = canvas.height - 2*padding
    barWidth = (WIDTH / barNumber) -ecart

    if (anim){
        window.cancelAnimationFrame(anim)
    }
    
    handleAudioStream(stream)
}

export const stopViz = () => {
    if (anim){
        window.cancelAnimationFrame(anim)
    }
    if (src) {
        src.disconnect()
    }
    stream?.getAudioTracks().map(at => at.stop())
    stream?.getVideoTracks().map(vt => vt.stop())
    stream = null
    src = null
}

export const getAudioTrackLabel = (stream: MediaStream) => {
    let label = ""
    const audioTracks = stream.getAudioTracks()
    
    if (audioTracks && audioTracks.length > 0) {
        for (const track of audioTracks) {
            // const settings = track.getSettings()
            // console.log(settings)
            if (track.label)
                label = `${label} ${track.label}`
        }
    }
    // const videoTracks = stream.getVideoTracks()
    // if (videoTracks && videoTracks.length > 0) {
    //     for (const track of videoTracks) {
    //         const settings = track.getSettings()
    //         console.log(settings)
    //         console.log(track)
    //     }
    // }
    return label
}
const handleAudioStream = (str: MediaStream) => {

    if (!str)
        throw new Error("no stream at all")
    
    if (!canvas)
        throw new Error("no canvas!")

    const context = new AudioContext()
    
    stream = str
    src = context.createMediaStreamSource(stream)
    const analyser = context.createAnalyser()
    
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    src.connect(analyser)
    
    analyser.fftSize = 512

    const bufferLength = analyser.frequencyBinCount
    const bufferByBar = Math.round(bufferLength/barNumber)
    const dataArray = new Uint8Array(bufferLength)

    var barHeight
    var x = 0

    const renderFrame = () => {
        anim = requestAnimationFrame(renderFrame)

        x = padding

        analyser.getByteFrequencyData(dataArray)

        ctx.fillStyle = "#0f0"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        for (var i = 0; i < barNumber; i++) {
            barHeight = 0
            for (var j = 0; j < bufferByBar; j++) {
                barHeight += dataArray[i*bufferByBar+j]
            }
            barHeight = barHeight/bufferByBar

            barHeight = barHeight/700*HEIGHT
            var fillStyle = "#F00"

            ctx.fillStyle = fillStyle
            // ctx.fillStyle = "#F00";
            ctx.fillRect(x, HEIGHT - 2*barHeight - barWidth/2, barWidth, 2*barHeight)

            ctx.beginPath();
            ctx.arc(x+(barWidth/2), HEIGHT - 2*barHeight -barWidth/2 , barWidth/2, 0, 2 * Math.PI, false)
            ctx.arc(x+(barWidth/2), HEIGHT - barWidth/2 , barWidth/2, 0, 2 * Math.PI, false)
            ctx.fill()
            ctx.lineWidth = 0
            ctx.strokeStyle = fillStyle
            ctx.stroke()


            x += barWidth + ecart
        }
    }
    renderFrame()
};