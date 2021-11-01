
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