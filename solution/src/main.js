"use strict";
var peerflix_manager_1 = require("./peerflix-manager");
var peerflix = new peerflix_manager_1.PeerflixManager();
var runElem = document.querySelector("#run-peerflix");
runElem.addEventListener('click', function (e) {
    var form = new FormData(document.querySelector('form'));
    peerflix.setLink(form.get('magnet-link').toString());
    peerflix.setPlayer(form.get('player').toString());
    peerflix.run();
});
module.exports = 0;
