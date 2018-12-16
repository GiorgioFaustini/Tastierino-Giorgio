const $ = require('jquery')
const onDocumentReady = require('./onDocumentReady')

module.exports = () => {
    $(document).ready(onDocumentReady)
}