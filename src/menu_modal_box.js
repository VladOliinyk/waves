$(document).ready(function () {

    var modal = $('#menuModalBox');
    var btn = $('#menuModalBtn');
    var closeBtn = $('#menuModalCloseBtn');

    btn.click(function () {
        console.log("btn clicked");
        modal.css({display: "block"});
    });

    closeBtn.click(function () {
        console.log("closeBtn clicked");
        btn.trigger('click');

        modal.animate({
            opacity: "0"
        }, 500, function () {
            modal.css({display: "none", opacity: "1"});
        });

    });

});