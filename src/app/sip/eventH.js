const $ = require('jquery')
const {ua} = require('../sip/config')
const calling = require('./call')
const incomingCall = require('./incoCall')
const outCalling =require('./outCall')

module.exports = () => {
    ua.on('connected', function (e) {
        console.log("connected to websocket", e);
    });
    ua.on('registered', function (e) {
        console.log("registered", e);
        calling()
        incomingCall()
        outCalling()
    });
    ua.on('unregistered', function (e) {
        console.log("ua has been unregistered periodic registration fails or ua.unregister()", e);
    });
    ua.on('registrationFailed', function (e) {
        console.log("register failed", e);
    });
    ua.on('busy', function (e){
        console.log("busy", e)
    });
    ua.on('disconnected', function (e) {
        console.log("disconnected");
        ua.stop();
    });
}