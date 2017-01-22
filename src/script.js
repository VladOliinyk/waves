var gamer_step = 50;
var gamer_step_time = 50;
var gamer_silver_coins = 0;
var gamer_gold_coins = 1;

var gmrX = 2;
var gmrY = 2;
var completeLvl = 0;
var gmrLook = "bot";
var degre = -90;
var shipPart = '01';

$(document).ready(function () {

    $('#gamer').css({
        left: 50 * gmrX,
        top: 50 * gmrY
    });

    $('.searchField').css({display: "none"});

    updateSilverCoinsCount(0);
    updateGoldCoinsCount(0);

    $(document).keydown(function (e) {
        if ($("#gameScene").css('display') == 'block') {

            var keynum;

            if (window.event) { // IE
                keynum = e.keyCode;
            } else if (e.which) { // Netscape/Firefox/Opera
                keynum = e.which;
            }

            console.log(keynum + " pressed");
            // <  - 37
            // /\ - 38
            // \/ - 40
            // >  - 39

            // a – 65
            // w – 87
            // s – 83
            // d – 68

            if (keynum == 37 || keynum == 65) {
                moveGamer("left", gamer_step);
            }
            if (keynum == 38 || keynum == 87) {
                moveGamer("top", gamer_step);
            }
            if (keynum == 40 || keynum == 83) {
                moveGamer("down", gamer_step);
            }
            if (keynum == 39 || keynum == 68) {
                moveGamer("right", gamer_step);
            }
        }
    });


    function moveGamer(direction, step) {
        var gamer_div = $("#gamer");
        var leftRange = parseInt(gamer_div.css("left"));
        var topRange = parseInt(gamer_div.css("top"));

        if (direction == "left") {

            if (!canMoveInLevel1(direction)) {
                return;
            }

            gamer_div.css({transform: 'rotate(90deg)'});

            if (leftRange >= 1) {
                gamer_div.finish();
                gamer_div.animate({
                    left: "-=" + step
                }, gamer_step_time)
            } else {
                gamer_div.animate({
                    left: "0px"
                }, 1);
            }

            gmrX--;
        }

        if (direction == "right") {

            gamer_div.css({transform: 'rotate(-90deg)'});

            if (!canMoveInLevel1(direction)) {
                return;
            }


            if (leftRange < 1149) {
                gamer_div.finish();
                gamer_div.animate({
                    left: "+=" + step
                }, gamer_step_time);
            } else {
                gamer_div.animate({
                    left: "1150"
                }, 1);
            }

            gmrX++;
        }

        if (direction == "top") {

            gamer_div.css({transform: 'rotate(180deg)'});

            if (!canMoveInLevel1(direction)) {
                return;
            }


            if (topRange > 0) {
                gamer_div.finish();
                gamer_div.animate({
                    top: "-=" + step
                }, gamer_step_time);
            } else {
                gamer_div.animate({
                    top: "0"
                }, 1);
            }

            gmrY--;
        }

        if (direction == "down") {

            gamer_div.css({transform: 'rotate(0deg)'});

            if (!canMoveInLevel1(direction)) {
                return;
            }

            if (topRange < 549) {
                gamer_div.finish();
                gamer_div.animate({
                    top: "+=" + step
                }, gamer_step_time);
            } else {
                gamer_div.animate({
                    top: "550"
                }, 1);
            }

            gmrY++;
        }

        var award = awardIn();
        console.log("award " + award);
        if (award == 3) {
            addCoin = 1;
            updateSilverCoinsCount(addCoin);
        }
        if (award == 666) {
            completeLvl++;
            eval('ship_'+ shipPart+'_award_map[gmrY][gmrX]= 0');
            launchGeraGame();
        }
        if (award < 0) {
            changeLocation(award);

        }

        updateCoordsLabel();
    }

    function changeLocation(award){
        switch (award) {
            case -1:
                $('#gamearea')
                .fadeOut( "slow", function() {
                        if(shipPart=='01'){
                            gmrX = 0;
                            $('#gamer').animate({
                                left: 50*gmrX
                            }, 1);
                        } else{
                                gmrY = 11;
                                $('#gamer').animate({
                                    top: 50 * gmrY
                                }, 1);
                        }

                        shipPart = '02';
                        updateAwardMap()
                        $('#gamearea')
                            .css({'background-image': 'url("./img/ship_bg/ship_02.png"), url("./img/ship_bg/water.gif")'})
                            .fadeIn();
                    });
                break;
            case -5:
                $('#gamearea')
                    .fadeOut( "slow", function() {
                        if(shipPart=='01'){
                            gmrX = 23;
                            $('#gamer').animate({
                                left: 50*gmrX
                            }, 1);
                        } else{
                                gmrY = 11;
                                $('#gamer').animate({
                                    top: 50 * gmrY
                                }, 1);
                        }

                        shipPart = '00';
                        updateAwardMap()
                        $('#gamearea')
                            .css({'background-image': 'url("./img/ship_bg/ship_00.png"), url("./img/ship_bg/water.gif")'})
                            .fadeIn();
                    });
                break;
            case -6:
                $('#gamearea')
                    .fadeOut( "slow", function() {
                        if (shipPart == '00'){
                            gmrX = 0;
                            $('#gamer').animate({
                                left: 50*gmrX
                            }, 1);
                        } else if(shipPart=='11'){
                                gmrY = 11;
                                $('#gamer').animate({
                                    top: 50 * gmrY
                                }, 1);
                        } else{
                            gmrX = 23;
                            $('#gamer').animate({
                                left: 50 * gmrX
                            }, 1);
                        }

                        shipPart = '01';
                        updateAwardMap()
                        $('#gamearea')
                            .css({'background-image': 'url("./img/ship_bg/ship_01.png"), url("./img/ship_bg/water.gif")'})
                            .fadeIn();
                    });
                break;
            case -4:
                $('#gamearea')
                    .fadeOut( "slow", function() {
                        if (shipPart == '00'){
                            gmrY = 0;
                            $('#gamer').animate({
                                top: 50*gmrY
                            }, 1);
                        } else {
                            gmrX = 23;
                            $('#gamer').animate({
                                left: 50 * gmrX
                            }, 1);
                        }

                        shipPart = '10';
                        updateAwardMap()
                        $('#gamearea')
                            .css({'background-image': 'url("./img/ship_bg/ship_10.png"), url("./img/ship_bg/water.gif")'})
                            .fadeIn();
                    });
                break;
            case -3:
                $('#gamearea')
                    .fadeOut( "slow", function() {
                        if (shipPart == '01'){
                            gmrY = 0;
                            $('#gamer').animate({
                                top: 50*gmrY
                            }, 1);
                        } else if(shipPart == '10'){
                            gmrX = 0;
                            $('#gamer').animate({
                                left: 50 * gmrX
                            }, 1);
                        } else{
                            gmrX = 23;
                            $('#gamer').animate({
                                left: 50 * gmrX
                            }, 1);
                        }

                        shipPart = '11';
                        updateAwardMap()
                        $('#gamearea')
                            .css({'background-image': 'url("./img/ship_bg/ship_11.png"), url("./img/ship_bg/water.gif")'})
                            .fadeIn();
                    });
                break;
            case -2:
                $('#gamearea')
                    .fadeOut( "slow", function() {
                        if (shipPart == '11'){
                            gmrX = 0;
                            $('#gamer').animate({
                                left: 50*gmrX
                            }, 1);
                        } else {
                            gmrY = 0;
                            $('#gamer').animate({
                                top: 50 * gmrY
                            }, 1);
                        }

                        shipPart = '12';
                        updateAwardMap()
                        $('#gamearea')
                            .css({'background-image': 'url("./img/ship_bg/ship_12.png"), url("./img/ship_bg/water.gif")'})
                            .fadeIn();
                    });
                break;
        }
    }
    function awardIn() {
        var award = eval('ship_'+shipPart+'_award_map[gmrY][gmrX]');
        // 2 - chest
        // 3 - coin
        if (award == 3) {
            eval('ship_'+ shipPart+'_award_map[gmrY][gmrX]= 0');
        }
        return award;
    }


    // 1 – closed area
    // 0 – free to move
    var ship_01_way_map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
    ];
    var ship_02_way_map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1]
    ];
    var ship_00_way_map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
    ];
    var ship_10_way_map = [
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    var ship_11_way_map = [
        [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    var ship_12_way_map = [
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    // 1 – closed area
    // 0 – free to move
    // 2 – chest
    // 3 – free silver coin
    // 666 – gera game
    var ship_01_award_map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 666, 0, 0, 1, 1, 1],
        [-5, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, -1],
        [-5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, -1],
        [1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, -1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, -1],
        [-5, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, -1],
        [-5, -3, -3, 1, 1, 1, 1, -3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1]
    ];
    var ship_02_award_map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [-6, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [-6, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [-6, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [-6, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 666, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
        [-6, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [-6, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
        [0, -2, -2, -2, -2, -2, 1, 1, 1, -2, -2, 1, 1, 1, 1, 1, 1, -2, -2, -2, -2, 1, 1, 1]
    ];
    var ship_00_award_map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 666, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, -6],
        [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -6],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, -6],
        [1, 1, 1, 1, -4, -4, -4, -4, -4, -4, 1, 1, 1, 1, 1, 1, 1, -4, -4, -4, -4, -4, -4, -6]
    ];
    var ship_10_award_map = [
        [1, 1, 1, 1, -5, -5, -5, -5, -5, -5, 1, 1, 1, 1, 1, 1, 1, -5, -5, -5, -5, -5, -5, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, -3],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -3],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, -3],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, -3],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 666, 1, 1, 1, 0, 0, -3],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    var ship_11_award_map = [
        [-6, -6, -6, 0, 1, 1, 1, -6, -6, -6, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [-4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, -2],
        [-4, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, -2],
        [-4, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [-4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, -2],
        [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
        [-4, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, -2],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, -2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    var ship_12_award_map = [
        [-1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1],
        [-3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [-3, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 666, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [-3, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
        [-3, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [-3, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];
    updateAwardMap();
    function updateAwardMap(){
        for (bg_row = 0; bg_row < 12; bg_row++) {

            for (bg_col = 0; bg_col < 24; bg_col++) {

                currentID = "gamearea_" + bg_row + "_" + bg_col;

                var currentIdHTML = getCurrentIdHTML(bg_row, bg_col);

                $("#" + currentID).html(currentIdHTML);
            }
        }
    }



    function getCurrentIdHTML(row, col) {
        var html = "";

        if (eval('ship_' + shipPart + '_award_map[row][col]') == 3) {
            html = "<img src='./img/coinGif2.gif' width='50'>";
        }

        if (eval('ship_' + shipPart + '_award_map[row][col]') == 666){
            html = "<img src='./img/ship_bg/openContainer.png' width='50'>";
        }


        console.log(html);

        return html;
    }

    function canMoveInLevel1(direction) {

        var answer = true;

        if (direction == "right") {
            console.log("right");

            if (gmrX + 1 > 23) {
                answer = false;
                return answer;
            }

            if (eval('ship_'+shipPart+'_way_map[gmrY][gmrX + 1]') == 0) {
                answer = true;
            } else {
                answer = false;
            }

        }
        if (direction == "left") {
            console.log("left");

            if (gmrX - 1 < 0) {
                answer = false;
                return answer;
            }

            if (eval('ship_'+shipPart+'_way_map[gmrY][gmrX - 1]')   == 0) {
                answer = true;
            } else {
                answer = false;
            }

        }
        if (direction == "top") {
            console.log("top");

            if (gmrY - 1 < 0) {
                answer = false;
                return answer;
            }


            if ( eval('ship_' +shipPart+ '_way_map[gmrY - 1][gmrX]') == 0) {
                answer = true;
            } else {
                answer = false;
            }

        }
        if (direction == "down") {
            console.log("down");

            if (gmrY + 1 > 11) {
                answer = false;
                return answer;
            }



            if (eval('ship_'+shipPart+'_way_map[gmrY + 1][gmrX]') == 0) {
                answer = true;
            } else {
                answer = false;
            }

        }

        return answer;
    }


    $('#menuModalBtn').click(function () {
        $(this).toggleClass('open');
    });

    function launchGeraGame() {
        $("#gameScene").fadeOut("slow", function () {
            console.log("gamearea hidden");

            $('.field' + completeLvl).css({display: "block"});

        });
        $('#bottom-box-5').css({display: "block"});

        launchGeraLevel1(completeLvl, shipPart)
    }


}); // document ready end


function updateSilverCoinsCount(count) {

    console.log("now we have " + count + " silver coins");

    if ((gamer_silver_coins + count) < 0) {
        return;
    } else {
        gamer_silver_coins += count;
        newValue = "x" + gamer_silver_coins;
        $("#coin_silver_count").val(newValue);
        console.log("new coins count " + gamer_silver_coins);
        removeCoinFrom(gmrX, gmrY);
    }
}

function updateGoldCoinsCount(count) {

    console.log("now we have " + count + " gold coins");

    if ((gamer_gold_coins + count) < 0) {
        return;
    } else {
        gamer_gold_coins += count;
        newValue = "x" + gamer_gold_coins;
        $("#coin_gold_count").val(newValue);
        console.log("new coins count " + gamer_gold_coins);
        removeCoinFrom(gmrX, gmrY);
    }
}


function removeCoinFrom(gmrX, gmrY) {
    currentID = "gamearea_" + gmrY + "_" + gmrX;
    $("#" + currentID).html("");
}


function updateCoordsLabel() {

    var gamerY = parseInt($("#gamer").css("top")) + 25;
    var gamerX = parseInt($("#gamer").css("left")) + 25;

    var str = "Center position: (" + gamerX + ":" + gamerY + ")";
    $("#coords").val(str);
}
function checkMoney(){
    return gamer_silver_coins
}

function addSilverCoins(count) {
    console.log("add " + count + " coins");
    if ((gamer_silver_coins + count) < 0) {
        return;
    } else {
        gamer_silver_coins += count;
        updateSilverCoinsCount(0);
    }
}