$(function () {
    var usernameElem = $("#username");
    var scoresTable = $("#scores-table");
    var songsTable = $("#songs-table");
    var socket = io();

    var beatsButton = $("#beats-button");
    var beatsButtonToggled = false;

    var toggleBeatsButton = function () {
        if (beatsButtonToggled) {
            beatsButton.removeClass("btn-primary");
            beatsButton.addClass("btn-danger");
            beatsButtonToggled = false;
        } else {
            beatsButton.addClass("btn-primary");
            beatsButton.removeClass("btn-danger");
            beatsButtonToggled = true;
        }
    }

    beatsButton.click(toggleBeatsButton);

    socket.on('action signal', function (data) {
        toggleBeatsButton();
    });

});