"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var Realtime = (function () {
    function Realtime(endpoint) {
        var _this = this;
        _1.logger("realtime", "info", "Connecting Realtime Server...");
        var websocket = _1.isBrowser ? WebSocket : require("ws");
        this.conn = new websocket(endpoint);
        this.conn.addEventListener("open", function (e) {
            _1.logger("realtime", "info", "Connecting Realtime Server OK");
            if (_this.onConnected) {
                _this.onConnected(e.target);
            }
        });
        this.conn.addEventListener("error", function (e) {
            if (_this.onError) {
                _this.onError(e.target);
            }
        });
        this.conn.addEventListener("close", function (e) {
            if (_this.onClosed) {
                _this.onClosed(e.code, e.reason);
            }
        });
        this.conn.addEventListener("message", function (e) {
            var message = JSON.parse(e.data);
            switch (message.eventName) {
                case "message":
                    if (_this.onMessageReceived) {
                        _this.onMessageReceived(message);
                    }
                    break;
                case "userJoin":
                    if (_this.onUserJoined) {
                        _this.onUserJoined(message);
                    }
                    break;
                case "userLeft":
                    if (_this.onUserLeft) {
                        _this.onUserLeft(message);
                    }
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
exports.Realtime = Realtime;
//# sourceMappingURL=Realtime.js.map