$(document).ready(function () {

    $('#searchField').css({display: "none"});

    var gamer_step = 50;
    var gamer_step_time = 50;
    var gamer_silver_coins = 20;
    var gamer_gold_coins = 1;

    var gameActive = true;

    updateSilverCoinsCount(0);
    updateGoldCoinsCount(0);

    $(document).keypress(function (e) {

        if (gameActive) {

            var keynum;

            if (window.event) { // IE
                keynum = e.keyCode;
            } else if (e.which) { // Netscape/Firefox/Opera
                keynum = e.which;
            }

            console.log(keynum + " pressed");
            // a - 97
            // w - 119
            // s - 115
            // d - 100

            if (keynum == 97) {
                moveGamer("left", gamer_step);
            }
            if (keynum == 119) {
                moveGamer("top", gamer_step);
            }
            if (keynum == 115) {
                moveGamer("down", gamer_step);
            }
            if (keynum == 100) {
                moveGamer("right", gamer_step);
            }


            if (keynum == 113) {
                moveGamer("topleft", gamer_step);
            }
            if (keynum == 101) {
                moveGamer("topright", gamer_step);
            }
            if (keynum == 122) {
                moveGamer("downleft", gamer_step);
            }
            if (keynum == 99) {
                moveGamer("downright", gamer_step);
            }

        }
    })


    function moveGamer(direction, step) {
        var gamer_div = $("#gamer");
        var leftRange = parseInt(gamer_div.css("left"));
        var topRange = parseInt(gamer_div.css("top"));

        if (direction == "left") {
            gamer_div.css({"background-image": 'url("./img/gamer/gamer_l.png")'});

            if (!canMoveInLevel1(direction)) {
                return;
            }


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
            gamer_div.css({"background-image": 'url("./img/gamer/gamer_r.png")'});

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
            gamer_div.css({"background-image": 'url("./img/gamer/gamer_t.png")'});

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
            gamer_div.css({"background-image": 'url("./img/gamer/gamer_b.png")'});

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
            launchGeraGame();
        }

        updateCoordsLabel();
    }

    function awardIn() {
        var award = level1_award_map[gmrY][gmrX];
        // 2 - chest
        // 3 - coin
        if (award == 3) {
            level1_award_map[gmrY][gmrX] = 0;
        }
        return award;
    }

    function addSilverCoins(count) {
        if ((gamer_silver_coins + count) < 0) {
            return;
        } else {
            gamer_silver_coins += count;
            updateSilverCoinsCount(0);
        }
    }

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


    var dirt__ = "./img/level1/snow/dirt.png";
    var snow__ = "./img/level1/snow/snow.png";

    var gs_t__ = "./img/level1/snow/grass_snow_t.png";
    var gs_l__ = "./img/level1/snow/grass_snow_l.png";
    var gs_b__ = "./img/level1/snow/grass_snow_b.png";
    var gs_r__ = "./img/level1/snow/grass_snow_r.png";

    var gs_tr_ = "./img/level1/snow/grass_snow_tr.png";
    var gs_br_ = "./img/level1/snow/grass_snow_br.png";
    var gs_bl_ = "./img/level1/snow/grass_snow_bl.png";
    var gs_tl_ = "./img/level1/snow/grass_snow_tl.png";

    var gs_trc = "./img/level1/snow/grass_snow_trc.png";
    var gs_brc = "./img/level1/snow/grass_snow_brc.png";
    var gs_blc = "./img/level1/snow/grass_snow_blc.png";
    var gs_tlc = "./img/level1/snow/grass_snow_tlc.png";

    var search = "./img/level1/snow/search.png";


    var level1 = [
        [gs_r__, snow__, snow__, gs_l__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__],
        [gs_r__, snow__, snow__, gs_l__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, gs_brc, gs_b__, gs_b__, gs_blc, dirt__, dirt__, dirt__, dirt__, dirt__],
        [gs_r__, snow__, snow__, gs_bl_, gs_b__, gs_b__, gs_b__, gs_b__, gs_b__, gs_b__, gs_b__, gs_b__, gs_b__, gs_b__, gs_b__, gs_br_, snow__, snow__, gs_bl_, gs_b__, gs_b__, gs_b__, gs_blc, dirt__],
        [gs_r__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, gs_l__, dirt__],
        [gs_r__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, snow__, gs_l__, dirt__],
        [gs_trc, gs_t__, gs_t__, gs_t__, gs_t__, gs_tr_, snow__, snow__, gs_tl_, gs_t__, gs_t__, gs_t__, gs_t__, gs_t__, gs_t__, gs_tr_, snow__, snow__, gs_tl_, gs_t__, gs_t__, gs_t__, gs_tlc, dirt__],
        [dirt__, dirt__, dirt__, dirt__, dirt__, gs_r__, snow__, snow__, gs_l__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, gs_r__, snow__, snow__, gs_l__, dirt__, dirt__, dirt__, dirt__, dirt__],
        [dirt__, dirt__, gs_brc, gs_b__, gs_b__, gs_br_, snow__, snow__, gs_l__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, gs_r__, snow__, snow__, gs_l__, dirt__, dirt__, dirt__, dirt__, dirt__],
        [dirt__, dirt__, gs_r__, snow__, snow__, snow__, snow__, snow__, gs_l__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, gs_r__, snow__, snow__, gs_l__, dirt__, dirt__, dirt__, dirt__, dirt__],
        [dirt__, dirt__, gs_r__, snow__, snow__, snow__, snow__, snow__, gs_l__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, gs_r__, snow__, snow__, gs_l__, dirt__, dirt__, dirt__, dirt__, dirt__],
        [dirt__, dirt__, gs_r__, snow__, snow__, snow__, gs_tl_, gs_t__, gs_tlc, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, gs_r__, snow__, snow__, gs_l__, dirt__, dirt__, dirt__, dirt__, dirt__],
        [dirt__, dirt__, gs_trc, gs_t__, gs_t__, gs_t__, gs_tlc, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, dirt__, gs_r__, search, snow__, gs_l__, dirt__, dirt__, dirt__, dirt__, dirt__]
    ];

    // 1 – closed area
    // 0 – free to move
    var level1_way_map = [
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1]
    ];

    // 1 – closed area
    // 0 – free to move
    // 2 – chest
    // 3 – free silver coin
    // 666 – gera game
    var level1_award_map = [
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 666, 0, 1, 1, 1, 1, 1, 1]
    ];

    for (bg_row = 0; bg_row < 12; bg_row++) {

        for (bg_col = 0; bg_col < 24; bg_col++) {

            currentID = "gamearea_" + bg_row + "_" + bg_col;

            var currentIdHTML = getCurrentIdHTML(bg_row, bg_col);

            $("#" + currentID).html(currentIdHTML);
        }
    }

    function getCurrentIdHTML(row, col) {
        var html = "";

        if (level1_award_map[row][col] == 3) {
            html = "<img src='./img/coinGif2.gif' width='50'>";
        }

        console.log(html);

        return html;
    }

    var gmrX = 1;
    var gmrY = 0;

    function canMoveInLevel1(direction) {

        var answer = true;

        if (direction == "right") {
            console.log("right");

            if (gmrX + 1 > 23) {
                answer = false;
                return answer;
            }

            if (level1_way_map[gmrY][gmrX + 1] == 0) {
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

            if (level1_way_map[gmrY][gmrX - 1] == 0) {
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

            if (level1_way_map[gmrY - 1][gmrX] == 0) {
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

            if (level1_way_map[gmrY + 1][gmrX] == 0) {
                answer = true;
            } else {
                answer = false;
            }

        }

        return answer;
    }


    console.log("BACKGROUND LOADING: ");
    for (bg_row = 0; bg_row < 12; bg_row++) {

        for (bg_col = 0; bg_col < 24; bg_col++) {

            currentID = "gamearea_" + bg_row + "_" + bg_col;

            $("#" + currentID).css({
                "background-image": 'url("' + level1[bg_row][bg_col] + '")'
            });

        }

    }
    console.log("BACKGROUND LOADING SUCCESSFULLY COMPLETE");


    $('#menuModalBtn').click(function () {
        $(this).toggleClass('open');
    });

    function launchGeraGame() {
        $("#gameScene").fadeOut("slow", function () {
            console.log("gamearea hidden");
            gameActive = false;

            $('#searchField').css({display: "block"});

        });
        $('#bottom-box-5').css({display: "block"});

        if (launchGeraLevel1()) {

        } else {
            activateUserMovement();
        };
    }


    function activateUserMovement() {
        gameActive = true;
    }

});
