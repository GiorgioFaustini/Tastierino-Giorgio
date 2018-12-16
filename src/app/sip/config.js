const JsSIP = require('jssip')
var socket = new JsSIP.WebSocketInterface('wss://10.111.112.152:8089/ws')
var config = {
    sockets     : [ socket ],
    uri         : 'sip:1003@10.111.112.152',
    realm       : 'asterisk',
    password    : 'pippo'
}

module.exports = {
    ua : new JsSIP.UA(config),
}