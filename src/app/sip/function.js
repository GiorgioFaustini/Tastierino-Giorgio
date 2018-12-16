const $ = require('jquery')

module.exports = () => {
    let display = $('.display')

    $('.button').click((e) => {
        var value = display
        var values = value.val() + (e.target.innerText)
        if (values.length > 10)
            values = values.slice(0, 10)
        value.val(values)
    })

    $('.delete').click(() => {
        var value = display
        if(display.val() === ' ')
            return
        var valore = display.val().slice(0, -1)
        display.val(valore)
    })

    display.keypress(function (e) {
        if (display.val() === ' '){
            display.val("")
        }
        let chr = String.fromCharCode(e.which);
        if ("0123456789#*".indexOf(chr) < 0)
            return false;
    })
    display.blur(() => {
        if (display.val() === ' ') display.val(' ')
    })
}