$(function () {
    statetext(false)
});


function statetext(state) {
    if (state) {
        $("#text-example").show();
    } else {
        $("#text-example").hide();
    }
}

$(document).on("click", "#btninfo", function () {
    statetext(true)
})