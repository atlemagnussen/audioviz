let anim = 0

export const captureAudio = async () => {
    console.log("Desktop audio capturing")

    if(anim){
        window.cancelAnimationFrame(anim);
    }
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        })

        return stream

    } catch (e) {
        console.log(e)
    }
}