const $ = require('jquery')
const callL = require('./call')
const {ua} = require('./config')
const trillo = require('./ring')

module.exports = () => {
    let chiamo = $('.chiamata')
    let chiudo = $('.endCall')
    let remoteStream = new Audio()
    ua.on('newRTCSession', function (e) {
        if (e.originator === "local") {
            console.log('start-calling')
            trillo.incomingRing()
            e.session.connection.ontrack = function(e) {
                console.log(e)
                trillo.stopRing()
                remoteStream.srcObject = e.streams[0]
                remoteStream.load()
                const playPromise = remoteStream.play();
                if (playPromise !== null){
                    playPromise.catch(() => { playPromise })
                }
            }
            chiamo.off("click")
            chiudo.click(() => {
                e.session.terminate()
                console.log('call closed')
                chiudo.off("click")
            })
            e.session.on('ended', function(e){
                console.log('session ended')
                trillo.stopRing()
                chiudo.off("click")
                callL()
            })
            e.session.on('failed', function(e){
                console.log('call failed')
                trillo.stopRing()
                chiudo.off("click")
                callL()
            })
        }
    })
}
