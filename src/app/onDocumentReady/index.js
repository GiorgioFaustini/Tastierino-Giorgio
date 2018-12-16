const jssip = require('../sip')

module.exports = () => {
    jssip.phone.ua.start()
    jssip.function()
    jssip.event()
}