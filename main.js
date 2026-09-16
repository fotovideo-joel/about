console.log("se cargo el js correctamente");
$(function () {
    stateText(false);
});
function stateText(state) {
    if (state) {
        $("#text-example").show();
    } else {
        $("#text-example").hide();
    }
}
$(document).on("click", "#btnSendPassword", function (e) {
    stateText(true);
    
});

