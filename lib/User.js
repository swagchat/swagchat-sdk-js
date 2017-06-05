"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
var Client_1 = require("./Client");
/**
 * User class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * user.name = "John";<br />
 * console.log(user.name);</code>
 */
var User = (function () {
    function User(params) {
        this._client = params.client;
        this._data = params.data;
    }
    User.auth = function (params) {
        if (!params.userId || typeof (params.userId) !== "string") {
            throw Error("Auth user failure. Parameter invalid [userId].");
        }
        return fetch(params.apiEndpoint + "/users/" + params.userId, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + params.accessToken,
            },
        }).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (user) {
                    user.accessToken = params.accessToken || "";
                    var client = new Client_1.Client({
                        apiKey: params.apiKey,
                        apiEndpoint: params.apiEndpoint,
                        userAccessToken: params.accessToken || "",
                        realtime: {
                            endpoint: params.realtimeEndpoint || "",
                        },
                    });
                    return {
                        user: new User({
                            client: client,
                            data: user,
                        }),
                        error: null,
                    };
                });
            }
            else if (response.status === 404) {
                return {
                    user: null,
                    error: {
                        title: response.statusText,
                    },
                };
            }
            else {
                return response.json().then(function (json) {
                    return {
                        user: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                user: null,
                error: {
                    title: error.message,
                },
            };
        });
    };
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
    /**
     * Register a new device token.
     *
     * @param token device token.
     */
    User.prototype.setDevice = function (platform, token) {
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
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
            body: JSON.stringify({
                token: token,
            })
        }).then(function (response) {
            if (response.status === 200 || response.status === 201) {
                _this.reflesh();
                return response.json().then(function (device) {
                    return {
                        device: device,
                        error: null,
                    };
                });
            }
            else if (response.status === 404) {
                return {
                    device: null,
                    error: {
                        title: response.statusText,
                    },
                };
            }
            else {
                return response.json().then(function (json) {
                    return {
                        device: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                device: null,
                error: {
                    title: error.message,
                },
            };
        });
    };
    /**
     * Delete device token.
     */
    User.prototype.removeDevice = function (platform) {
        var _this = this;
        if (!platform || typeof (platform) !== "number") {
            throw Error("Set device failure. platform is not setting.");
        }
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId + "/devices/" + String(platform), {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + this.accessToken,
            },
        }).then(function (response) {
            if (response.status === 204) {
                _this.reflesh();
                return response.json().then(function () {
                    return {
                        error: null,
                    };
                });
            }
            else if (response.status === 404) {
                return {
                    error: {
                        title: response.statusText,
                    },
                };
            }
            else {
                return response.json().then(function (json) {
                    return {
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                error: {
                    title: error.message,
                },
            };
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
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
            body: JSON.stringify(putUser)
        }).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (user) {
                    self._data = user;
                    return {
                        user: self,
                        error: null,
                    };
                });
            }
            else {
                return response.json().then(function (json) {
                    return {
                        user: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                user: null,
                error: {
                    title: error.message,
                },
            };
        });
    };
    /**
     * Refresh user information to the latest.
     * A different client might update an existing user's information while you use the application continuously.
     */
    User.prototype.reflesh = function () {
        var self = this;
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
        }).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (user) {
                    var accessToken = self.accessToken;
                    self._data = user;
                    self._data.accessToken = accessToken;
                    return {
                        user: self,
                        error: null,
                    };
                });
            }
            else if (response.status === 404) {
                return {
                    user: null,
                    error: {
                        title: response.statusText,
                    },
                };
            }
            else {
                return response.json().then(function (json) {
                    return {
                        user: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                user: null,
                error: {
                    title: error.message,
                },
            };
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
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
            body: JSON.stringify({ messages: messages })
        }).then(function (response) {
            if (response.status === 201) {
                return response.json().then(function (res) {
                    return {
                        messageIds: res.messageIds,
                        error: null,
                    };
                });
            }
            else {
                return response.json().then(function (json) {
                    return {
                        messageIds: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                messageIds: null,
                error: {
                    title: error.message,
                },
            };
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
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
            body: JSON.stringify({ unreadCount: 0 })
        }).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function () {
                    return {
                        error: null,
                    };
                });
            }
            else {
                return response.json().then(function (json) {
                    return {
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                error: {
                    title: error.message,
                },
            };
        });
    };
    /**
     * Reset the number of unread for each room for the user.
     */
    User.prototype.markAllAsRead = function () {
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
            body: JSON.stringify({ unreadCount: 0 })
        }).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function () {
                    return {
                        error: null,
                    };
                });
            }
            else {
                return response.json().then(function (json) {
                    return {
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                error: {
                    title: error.message,
                },
            };
        });
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map