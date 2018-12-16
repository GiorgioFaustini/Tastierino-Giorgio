let audio
let wait
function playAudio(audio) {
    audio.loop = true
    audio.load()
    const playPromise = audio.play()
    if (playPromise !== null) {
        playPromise.catch(() => {
            playPromise
        })
    }
}

module.exports = {

    incomingRing : function() {
        audio = new Audio('media/htc_tone.mp3')
        playAudio(audio)
    },

    waitingRing : function() {
        wait =  new Audio('media/busySignal.mp3')
        playAudio(wait)
    },

    stopRing : function() {
        audio.pause()
        audio.currentTime = 0
    }
}