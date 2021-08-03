let anim = 0

const padding = 15
//const paddingBottom = 60
const barNumber = 27

let WIDTH = 10
let HEIGHT = 10

const ecart = 10
let barWidth: number
let canvas: HTMLCanvasElement

export const captureAudio = async (canv: HTMLCanvasElement) => {
    console.log("Desktop audio capturing")
    canvas = canv
    WIDTH = canvas.width - 2*padding;
    HEIGHT = canvas.height - 2*padding;
    barWidth = (WIDTH / barNumber) -ecart;

    if(anim){
        window.cancelAnimationFrame(anim);
    }
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        })

        handleAudioStream(stream)

    } catch (e) {
        console.log(e)
    }
}

const handleAudioStream = (stream: MediaStream) => {

    const context = new AudioContext();
    const src = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    const ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.fftSize = 512;

    const bufferLength = analyser.frequencyBinCount;
    const bufferByBar = Math.round(bufferLength/barNumber);
    const dataArray = new Uint8Array(bufferLength);

    var barHeight;
    var x = 0;

    const renderFrame = () => {
        anim = requestAnimationFrame(renderFrame);

        x = padding;

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "#0f0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < barNumber; i++) {
            barHeight = 0
            for (var j = 0; j < bufferByBar; j++) {
                barHeight += dataArray[i*bufferByBar+j];
            }
            barHeight = barHeight/bufferByBar;

            barHeight = barHeight/700*HEIGHT;

            var r = barHeight + (25 * (i/bufferLength));
            var g = 250 * (i/bufferLength);
            var b = 50;

            // var fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            var fillStyle = "#F00";

            ctx.fillStyle = fillStyle;
            // ctx.fillStyle = "#F00";
            ctx.fillRect(x, HEIGHT - 2*barHeight - barWidth/2, barWidth, 2*barHeight);

            ctx.beginPath();
            ctx.arc(x+(barWidth/2), HEIGHT - 2*barHeight -barWidth/2 , barWidth/2, 0, 2 * Math.PI, false);
            ctx.arc(x+(barWidth/2), HEIGHT - barWidth/2 , barWidth/2, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.lineWidth = 0;
            ctx.strokeStyle = fillStyle;
            ctx.stroke();


            x += barWidth + ecart;
        }
    }
    renderFrame();
};