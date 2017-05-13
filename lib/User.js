"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./const");
require("isomorphic-fetch");
/**
 * User class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * user.name = "John";<br />
 * console.log(user.name);</code>
 */
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
    Object.defineProperty(User.prototype, "isPublic", {
        get: function () {
            return this._data.isPublic;
        },
        set: function (isPublic) {
            this._data.isPublic = isPublic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "accessToken", {
        get: function () {
            return this._data.accessToken;
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
    /**
     * Register metadata in separate.
     * An applied key will be added if metadata already exists. A value will be overwritten if an equivalent key exists.
     * Please use accessor if you will register by multiple keys in a lump. In this case, existing metadata will be overwritten.
     *
     * ex)<br />
     * <code>user.metaData = {"key1": "value1", "key2": 2, "key3": true, "key4": {"key5": "value5"}};</code>
     * @param key Key for register.
     * @param value A value for key.
     */
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
    /**
     * Register a new iOS device token.
     *
     * @param token device token for iOS.
     */
    User.prototype.setDeviceIos = function (token) {
        return this._setDevice(const_1.PLATFORM_IOS, token);
    };
    /**
     * Register a new Android device token.
     *
     * @param token device token for Android.
     */
    User.prototype.setDeviceAndroid = function (token) {
        return this._setDevice(const_1.PLATFORM_ANDROID, token);
    };
    /**
     * Delete device token for iOS.
     */
    User.prototype.removeDeviceIos = function () {
        return this._removeDevice(const_1.PLATFORM_IOS);
    };
    /**
     * Delete device token for Android.
     */
    User.prototype.removeDeviceAndroid = function () {
        return this._removeDevice(const_1.PLATFORM_ANDROID);
    };
    /**
     * Update user information.
     * Please set the data of this object beforehand.
     */
    User.prototype.update = function () {
        var self = this;
        var putUser = {
            name: this._data.name,
            pictureUrl: this._data.pictureUrl,
            informationUrl: this._data.informationUrl,
            unreadCount: this._data.unreadCount,
            metaData: this._data.metaData
        };
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(putUser)
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
    /**
     * Refresh user information to the latest.
     * A different client might update an existing user's information while you use the application continuously.
     */
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
    /**
     * Send Message.
     * Please create message objects beforehand by using such as client.createTextMessage().
     * @param messages An array for message objects to send.
     */
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
    /**
     * Reset the number of unread for room specified by parameters.
     * @param roomId Room ID
     */
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
    /**
     * Reset the number of unread for each room for the user.
     */
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
