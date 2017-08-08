"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var Realtime = (function () {
    function Realtime(endpoint, userId) {
        this.websocket = _1.isBrowser ? WebSocket : require("ws");
        _1.logger("realtime", "info", "Connecting Realtime Server...");
        this.endpoint = endpoint;
        this.userId = userId;
        this.connect();
    }
    Realtime.prototype.connect = function () {
        var _this = this;
        this.conn = new this.websocket(this.endpoint + "?userId=" + this.userId);
        this.conn.addEventListener("open", function (e) {
            _1.logger("realtime", "info", "Connecting Realtime Server OK");
            console.log(e);
            if (_this.onConnected) {
                _this.onConnected(e.target);
            }
        });
        this.conn.addEventListener("error", function (e) {
            _1.logger("realtime", "error", "Connecting Realtime Server ERROR");
            console.log(e);
            if (_this.onError) {
                _this.onError(e.target);
            }
        });
        this.conn.addEventListener("close", function (e) {
            _1.logger("realtime", "info", "Connecting Realtime Server CLOSE");
            console.log(e);
            if (_this.onClosed) {
                _this.onClosed(e.code, e.reason);
            }
            var self = _this;
            setTimeout(function () {
                self.connect();
            }, 3000);
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
        if (window) {
            window.addEventListener("beforeunload", function () {
                _this.close();
            }, false);
        }
    };
    Realtime.prototype.close = function () {
        this.conn.close();
    };
    Realtime.prototype.sendEvent = function (roomId, eventName, action) {
        if (this.conn.readyState === this.conn.OPEN) {
            try {
                this.conn.send(JSON.stringify({
                    roomId: roomId,
                    eventName: eventName,
                    action: action
                }));
            }
            catch (ex) {
                _1.logger("realtime", "error", "Failure send event.");
                console.log(ex);
                return false;
            }
            return true;
        }
        else {
            _1.logger("realtime", "error", "ReadyState is not open. Retry after 3 seconds.");
            var self_1 = this;
            setTimeout(function () {
                self_1.sendEvent(roomId, eventName, action);
            }, 3000);
            return false;
        }
    };
    return Realtime;
}());
exports.Realtime = Realtime;
//# sourceMappingURL=Realtime.js.map