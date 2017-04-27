"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./const");
require("isomorphic-fetch");
var User = (function () {
    function User(option) {
        this._client = option.client;
        this._data = option.userObj;
    }
    Object.defineProperty(User.prototype, "userId", {
        get: function () {
            return this._data.userId;
        },
        set: function (userId) {
            if (!userId || userId === "" || typeof (userId) !== "string") {
                throw Error("Set userId failure. userId is not setting.");
            }
            this._data.userId = userId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this._data.name;
        },
        set: function (name) {
            if (!name || name === "" || typeof (name) !== "string") {
                throw Error("Set userId failure. userId is not setting.");
            }
            this._data.name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "pictureUrl", {
        get: function () {
            return this._data.pictureUrl;
        },
        set: function (pictureUrl) {
            if (!pictureUrl || pictureUrl === "" || typeof (pictureUrl) !== "string") {
                throw Error("Set userId failure. userId is not setting.");
            }
            this._data.pictureUrl = pictureUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "informationUrl", {
        get: function () {
            return this._data.informationUrl;
        },
        set: function (informationUrl) {
            if (!informationUrl || informationUrl === "" || typeof (informationUrl) !== "string") {
                throw Error("Set userId failure. userId is not setting.");
            }
            this._data.informationUrl = informationUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "unreadCount", {
        get: function () {
            return this._data.unreadCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "metaData", {
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
    Object.defineProperty(User.prototype, "created", {
        get: function () {
            return this._data.created;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "modified", {
        get: function () {
            return this._data.modified;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "rooms", {
        get: function () {
            return this._data.rooms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "devices", {
        get: function () {
            return this._data.devices;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype._setDevice = function (platform, token) {
        var _this = this;
        if (!platform || typeof (platform) !== "number") {
            throw Error("Set device failure. platform is not setting.");
        }
        var method = "POST";
        if (this._data.devices) {
            for (var _i = 0, _a = this._data.devices; _i < _a.length; _i++) {
                var device = _a[_i];
                if (device.platform === platform) {
                    method = "PUT";
                }
            }
        }
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId + "/devices/" + String(platform), {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: token,
            })
        }).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            _this.reflesh();
            return json;
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    User.prototype._removeDevice = function (platform) {
        var _this = this;
        if (!platform || typeof (platform) !== "number") {
            throw Error("Set device failure. platform is not setting.");
        }
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId + "/devices/" + String(platform), {
            method: "DELETE",
        }).then(function (response) {
            if (response.status !== 204) {
                return response.json();
            }
            return {};
        }).then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            _this.reflesh();
            return json;
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    User.prototype.setMetaData = function (key, value) {
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
    User.prototype.setDeviceIos = function (token) {
        return this._setDevice(const_1.PLATFORM_IOS, token);
    };
    User.prototype.setDeviceAndroid = function (token) {
        return this._setDevice(const_1.PLATFORM_ANDROID, token);
    };
    User.prototype.removeDeviceIos = function () {
        return this._removeDevice(const_1.PLATFORM_IOS);
    };
    User.prototype.removeDeviceAndroid = function () {
        return this._removeDevice(const_1.PLATFORM_ANDROID);
    };
    User.prototype.update = function () {
        var self = this;
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId, {
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
    User.prototype.reflesh = function () {
        var self = this;
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId, {}).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            self._data = json;
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    User.prototype.sendMessages = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        if (!messages || !Array.isArray(messages)) {
            throw Error("set metaData failure. Parameter invalid.");
        }
        return fetch(this._client.apiEndpoint + "/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ messages: messages })
        }).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).then(function (json) { return json; })
            .catch(function (error) {
            throw Error(error.message);
        });
    };
    User.prototype.markAsRead = function (roomId) {
        if (!roomId || typeof (roomId) !== "string") {
            throw Error("markAsRead failure. Parameter invalid.");
        }
        return fetch(this._client.apiEndpoint + "/rooms/" + roomId + "/users/" + this._data.userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ unreadCount: 0 })
        }).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    User.prototype.markAllAsRead = function () {
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ unreadCount: 0 })
        }).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    return User;
}());
exports.default = User;
