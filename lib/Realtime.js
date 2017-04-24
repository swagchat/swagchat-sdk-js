"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./const");
var Realtime = (function () {
    function Realtime(endpoint) {
        var _this = this;
        console.info("Connection Swagchat Realtime Server...");
        var websocket = const_1.isBrowser ? WebSocket : require("ws");
        this.conn = new websocket(endpoint);
        this.conn.addEventListener("open", function (e) {
            _this.onConnected(e.target);
        });
        this.conn.addEventListener("error", function (e) {
            _this.onError(e.target);
        });
        this.conn.addEventListener("close", function (e) {
            _this.onClosed(e.code, e.reason);
        });
        this.conn.addEventListener("message", function (e) {
            var message = JSON.parse(e.data);
            switch (message.eventName) {
                case "message":
                    _this.onMessageReceived(message);
                    break;
                case "userJoin":
                    _this.onUserJoined(message);
                    break;
                case "userLeft":
                    _this.onUserLeft(message);
                    break;
            }
        });
    }
    Realtime.prototype.close = function () {
        this.conn.close();
    };
    Realtime.prototype.sendEvent = function (roomId, eventName, action) {
        if (this.conn.readyState !== this.conn.OPEN) {
            return false;
        }
        try {
            this.conn.send(JSON.stringify({
                roomId: roomId,
                eventName: eventName,
                action: action
            }));
        }
        catch (ex) {
            return false;
        }
        return true;
    };
    return Realtime;
}());
exports.default = Realtime;
