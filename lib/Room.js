"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
require("isomorphic-fetch");
var Room = (function () {
    function Room(option) {
        this._client = option.client;
        this._data = option.roomObj;
    }
    Object.defineProperty(Room.prototype, "roomId", {
        get: function () {
            return this._data.roomId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "userId", {
        get: function () {
            return this._data.userId;
        },
        set: function (userId) {
            this._data.roomId = userId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "name", {
        get: function () {
            return this._data.name;
        },
        set: function (name) {
            this._data.name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "pictureUrl", {
        get: function () {
            return this._data.pictureUrl;
        },
        set: function (pictureUrl) {
            this._data.pictureUrl = pictureUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "informationUrl", {
        get: function () {
            return this._data.informationUrl;
        },
        set: function (informationUrl) {
            this._data.informationUrl = informationUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "metaData", {
        get: function () {
            return this._data.metaData;
        },
        set: function (metaData) {
            if (!metaData || typeof (metaData) !== "object") {
                throw Error("Set metaData failure. metaData is not setting.");
            }
            this._data.metaData = metaData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "isPublic", {
        get: function () {
            return this._data.isPublic;
        },
        set: function (isPublic) {
            this._data.isPublic = isPublic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "created", {
        get: function () {
            return this._data.created;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "modified", {
        get: function () {
            return this._data.modified;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "users", {
        get: function () {
            return this._data.users;
        },
        enumerable: true,
        configurable: true
    });
    Room.prototype.setMetaData = function (key, value) {
        if (!key || typeof (key) !== "string") {
            throw Error("set metaData failure. Parameter invalid.");
        }
        if (this._data.metaData === undefined) {
            var metaData = { key: value };
            this._data.metaData = metaData;
        }
        else {
            this._data.metaData[key] = value;
        }
    };
    Room.prototype.update = function () {
        var self = this;
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this._data)
        }).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            self._data = json;
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Room.prototype.setUsers = function (userIds) {
        if (!userIds || !Array.isArray(userIds)) {
            throw Error("setUsers failure. Parameter invalid.");
        }
        var fetchParam = {
            method: "POST",
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
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId + "/users", fetchParam).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Room.prototype.addUsers = function (userIds) {
        if (!userIds || !Array.isArray(userIds)) {
            throw Error("addUsers failure. Parameter invalid.");
        }
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
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId + "/users", fetchParam).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Room.prototype.removeUsers = function (userIds) {
        if (!userIds || !Array.isArray(userIds)) {
            throw Error("removeUsers failure. Parameter invalid.");
        }
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
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId + "/users", fetchParam).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Room.prototype.reflesh = function () {
        var self = this;
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId, {}).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            self._data = json;
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Room.prototype.getMessages = function (queryParams) {
        var queryParamsString = "";
        if (queryParams !== undefined) {
            queryParamsString = util_1.createQueryParams(queryParams);
        }
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId + "/messages?" + queryParamsString, {}).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Room.prototype.subscribeMessage = function (onMessageReceived) {
        var _this = this;
        if (!this._data.roomId || typeof (this._data.roomId) !== "string") {
            throw Error("Subscribe message failure. roomId is not setting.");
        }
        if (onMessageReceived === undefined) {
            throw Error("Subscribe message failure. Parameter invalid.");
        }
        this._onMessageReceived = onMessageReceived;
        if (this._client.connection.sendEvent(this._data.roomId, "message", "bind")) {
            this._client.connection.onMessageReceived = function (data) {
                _this._onMessageReceived(data);
            };
            console.info("Subscribe message success roomId[" + this._data.roomId + "]");
        }
        else {
            throw Error("Subscribe message failure roomId[" + this._data.roomId + "]");
        }
    };
    Room.prototype.unsubscribeMessage = function () {
        if (!this._data.roomId || typeof (this._data.roomId) !== "string") {
            throw Error("Unsubscribe message failure. roomId is not setting.");
        }
        this._onMessageReceived = Function;
        if (this._client.connection.sendEvent(this._data.roomId, "message", "unbind")) {
            console.info("Unsubscribe message success roomId[" + this._data.roomId + "]");
        }
        else {
            throw Error("Unsubscribe message failure roomId[" + this._data.roomId + "]");
        }
    };
    Room.prototype.subscribeUserJoin = function (onUserJoined) {
        var _this = this;
        if (!this._data.roomId || typeof (this._data.roomId) !== "string") {
            throw Error("Subscribe userJoin failure. roomId is not setting.");
        }
        if (onUserJoined === undefined) {
            throw Error("Subscribe userJoin failure. Parameter invalid.");
        }
        this._onUserJoined = onUserJoined;
        if (this._client.connection.sendEvent(this._data.roomId, "userJoin", "bind")) {
            this._client.connection.onUserJoined = function (data) {
                var users = data.payload;
                _this._data.users = users;
                _this._onUserJoined(users);
            };
            console.info("Subscribe userJoin success roomId[" + this._data.roomId + "]");
        }
        else {
            throw Error("Subscribe userJoin failure roomId[" + this._data.roomId + "]");
        }
    };
    Room.prototype.unsubscribeUserJoin = function () {
        if (!this._data.roomId || typeof (this._data.roomId) !== "string") {
            throw Error("Unsubscribe userJoin failure. roomId is not setting.");
        }
        this._onUserJoined = Function;
        if (this._client.connection.sendEvent(this._data.roomId, "userJoin", "unbind")) {
            console.info("Unsubscribe userJoin success roomId[" + this._data.roomId + "]");
        }
        else {
            throw Error("Unsubscribe userJoin failure roomId[" + this._data.roomId + "]");
        }
    };
    Room.prototype.subscribeUserLeft = function (onUserLeft) {
        var _this = this;
        if (!this._data.roomId || typeof (this._data.roomId) !== "string") {
            throw Error("Subscribe userLeft failure. roomId is not setting.");
        }
        if (onUserLeft === undefined) {
            throw Error("Subscribe userLeft failure. Parameter invalid.");
        }
        this._onUserLeft = onUserLeft;
        if (this._client.connection.sendEvent(this._data.roomId, "userLeft", "bind")) {
            this._client.connection.onUserLeft = function (data) {
                var users = data.payload;
                _this._data.users = users;
                _this._onUserLeft(users);
            };
            console.info("Subscribe userLeft success roomId[" + this._data.roomId + "]");
        }
        else {
            throw Error("Subscribe userLeft failure roomId[" + this._data.roomId + "]");
        }
    };
    Room.prototype.unsubscribeUserLeft = function () {
        if (!this._data.roomId || typeof (this._data.roomId) !== "string") {
            throw Error("Unsubscribe userLeft failure. roomId is not setting.");
        }
        if (this._onUserLeft === undefined) {
            throw Error("Unsubscribe userLeft failure. .");
        }
        this._onUserLeft = Function;
        if (this._client.connection.sendEvent(this._data.roomId, "userLeft", "unbind")) {
            console.info("Unsubscribe userLeft success roomId[" + this._data.roomId + "]");
        }
        else {
            throw Error("Unsubscribe userLeft failure roomId[" + this._data.roomId + "]");
        }
    };
    return Room;
}());
exports.default = Room;
