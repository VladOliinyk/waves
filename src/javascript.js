var startTimer = 150;
var findItemPrize = 5; // coins count when gamer find one hidden item


function launchGeraLevel1() {

    $(".img_lvl_1_1").click(function () {

        $(".img_lvl_1_1").animate({
            top: "0",
            left: "1000"

        }, 1500, function () {
            $(".img_lvl_1_1").css({display: "none"})
            $(".find_element1").css({
                "background-image": 'url("./img/search/level1-item1-show.png")',
                "background-repeat": "no-repeat"
            });

            addSilverCoins(findItemPrize);
        });
    });

    $(".img_lvl_1_2").click(function () {

        $(".img_lvl_1_2").animate({
            top: "0",
            left: "1000"
        }, 1500, function () {
            $(".img_lvl_1_2").css({display: "none"});
            $(".find_element2").css({
                "background-image": 'url("./img/search/level1-item2-show.png")',
                "background-repeat": "no-repeat"
            });
            addSilverCoins(findItemPrize);
        });
    });

    $(".img_lvl_1_3").click(function () {

        $(".img_lvl_1_3").animate({
            top: "0",
            left: "1000"

        }, 1500, function () {
            $(".img_lvl_1_3").css({display: "none"});
            $(".find_element3").css({
                "background-image": 'url("./img/search/level1-item3-show.png")',
                "background-repeat": "no-repeat"
            });
            addSilverCoins(findItemPrize);
        });
    });

    $(".img_lvl_1_4").click(function () {

        $(".img_lvl_1_4").animate({
            top: "0",
            left: "1000"

        }, 1500, function () {
            $(".img_lvl_1_4").css({display: "none"});
            $(".find_element4").css({
                "background-image": 'url("./img/search/level1-item4-show.png")',
                "background-repeat": "no-repeat"
            });
            addSilverCoins(findItemPrize);
        });
    });

    $(".img_lvl_1_5").click(function () {

        $(".img_lvl_1_5").animate({
            top: "0",
            left: "1000"

        }, 1500, function () {
            $(".img_lvl_1_5").css({display: "none"});
            $(".find_element5").css({
                "background-image": 'url("./img/search/level1-item5-show.png")',
                "background-repeat": "no-repeat"
            });
            addSilverCoins(findItemPrize);
        });
    });

    $(".img_lvl_1_6").click(function () {

        $(".img_lvl_1_6").animate({
            top: "0",
            left: "1000"

        }, 1500, function () {
            $(".img_lvl_1_6").css({display: "none"})
            $(".find_element6").css({
                "background-image": 'url("./img/search/level1-item6-show.png")',
                "background-repeat": "no-repeat"
            });
            addSilverCoins(findItemPrize);
        });
    });

    $(".img_lvl_1_7").click(function () {

        $(".img_lvl_1_7").animate({
            top: "0",
            left: "1000"
        }, 1500, function () {
            $(".img_lvl_1_7").css({display: "none"});
            $(".find_element7").css({
                "background-image": 'url("./img/search/level1-item7-show.png")',
                "background-repeat": "no-repeat"
            });
            addSilverCoins(findItemPrize);
        });
    });

    $(".img_lvl_1_8").click(function () {

        $(".img_lvl_1_8").animate({
            top: "0",
            left: "1000"

        }, 1500, function () {
            $(".img_lvl_1_8").css({display: "none"});
            $(".find_element8").css({
                "background-image": 'url("./img/search/level1-item8-show.png")',
                "background-repeat": "no-repeat"
            });
            addSilverCoins(findItemPrize);
        });
    });

    $(".img_lvl_1_9").click(function () {

        $(".img_lvl_1_9").animate({
            top: "0",
            left: "1000"

        }, 1500, function () {
            $(".img_lvl_1_9").css({display: "none"});
            $(".find_element9").css({
                "background-image": 'url("./img/search/level1-item9-show.png")',
                "background-repeat": "no-repeat"
            });
            addSilverCoins(findItemPrize);
        });
    });

    $(".img_lvl_1_10").click(function () {

        $(".img_lvl_1_10").animate({
            top: "0",
            left: "1000"

        }, 1500, function () {
            $(".img_lvl_1_10").css({display: "none"});
            $(".find_element10").css({
                "background-image": 'url("./img/search/level1-item10-show.png")',
                "background-repeat": "no-repeat"
            });
            addSilverCoins(findItemPrize);
        });
    });
    var loopUsed = false;

    $("#glass").click(function () {
        console.log("zoom clicked");
        if (loopUsed) {
            loopUsed = false;
            var $zoom = $('img').magnify();
            $zoom.destroy();
        } else {
            loopUsed = true;
            $('img').magnify({
                speed: 100, // fade in/out speed
                timeout: -1, // timeout for mobile
                src: './img/search/level1-full-150.png', // The URI of the large image that will be shown in the magnifying lens.
                onload: function () {
                } // callback
            });

        }
    });


    var items = [".img_lvl_1_1", ".img_lvl_1_2", ".img_lvl_1_3", ".img_lvl_1_4",
        ".img_lvl_1_5", ".img_lvl_1_6", ".img_lvl_1_7", ".img_lvl_1_8", ".img_lvl_1_9",
        "img_lvl_1_10"];
    var fantoms = [".find_element1",
        ".find_element2",
        ".find_element3",
        ".find_element4",
        ".find_element5",
        ".find_element6",
        ".find_element7",
        ".find_element8",
        ".find_element9",
        ".find_element10"];

    var randNumbers = [];

    for (var i = 0; i < 5; i++) {
        var currentRandNumber = getRandomInt(0, 9);

        while ($.inArray(currentRandNumber, randNumbers) !== -1) {
            currentRandNumber = getRandomInt(0, 9);
        }

        randNumbers.push(currentRandNumber)
    }
    for (var i = 0; i < randNumbers.length; i++) {
        $(items[randNumbers[i]])
            .css({
                visibility: "visible"
            });
        $(fantoms[randNumbers[i]])
            .css({
                display: "inline-block"
            });
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    $('#element').pietimer();
    $('#element').pietimer({
            seconds: startTimer,
            color: 'rgba(0, 0, 0, 0.8)',
            height: 96,
            width: 96
        },
        function () {
            $("#searchField").fadeOut('slow');
            showSwarchOverMenu();
        });
    $('#element').pietimer('start');


    var modal = $('#searchOverModalBox');
    var backToAdvantureBtn = $('#backToAdvanture');
    var buy10secBtn = $('#buy10seconds');

    function showSwarchOverMenu() {
        modal.css({display: "block"});
    }

    function hideSwarchOverMenu() {
        modal.css({display: "none"});
    }

    backToAdvantureBtn.click(function () {
        console.log("backToAdvanture");
        hideSwarchOverMenu();

        stopAndHideGeraLevel1();
    });

    buy10secBtn.click(function () {
        hideSwarchOverMenu();
        addSilverCoins(-10);
        $("#searchField").fadeIn("slow", function () {

        });
        $('#element').pietimer();
        $('#element').pietimer({
                seconds: 10,
                color: 'rgba(0, 0, 0, 0.8)',
                height: 96,
                width: 96
            },
            function () {
                $("#searchField").fadeOut('slow');

            });
        $('#element').pietimer('start');
    });

    function stopAndHideGeraLevel1() {
        $('#element').pietimer('pause');
        $("#gameScene").fadeIn("slow", function () {
            console.log("gamearea show");
            $('#searchField').css({display: "none"});

            return 0;
        });
    }

    $('#searchField').dblclick(function () {
            $('body').css({pointerEvents: 'none'});
            $('html,body').css('cursor','no-drop ');
            setTimeout(function(){
                $('body').css({pointerEvents: 'auto', cursor: 'default'});
            }, 2500)
    })

}
