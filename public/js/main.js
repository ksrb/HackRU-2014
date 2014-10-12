$(function () {
    var usernameElem = $("#username");
    var usernameSubmit = $("#username-submit");
    var scoresTable = $("#scores-table");
    var songsTable = $("#songs-table");
    var socket = io();

    var beatsButton = $("#beats-button");
    beatsButton.css("display", "none");
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
    };

    var beatsButtonClickHandler = function () {
        if (beatsButtonClickable == true) {
            beatsButton.unbind('click', beatsButtonClickHandler);
            socket.emit("send score", {success: true});
            console.log("Beat hit");
        }
    };

    beatsButton.click(beatsButtonClickHandler);

    socket.on('action signal', function (data) {
        toggleBeatsButton();
        setTimeout(function () {
            toggleBeatsButton();
            beatsButton.unbind('click', beatsButtonClickHandler);
            beatsButton.click(beatsButtonClickHandler);
        }, data.interval);
    });

    var usernameSubmitHandler = function () {
        var username = usernameElem.val();
        if (username) {
            socket.emit("user login", {username: usernameElem.val()});
            beatsButton.css("display", "block");
        } else {
            beatsButton.unbind('click', beatsButtonClickHandler);
        }
        console.log(usernameElem.val());
    };

    usernameSubmit.click(usernameSubmitHandler);


    var renderTableContents = function (table, data) {
        var tbody = table.find("tbody");
        tbody.html('');
        for (var i = 0; i < data.length; i++) {
            var row = $(document.createElement('tr'));
            for (var key in data[i]) {
                if(data[i].hasOwnProperty(key)){
                    var column = document.createElement('td');
                    $(column).html(data[i][key])
                    row.append(column);
                }
            }
            tbody.append(row);
        }
    };

    socket.on('score update', function (data) {
        renderTableContents(scoresTable, data);
    });

});