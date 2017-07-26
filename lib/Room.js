"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
var _1 = require("./");
/**
 * Room class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * room.name = "John's Room";<br />
 * console.log(room.name);</code>
 */
var Room = (function () {
    function Room(params) {
        this._client = params.client;
        this._data = params.data;
    }
    Object.defineProperty(Room.prototype, "roomId", {
        get: function () {
            return this._data.roomId ? this._data.roomId : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "userId", {
        get: function () {
            return this._data.userId ? this._data.userId : "";
        },
        set: function (userId) {
            this._data.roomId = userId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "name", {
        get: function () {
            return this._data.name ? this._data.name : "";
        },
        set: function (name) {
            this._data.name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "pictureUrl", {
        get: function () {
            return this._data.pictureUrl ? this._data.pictureUrl : "";
        },
        set: function (pictureUrl) {
            this._data.pictureUrl = pictureUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "informationUrl", {
        get: function () {
            return this._data.informationUrl ? this._data.informationUrl : "";
        },
        set: function (informationUrl) {
            this._data.informationUrl = informationUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "metaData", {
        get: function () {
            return this._data.metaData ? this._data.metaData : {};
        },
        set: function (metaData) {
            if (!metaData || typeof (metaData) !== "object") {
                _1.logger("api", "error", "Set metaData failure. metaData is not setting.");
            }
            else {
                this._data.metaData = metaData;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "availableMessageTypes", {
        get: function () {
            return this._data.availableMessageTypes ? this._data.availableMessageTypes : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "type", {
        get: function () {
            return this._data.type ? this._data.type : 0;
        },
        set: function (type) {
            this._data.type = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "lastMessage", {
        get: function () {
            return this._data.lastMessage ? this._data.lastMessage : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "lastMessageUpdated", {
        get: function () {
            return this._data.lastMessageUpdated ? this._data.lastMessageUpdated : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "messageCount", {
        get: function () {
            return this._data.messageCount ? this._data.messageCount : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "isCanLeft", {
        get: function () {
            return this._data.isCanLeft ? this._data.isCanLeft : true;
        },
        set: function (isCanLeft) {
            this._data.isCanLeft = isCanLeft;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "isShowUsers", {
        get: function () {
            return this._data.isShowUsers ? this._data.isShowUsers : true;
        },
        set: function (isShowUsers) {
            this._data.isShowUsers = isShowUsers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "created", {
        get: function () {
            return this._data.created ? this._data.created : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "modified", {
        get: function () {
            return this._data.modified ? this._data.modified : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "users", {
        get: function () {
            return this._data.users || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "userIds", {
        get: function () {
            return this._data.userIds ? this._data.userIds : [];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Register metadata in separate.
     * An applied key will be added if metadata already exists. A value will be overwritten if an equivalent key exists.
     * Please use accessor if you will register by multiple keys in a lump. In this case, existing metadata will be overwritten.
     *
     * ex)<br />
     * <code>room.metaData = {"key1": "value1", "key2": 2, "key3": true, "key4": {"key5": "value5"}};</code>
     * @param key Key for register.
     * @param value A value for key.
     */
    Room.prototype.setMetaData = function (key, value) {
        if (!key || typeof (key) !== "string") {
            _1.logger("api", "error", "set metaData failure. Parameter invalid.");
        }
        else {
            if (this._data.metaData === undefined) {
                var metaData = { key: value };
                this._data.metaData = metaData;
            }
            else {
                this._data.metaData[key] = value;
            }
        }
    };
    /**
     * Update room information.
     * Please set the data of this object beforehand.
     */
    Room.prototype.update = function (putRoom) {
        var self = this;
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._client.userAccessToken,
            },
            body: JSON.stringify(putRoom)
        }).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (room) {
                    return {
                        room: new Room({
                            client: self._client,
                            data: room,
                        }),
                        error: null,
                    };
                });
            }
            else {
                return response.json().then(function (json) {
                    return {
                        room: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                room: null,
                error: {
                    title: error.message,
                },
            };
        });
    };
    Room.prototype.addUsers = function (userIds) {
        var fetchParam = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userIds: userIds
            })
        };
        if (!(userIds instanceof Array) || userIds.length === 0) {
            fetchParam.body = JSON.stringify({});
        }
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId + "/users", fetchParam).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (addUsersRes) {
                    return {
                        roomUsers: addUsersRes.roomUsers,
                        error: null,
                    };
                });
            }
            else if (response.status === 404) {
                return {
                    roomUsers: null,
                    error: {
                        title: response.statusText,
                    },
                };
            }
            else {
                return response.json().then(function (json) {
                    return {
                        roomUsers: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                roomUsers: null,
                error: {
                    title: error.message,
                },
            };
        });
    };
    Room.prototype.removeUsers = function (userIds) {
        var fetchParam = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userIds: userIds
            })
        };
        if (!(userIds instanceof Array) || userIds.length === 0) {
            fetchParam.body = JSON.stringify({});
        }
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId + "/users", fetchParam).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (removeUsersRes) {
                    return {
                        roomUsers: removeUsersRes.roomUsers,
                        error: null,
                    };
                });
            }
            else if (response.status === 404) {
                return {
                    roomUsers: null,
                    error: {
                        title: response.statusText,
                    },
                };
            }
            else {
                return response.json().then(function (json) {
                    return {
                        roomUsers: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                roomUsers: null,
                error: {
                    title: error.message,
                },
            };
        });
    };
    Room.prototype.reflesh = function () {
        var self = this;
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._client.userAccessToken,
            },
        }).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (room) {
                    self._data = room;
                    return {
                        room: self,
                        error: null,
                    };
                });
            }
            else if (response.status === 404) {
                return {
                    room: null,
                    error: {
                        title: response.statusText,
                    },
                };
            }
            else {
                return response.json().then(function (json) {
                    return {
                        room: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                room: null,
                error: {
                    title: error.message,
                },
            };
        });
    };
    Room.prototype.getMessages = function (queryParams) {
        var queryParamsString = "";
        if (queryParams !== undefined) {
            queryParamsString = _1.createQueryParams(queryParams);
        }
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId + "/messages?" + queryParamsString, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._client.userAccessToken,
            },
        }).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (messages) {
                    return {
                        messages: messages,
                        error: null,
                    };
                });
            }
            else {
                return response.json().then(function (json) {
                    return {
                        messages: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                messages: null,
                error: {
                    title: error.message,
                },
            };
        });
    };
    Room.prototype.subscribeMessage = function (onMessageReceived) {
        var _this = this;
        if (!this._data.roomId || typeof (this._data.roomId) !== "string") {
            _1.logger("realtime", "error", "Subscribe message failure. roomId is not setting.");
            return;
        }
        if (onMessageReceived === undefined) {
            _1.logger("realtime", "error", "Subscribe message failure. onMessageReceived is undefined.");
            return;
        }
        if (!this._client.connection) {
            _1.logger("realtime", "error", "Subscribe userLeft failure. Realtime connection is not setting.");
            return;
        }
        this._onMessageReceived = onMessageReceived;
        if (this._client.connection.sendEvent(this._data.roomId, "message", "bind")) {
            this._client.connection.onMessageReceived = function (data) {
                _this._onMessageReceived(data);
            };
            _1.logger("realtime", "info", "Subscribe message success roomId[" + this._data.roomId + "]");
        }
        else {
            _1.logger("realtime", "error", "Subscribe message failure roomId[" + this._data.roomId + "]");
        }
    };
    Room.prototype.unsubscribeMessage = function () {
        if (!this._data.roomId || typeof (this._data.roomId) !== "string") {
            _1.logger("realtime", "error", "Unsubscribe message failure. roomId is not setting.");
            return;
        }
        if (!this._client.connection) {
            _1.logger("realtime", "error", "Subscribe userLeft failure. Realtime connection is not setting.");
            return;
        }
        this._onMessageReceived = Function;
        if (this._client.connection.sendEvent(this._data.roomId, "message", "unbind")) {
            _1.logger("realtime", "info", "Unsubscribe message success roomId[" + this._data.roomId + "]");
        }
        else {
            _1.logger("realtime", "error", "Unsubscribe message failure roomId[" + this._data.roomId + "]");
        }
    };
    Room.prototype.subscribeUserJoin = function (onUserJoined) {
        var _this = this;
        if (!this._data.roomId || typeof (this._data.roomId) !== "string") {
            _1.logger("realtime", "error", "Subscribe userJoin failure. roomId is not setting.");
            return;
        }
        if (onUserJoined === undefined) {
            _1.logger("realtime", "error", "Subscribe userJoin failure. onUserJoined is undefined.");
            return;
        }
        if (!this._client.connection) {
            _1.logger("realtime", "error", "Subscribe userLeft failure. Realtime connection is not setting.");
            return;
        }
        this._onUserJoined = onUserJoined;
        if (this._client.connection.sendEvent(this._data.roomId, "userJoin", "bind")) {
            this._client.connection.onUserJoined = function (data) {
                var users = data.payload;
                _this._data.users = users;
                _this._onUserJoined(users);
            };
            _1.logger("realtime", "info", "Subscribe userJoin success roomId[" + this._data.roomId + "]");
        }
        else {
            _1.logger("realtime", "error", "Subscribe userJoin failure roomId[" + this._data.roomId + "]");
        }
    };
    Room.prototype.unsubscribeUserJoin = function () {
        if (!this._data.roomId || typeof (this._data.roomId) !== "string") {
            _1.logger("realtime", "error", "Unsubscribe userJoin failure. roomId is not setting.");
            return;
        }
        if (!this._client.connection) {
            _1.logger("realtime", "error", "Subscribe userLeft failure. Realtime connection is not setting.");
            return;
        }
        this._onUserJoined = Function;
        if (this._client.connection.sendEvent(this._data.roomId, "userJoin", "unbind")) {
            _1.logger("realtime", "info", "Unsubscribe userJoin success roomId[" + this._data.roomId + "]");
        }
        else {
            _1.logger("realtime", "error", "Unsubscribe userJoin failure roomId[" + this._data.roomId + "]");
        }
    };
    Room.prototype.subscribeUserLeft = function (onUserLeft) {
        var _this = this;
        if (!this._data.roomId || typeof (this._data.roomId) !== "string") {
            _1.logger("realtime", "error", "Subscribe userLeft failure. roomId is not setting.");
            return;
        }
        if (onUserLeft === undefined) {
            _1.logger("realtime", "error", "Subscribe userLeft failure. Parameter invalid.");
            return;
        }
        if (!this._client.connection) {
            _1.logger("realtime", "error", "Subscribe userLeft failure. Realtime connection is not setting.");
            return;
        }
        this._onUserLeft = onUserLeft;
        if (this._client.connection.sendEvent(this._data.roomId, "userLeft", "bind")) {
            this._client.connection.onUserLeft = function (data) {
                var users = data.payload;
                _this._data.users = users;
                _this._onUserLeft(users);
            };
            _1.logger("realtime", "info", "Subscribe userLeft success roomId[" + this._data.roomId + "]");
        }
        else {
            _1.logger("realtime", "error", "Subscribe userLeft failure roomId[" + this._data.roomId + "]");
        }
    };
    Room.prototype.unsubscribeUserLeft = function () {
        if (!this._data.roomId || typeof (this._data.roomId) !== "string") {
            _1.logger("realtime", "error", "Unsubscribe userLeft failure. roomId is not setting.");
            return;
        }
        if (this._onUserLeft === undefined) {
            _1.logger("realtime", "error", "Unsubscribe userLeft failure. onUserLeft is undefined.");
            return;
        }
        if (!this._client.connection) {
            _1.logger("realtime", "error", "Subscribe userLeft failure. Realtime connection is not setting.");
            return;
        }
        this._onUserLeft = Function;
        if (this._client.connection.sendEvent(this._data.roomId, "userLeft", "unbind")) {
            _1.logger("realtime", "info", "Unsubscribe userLeft success roomId[" + this._data.roomId + "]");
        }
        else {
            _1.logger("realtime", "error", "Unsubscribe userLeft failure roomId[" + this._data.roomId + "]");
        }
    };
    return Room;
}());
exports.Room = Room;
//# sourceMappingURL=Room.js.map