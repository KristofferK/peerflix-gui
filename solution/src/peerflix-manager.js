"use strict";
exports.__esModule = true;
var child = require("child_process");
var PeerflixManager = /** @class */ (function () {
    function PeerflixManager() {
        this.player = "vlc";
        this.link = "";
    }
    PeerflixManager.prototype.setPlayer = function (player) {
        this.player = player;
    };
    PeerflixManager.prototype.setLink = function (link) {
        this.link = link;
    };
    PeerflixManager.prototype.run = function () {
        child.exec("start cmd.exe /K peerflix " + this.link + " --" + this.player);
    };
    return PeerflixManager;
}());
exports.PeerflixManager = PeerflixManager;
