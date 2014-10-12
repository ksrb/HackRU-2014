$(function () {
    var usernameElem = $("#username");
    var scoresTable = $("#scores-table");
    var songsTable = $("#songs-table");
    var socket = io();

    var beatsButton = $("#beats-button");
    var beatsButtonClickable = false;

    var toggleBeatsButton = function () {
        if (beatsButtonClickable) {
            beatsButtonClickable = false;
            beatsButton.addClass("btn-primary");
            beatsButton.removeClass("btn-danger");
        } else {
            beatsButtonClickable = true;
            beatsButton.removeClass("btn-primary");
            beatsButton.addClass("btn-danger");
        }
    }

    var beatsButtonClickHandler = function () {
        if (beatsButtonClickable == true) {
            beatsButton.unbind('click', beatsButtonClickHandler);
            socket.emit("send score", {success: true});
            console.log("Beat hit");
        }
    }

    beatsButton.click(beatsButtonClickHandler);

    socket.on('action signal', function (data) {
        toggleBeatsButton();

        setTimeout(function () {
            toggleBeatsButton();
            beatsButton.unbind('click', beatsButtonClickHandler);
            beatsButton.click(beatsButtonClickHandler);
        }, data.interval);
    });

    var showTime = function () {
        var date = new Date();
        console.log(date.getSeconds());
    }

});