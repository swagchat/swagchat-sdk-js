"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
var Realtime = (function () {
    function Realtime(endpoint, userId) {
        this.websocket = _1.isBrowser ? WebSocket : require('ws');
        _1.logger('realtime', 'info', 'Connecting Realtime Server...');
        this.endpoint = endpoint;
        this.userId = userId;
        this.connect();
    }
    Realtime.prototype.connect = function () {
        var _this = this;
        this.conn = new this.websocket(this.endpoint + '?userId=' + this.userId);
        this.conn.addEventListener('open', function (e) {
            _1.logger('realtime', 'info', 'Connecting Realtime Server OK');
            if (_this.onConnected) {
                _this.onConnected(e.target);
            }
            if (_this.subMsgRoomIds) {
                var subMsgRoomIds = Object.keys(_this.subMsgRoomIds);
                for (var i = 0; i < subMsgRoomIds.length; i++) {
                    var subMsgRoomId = subMsgRoomIds[i];
                    if (_this.onMessageReceived && _this.subMsgRoomIds && !_this.subMsgRoomIds[subMsgRoomId]) {
                        if (_this.sendEvent(subMsgRoomId, 'message', 'bind')) {
                            _this.subMsgRoomIds[subMsgRoomId] = true;
                        }
                    }
                }
            }
        });
        this.conn.addEventListener('error', function (e) {
            _1.logger('realtime', 'error', 'Connecting Realtime Server ERROR');
            if (_this.onError) {
                _this.onError(e.target);
            }
        });
        this.conn.addEventListener('close', function (e) {
            _1.logger('realtime', 'error', 'Connecting Realtime Server CLOSE');
            if (_this.onClosed) {
                _this.onClosed(e.code, e.reason);
            }
            if (_this.subMsgRoomIds) {
                var subMsgRoomIds = Object.keys(_this.subMsgRoomIds);
                for (var i = 0; i < subMsgRoomIds.length; i++) {
                    var subMsgRoomId = subMsgRoomIds[i];
                    _this.subMsgRoomIds[subMsgRoomId] = false;
                }
            }
            setTimeout(function () {
                _1.logger('realtime', 'error', 'Connecting Realtime Server after 3 seconds...');
                _this.connect();
            }, 3000);
        });
        this.conn.addEventListener('message', function (e) {
            var message = JSON.parse(e.data);
            switch (message.eventName) {
                case 'message':
                    if (_this.onMessageReceived) {
                        _this.onMessageReceived(message);
                    }
                    break;
                case 'userJoin':
                    if (_this.onUserJoined) {
                        _this.onUserJoined(message);
                    }
                    break;
                case 'userLeft':
                    if (_this.onUserLeft) {
                        _this.onUserLeft(message);
                    }
                    break;
            }
        });
        if (window) {
            window.addEventListener('beforeunload', function () {
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
                _1.logger('realtime', 'error', 'Failure send event.');
                console.log(ex);
                return false;
            }
        }
        return true;
    };
    Realtime.prototype.subscribeMessage = function (onMessageReceived, roomId) {
        if (!roomId || typeof (roomId) !== 'string') {
            _1.logger('realtime', 'error', 'Subscribe message failure. roomId is not setting.');
            return;
        }
        if (onMessageReceived === undefined) {
            _1.logger('realtime', 'error', 'Subscribe message failure. onMessageReceived is undefined.');
            return;
        }
        if (!this.subMsgRoomIds) {
            this.subMsgRoomIds = (_a = {}, _a[roomId] = false, _a);
        }
        else {
            this.subMsgRoomIds = Object.assign(this.subMsgRoomIds, (_b = {}, _b[roomId] = false, _b));
        }
        if (this.conn.readyState === this.conn.OPEN) {
            if (this.sendEvent(roomId, 'message', 'bind')) {
                this.onMessageReceived = onMessageReceived;
                _1.logger('realtime', 'info', 'Subscribe message success roomId[' + roomId + ']');
                this.subMsgRoomIds[roomId] = true;
            }
            else {
                _1.logger('realtime', 'error', 'Subscribe message failure roomId[' + roomId + ']');
            }
        }
        var _a, _b;
    };
    Realtime.prototype.unsubscribeMessage = function (roomId) {
        if (this.conn.readyState === this.conn.OPEN) {
            if (this.sendEvent(roomId, 'message', 'unbind')) {
                this.onMessageReceived = null;
                _1.logger('realtime', 'info', 'Unsubscribe message success roomId[' + roomId + ']');
                this.subMsgRoomIds[roomId] = false;
            }
            else {
                _1.logger('realtime', 'error', 'Unsubscribe message failure roomId[' + roomId + ']');
            }
        }
    };
    Realtime.prototype.subscribeUserJoin = function (onUserJoined, roomId) {
        if (!roomId || typeof (roomId) !== 'string') {
            _1.logger('realtime', 'error', 'Subscribe userJoin failure. roomId is not setting.');
            return;
        }
        if (onUserJoined === undefined) {
            _1.logger('realtime', 'error', 'Subscribe userJoin failure. onUserJoined is undefined.');
            return;
        }
        if (!this.subUserJoinedRoomIds) {
            this.subUserJoinedRoomIds = (_a = {}, _a[roomId] = false, _a);
        }
        else {
            this.subUserJoinedRoomIds = Object.assign(this.subUserJoinedRoomIds, (_b = {}, _b[roomId] = false, _b));
        }
        if (this.conn.readyState === this.conn.OPEN) {
            if (this.sendEvent(roomId, 'userJoin', 'bind')) {
                this.onUserJoined = onUserJoined;
                _1.logger('realtime', 'info', 'Subscribe userJoin success roomId[' + roomId + ']');
                this.subUserJoinedRoomIds[roomId] = true;
            }
            else {
                _1.logger('realtime', 'error', 'Subscribe userJoin failure roomId[' + roomId + ']');
            }
        }
        var _a, _b;
    };
    Realtime.prototype.unsubscribeUserJoin = function (roomId) {
        if (this.conn.readyState === this.conn.OPEN) {
            if (this.sendEvent(roomId, 'userJoin', 'unbind')) {
                this.onUserJoined = null;
                _1.logger('realtime', 'info', 'Unsubscribe userJoin success roomId[' + roomId + ']');
                this.subUserJoinedRoomIds[roomId] = false;
            }
            else {
                _1.logger('realtime', 'error', 'Unsubscribe userJoin failure roomId[' + roomId + ']');
            }
        }
    };
    Realtime.prototype.subscribeUserLeft = function (onUserLeft, roomId) {
        if (!roomId || typeof (roomId) !== 'string') {
            _1.logger('realtime', 'error', 'Subscribe userLeft failure. roomId is not setting.');
            return;
        }
        if (onUserLeft === undefined) {
            _1.logger('realtime', 'error', 'Subscribe userLeft failure. Parameter invalid.');
            return;
        }
        if (!this.subUserLeftRoomIds) {
            this.subUserLeftRoomIds = (_a = {}, _a[roomId] = false, _a);
        }
        else {
            this.subUserLeftRoomIds = Object.assign(this.subUserLeftRoomIds, (_b = {}, _b[roomId] = false, _b));
        }
        if (this.conn.readyState === this.conn.OPEN) {
            if (this.sendEvent(roomId, 'userLeft', 'bind')) {
                this.onUserLeft = onUserLeft;
                _1.logger('realtime', 'info', 'Subscribe userLeft success roomId[' + roomId + ']');
                this.subUserLeftRoomIds[roomId] = true;
            }
            else {
                _1.logger('realtime', 'error', 'Subscribe userLeft failure roomId[' + roomId + ']');
            }
        }
        var _a, _b;
    };
    Realtime.prototype.unsubscribeUserLeft = function (roomId) {
        if (this.conn.readyState === this.conn.OPEN) {
            if (this.sendEvent(roomId, 'userLeft', 'unbind')) {
                this.onUserLeft = null;
                _1.logger('realtime', 'info', 'Unsubscribe userLeft success roomId[' + roomId + ']');
                this.subUserLeftRoomIds[roomId] = false;
            }
            else {
                _1.logger('realtime', 'error', 'Unsubscribe userLeft failure roomId[' + roomId + ']');
            }
        }
    };
    return Realtime;
}());
exports.Realtime = Realtime;
//# sourceMappingURL=Realtime.js.map