var startTimer = 65;
var findItemPrize = 5; // coins count when gamer find one hidden item
var extraseconds = 15;

function launchGeraLevel1(lvl, ship) {
    var countElements = 0;

    var searchAud = new Audio();
    searchAud.src = './sound/find_cargo_bg_audio.mp3';
    searchAud.play();
    searchAud.volume = 0.5;

    $('#sashaMenu').css({'display': 'block'});
    $('.menu_' + lvl).css({'display': 'block'});

    $('.img_click').unbind('click').click(function () {

        var aud = new Audio();
        aud.src = './sound/find_cargo_element.mp3';
        aud.play();
        $(this).css({zIndex: 9999});
        $(this).animate({
            top: "0",
            left: "1000"

        }, 1500, function () {
            console.log('test');
            $(this).css({display: "none"});


            $(".find_element_lvl" + lvl + "_" + $(this).attr('name')).css({
                "background-image": 'url("./img/cargo' + lvl + '/menu_images/level' + lvl + '-item' + $(this).attr('name') + '-show.png")',
                "background-repeat": "no-repeat"
            });


            addSilverCoins(findItemPrize);
            countElements++;

            if (countElements == 5) {
                $('#element').pietimer('pause');
                var modal = $('#searchOverModalBox');
                var backToAdvantureBtn = $('#backToAdvanture');
                var buy10secBtn = $('#buy10seconds');

                setTimeout(showWinElement, 2000);

                function showSwarchOverMenu() {
                    modal.css({display: "block"});
                    buy10secBtn.css({display: "none"});
                    $('.congrat').css({display: "block"});
                    $('.fail').css({display: "none"});
                    $(".panel_lvl" + lvl).remove();

                }

                function hideSwarchOverMenu() {
                    modal.css({display: "none"});
                }

                function showWinElement() {
                    $('.test').css({
                        "background-image": 'url("./img/shipControlPanel/controlPanel.png")'
                    });
                    $('img').css({display: 'none'});
                    $('.panel_lvl1').css({visibility: 'visible'});
                    $('.panel_lvl2').css({visibility: 'visible'});
                    $('.panel_lvl3').css({visibility: 'visible'});
                    $('.panel_lvl4').css({visibility: 'visible'});
                    $('.panel_lvl5').css({visibility: 'visible'});
                    setTimeout(function () {
                        if(completeLvl == 5){
                        $('.test').css({
                            "background-image": 'none'
                        });
                        $('#gamearea').html('<video id="endarea" autoplay src="./video/end.mp4"> </video>')
                        $('#endarea').fadeIn()
                        $('#menu').fadeOut()
                        setTimeout(function () {
                            $('#endarea').fadeOut(function () {
                                $('#gamearea').html('<div class="results"><div class="pull_right"><div class="title">Your results</div> <div class="gold"><div class="coin_gold"></div>Gold coins ' + gamer_gold_coins + '/91</div><br><div class="silver"><div class="coin_silver"></div>Silver coins ' + gamer_silver_coins + '/135</div><br><div class="res">' + getResultText() + '</div> <br><div class="repost"> <div class="share42init" data-image="https://pp.vk.me/c637330/v637330918/2b3d1/Lg_Ahv_oqcM.jpg" data-title="Cargo Waves: The results" data-description="I have collected ' + gamer_gold_coins + '/90 gold coins and ' + gamer_silver_coins + '/125 silver coins in #CargoWaves game! Try to beat my record!" ></div> </div></div>')
                            })
                            setTimeout(function () {
                                showShare();
                                console.log("showShare activated")
                            }, 1000)
                        }, 20000)
                        } else {
                            $('.panel_lvl' + lvl).fadeOut();
                            setTimeout(showSwarchOverMenu, 2000)
                        }
                    }, 1000)

                }

                backToAdvantureBtn.click(function () {
                    console.log("backToAdvanture");
                    hideSwarchOverMenu();
                    $("#sashaMenu").css({display: "none"});
                    $('.menu_' + lvl).remove();
                    $('.field' + lvl).remove();
                    if (completeLvl == 5) {
                        $('#gamearea').css({
                            "background-image": 'none'
                        });
                        $('#gamearea').html('<video id="endarea" autoplay src="./video/end.mp4"> </video>')
                        $('#endarea').fadeIn()
                        $('#menu').fadeOut()
                        setTimeout(function () {
                            $('#endarea').fadeOut(function () {
                                $('#gamearea').html('<div class="results"><div class="pull_right"><div class="title">Your results</div> <div class="gold"><div class="coin_gold"></div>Gold coins ' + gamer_gold_coins + '/91</div><br><div class="silver"><div class="coin_silver"></div>Silver coins ' + gamer_silver_coins + '/135</div><br><div class="res">' + getResultText() + '</div> <br><div class="repost"> <div class="share42init" data-image="https://pp.vk.me/c637330/v637330918/2b3d1/Lg_Ahv_oqcM.jpg" data-title="Cargo Waves: The results" data-description="I have collected ' + gamer_gold_coins + '/90 gold coins and ' + gamer_silver_coins + '/125 silver coins in #CargoWaves game! Try to beat my record!" ></div> </div></div>')
                            })
                        }, 20000)

                    } else {
                        $(".loader").fadeIn(function () {
                            stopAndHideGeraLevel1();
                        })

                    }


                });
            }

        });
    });

    function getGoldCoins() {
        return $('#coin_gold_count').html()
    }

    function getSilverCoins() {
        return $('#coin_silver_count').html()
    }

    function getResultText() {
        if (gamer_gold_coins + gamer_gold_coins < 50) {
            return 'You result is not so good...'
        } else if (gamer_gold_coins + gamer_gold_coins < 150) {
            return 'You result is good!'
        } else {
            return 'You are the perfect one!!!'
        }
    }

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
                // src: './img/search/level' + lvl + '-full-150.png', // The URI of the large image that will be shown in the magnifying lens.
                src: './img/cargo' + lvl + '/cargo' + lvl + '_150.png',
                onload: function () {
                } // callback
            });

        }
    });


    var items = [".img_lvl_" + lvl + "_1", ".img_lvl_" + lvl + "_2", ".img_lvl_" + lvl + "_3", ".img_lvl_" + lvl + "_4",
        ".img_lvl_" + lvl + "_5", ".img_lvl_" + lvl + "_6", ".img_lvl_" + lvl + "_7", ".img_lvl_" + lvl + "_8", ".img_lvl_" + lvl + "_9",
        ".img_lvl_" + lvl + "_10"];
    var fantoms = [".find_element_lvl" + lvl + "_1",
        ".find_element_lvl" + lvl + "_2",
        ".find_element_lvl" + lvl + "_3",
        ".find_element_lvl" + lvl + "_4",
        ".find_element_lvl" + lvl + "_5",
        ".find_element_lvl" + lvl + "_6",
        ".find_element_lvl" + lvl + "_7",
        ".find_element_lvl" + lvl + "_8",
        ".find_element_lvl" + lvl + "_9",
        ".find_element_lvl" + lvl + "_10"];

    var randNumbers = [];

    for (var i = 0; i < 5; i++) {
        var currentRandNumber = getRandomInt(0, 10);

        while ($.inArray(currentRandNumber, randNumbers) !== -1) {
            currentRandNumber = getRandomInt(0, 10);
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
            $(".searchField").fadeOut('slow');
            showSwarchOverMenu();
        });
    $('#element').pietimer('start');


    var modal = $('#searchOverModalBox');
    var backToAdvantureBtn = $('#backToAdvanture');
    var buy10secBtn = $('#buy10seconds');

    function showSwarchOverMenu(buy) {

        if (buy || checkMoney() < 5) {
            buy10secBtn.css({'display': 'none'})
        } else {
            buy10secBtn.css({'display': 'block'})
        }
        modal.css({display: "block"});
    }

    function hideSwarchOverMenu() {
        modal.css({display: "none"});
    }

    backToAdvantureBtn.click(function () {
        console.log("backToAdvanture");
        hideSwarchOverMenu();
        $("#sashaMenu").css({display: "none"});
        $('.menu_' + lvl).remove();
        $('.field' + lvl).remove();
        $(".loader").fadeIn(function () {
            stopAndHideGeraLevel1();
        })
    });
    var buy = false;
    buy10secBtn.click(function () {
        buy = true;

        addSilverCoins(-5);
        hideSwarchOverMenu();

        $(".searchField").fadeIn("slow", function () {

        });
        $('#element').pietimer();
        $('#element').pietimer({
                seconds: extraseconds,
                color: 'rgba(0, 0, 0, 0.8)',
                height: 96,
                width: 96
            },
            function () {
                showSwarchOverMenu(buy);
                $(".searchField").fadeOut('slow');

            });
        $('#element').pietimer('start');
    });


    function stopAndHideGeraLevel1() {

        searchAud.pause();
        searchAud.currentTime = 0;

        $('#element').pietimer('pause');
        $("#gameScene").fadeIn("slow", function () {
            console.log("gamearea show");
            $('.searchField').css({display: "none"});

            $('.test').css({
                'background-image': 'url("./img/ship_bg/ship_' + ship + '.png"), url("./img/ship_bg/water.gif")'
            });
            $('img').css({display: 'block'});
            $('.panel_lvl1').css({visibility: 'hidden'});
            $('.panel_lvl2').css({visibility: 'hidden'});
            $('.panel_lvl3').css({visibility: 'hidden'});
            $('.panel_lvl4').css({visibility: 'hidden'});
            $('.panel_lvl5').css({visibility: 'hidden'});

            setTimeout(function () {
                $(".loader").fadeOut();
            }, 1500);

            return 0;
        });
    }

    $('.searchField').dblclick(function () {
        $('body').css({pointerEvents: 'none'});
        $('html,body').css('cursor', 'no-drop ');
        setTimeout(function () {
            $('body').css({pointerEvents: 'auto', cursor: 'default'});
        }, 2500)
    })

}

