const $ = require('jquery')
const {ua} = require('./config')

var eventHandlers = {
    'progress' : function (e) {
        console.log('call is in progress')
    },
    'failed' : function (e) {
        console.log('call failed', + e)
        if(e.cause !== undefined) console.log('call failed with cause: ' + e.cause + " ")
        if(e.message != null) console.log(e.message.data)
    },
    'ended' : function (e) {
        console.log('call ended')
        if(e.cause !== undefined) console.log('call ended with cause: ' + e.cause + " ")
        if(e.message != null) console.log(e.message.data)
    },
    'confirmed' : function (e) {
        console.log('call confirmed')
    },
}

var options = {
    'eventHandlers'     : eventHandlers,
    'mediaConstraints'  : { 'audio': true, 'video': false}
}

module.exports = () => {
    $('.chiamata').click(() => {
        const textInput = $('.display')
        if(textInput.val() === ' '){
            return
        }
        ua.call('sip:' + textInput.val() + '@10.111.112.152', options)
    })
}

