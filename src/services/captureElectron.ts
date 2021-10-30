
let sources: any

export const getSourcesElectron = async () => {
    if (!sources) {
        // @ts-ignore
        sources = window.ELECTRON_SOURCES
    }
        
    return sources
}

export const getStreamElectron = async (sourceId: number) => {

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            // @ts-ignore
            video: { mandatory: { chromeMediaSource: 'desktop', chromeMediaSourceId: sourceId} }
        })
        return stream
    } catch (e) {
        console.error(e)
    }
}