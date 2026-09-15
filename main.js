$(function () {
    stateImg(false)
});

function stateImg(state) {
    if (state) {
        $("#img-test").show();
    } else {
        $("#img-test").hide();
    }
}

$(document).on("click", "#btninfo", function () {
    stateImg(true)
})