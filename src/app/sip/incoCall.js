const $ = require('jquery')
const {ua} = require('./config')
const callL = require('./call')
const trillo = require('./ring')

module.exports = () => {
    let chiamo = $('.chiamata')
    let chiudo = $('.endCall')
    let remoteStream = new Audio()
    ua.on("newRTCSession", function(e) {
        console.log("new RTC session created - incoming or outgoing call")
        if(e.originator === "remote") {
            console.log("incoming-call, answer!")
            trillo.incomingRing()
            chiamo.off("click")
            chiamo.click(() => {
                console.log('call accepted')
                chiamo.off('click')
                e.session.answer()
                e.session.connection.ontrack = function(e) {
                    console.log(e)
                    remoteStream.srcObject = e.streams[0]
                    remoteStream.load()
                    const playPromise = remoteStream.play();
                    if (playPromise !== null){
                        playPromise.catch(() => { playPromise })
                    }
                }
                trillo.stopRing()

            })
            chiudo.click(() => {
                console.log("call closed")
                e.session.terminate()
                trillo.stopRing()
                chiamo.off("click")
                chiudo.off("click")
                callL()
            })
            e.session.on('ended', function (e) {
                console.log('call ended')
                trillo.stopRing()
                chiudo.off("click")
                callL()
            })
            e.session.on('failed', function (e) {
                console.log('call failed')
                trillo.stopRing()
                chiudo.off("click")
                callL()
            })
            e.session.on('call lost', function (e) {
                console.log('call lost')
                trillo.stopRing()
                chiudo.off("click")
                callL()
            })
        }
    })
}