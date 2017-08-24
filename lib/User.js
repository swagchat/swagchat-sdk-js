"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
var _1 = require("./");
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
        return fetch(params.apiEndpoint + "/users/" + params.userId, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + params.accessToken,
            },
        }).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (user) {
                    user.accessToken = params.accessToken || "";
                    var client = new _1.Client({
                        apiKey: params.apiKey,
                        apiEndpoint: params.apiEndpoint,
                        userId: params.userId,
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
                _1.logger("api", "error", "Set userId failure. userId is not setting.");
            }
            else {
                this._data.userId = userId;
            }
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
                _1.logger("api", "error", "Set userId failure. userId is not setting.");
            }
            else {
                this._data.name = name;
            }
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
                _1.logger("api", "error", "Set userId failure. userId is not setting.");
            }
            else {
                this._data.pictureUrl = pictureUrl;
            }
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
                _1.logger("api", "error", "Set userId failure. userId is not setting.");
            }
            else {
                this._data.informationUrl = informationUrl;
            }
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
    Object.defineProperty(User.prototype, "isCanBlock", {
        get: function () {
            return this._data.isCanBlock;
        },
        set: function (isCanBlock) {
            this._data.isCanBlock = isCanBlock;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "isShowUsers", {
        get: function () {
            return this._data.isShowUsers;
        },
        set: function (isShowUsers) {
            this._data.isShowUsers = isShowUsers;
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
                _1.logger("api", "error", "Set metaData failure. metaData is not setting.");
            }
            else {
                this._data.metaData = metaData;
            }
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
    Object.defineProperty(User.prototype, "blocks", {
        get: function () {
            return this._data.blocks;
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
            _1.logger("api", "error", "set metaData failure. Parameter invalid.");
            return;
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
    User.prototype.update = function (putUser) {
        var _this = this;
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
                    return {
                        user: new User({
                            client: _this._client,
                            data: user,
                        }),
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
        var _this = this;
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
        }).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (user) {
                    var accessToken = _this.accessToken;
                    _this._data = user;
                    _this._data.accessToken = accessToken;
                    return {
                        user: _this,
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
        return fetch(this._client.apiEndpoint + "/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
            body: JSON.stringify({ messages: messages })
        }).then(function (response) {
            if (response.status === 201) {
                return response.json().then(function (messagesRes) {
                    return {
                        messageIds: messagesRes.messageIds,
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
    /**
     * File upload.
     * @param file Image data.
     */
    User.prototype.fileUpload = function (file) {
        var formData = new FormData();
        formData.append("asset", file);
        return fetch(this._client.apiEndpoint + "/assets", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.accessToken,
            },
            body: formData,
        }).then(function (response) {
            if (response.status === 201) {
                return response.json().then(function (asset) {
                    return {
                        asset: asset,
                        error: null,
                    };
                });
            }
            else {
                return response.json().then(function (json) {
                    return {
                        asset: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                asset: null,
                error: {
                    title: error.message,
                },
            };
        });
    };
    User.prototype.getContacts = function () {
        return fetch(this._client.apiEndpoint + "/contacts/" + this.userId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.accessToken,
            },
        }).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (usersRes) {
                    return {
                        users: usersRes.users,
                        error: null,
                    };
                });
            }
            else {
                return response.json().then(function (json) {
                    return {
                        users: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                users: null,
                error: {
                    title: error.message,
                },
            };
        });
    };
    User.prototype.addBlockUsers = function (userIds) {
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
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId + "/blocks", fetchParam).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (blockUsersRes) {
                    return {
                        blockUsers: blockUsersRes.blockUsers,
                        error: null,
                    };
                });
            }
            else if (response.status === 404) {
                return {
                    blockUsers: null,
                    error: {
                        title: response.statusText,
                    },
                };
            }
            else {
                return response.json().then(function (json) {
                    return {
                        blockUsers: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                blockUsers: null,
                error: {
                    title: error.message,
                },
            };
        });
    };
    User.prototype.removeBlockUsers = function (userIds) {
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
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId + "/blocks", fetchParam).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (blockUsersRes) {
                    return {
                        blockUsers: blockUsersRes.blockUsers,
                        error: null,
                    };
                });
            }
            else if (response.status === 404) {
                return {
                    blockUsers: null,
                    error: {
                        title: response.statusText,
                    },
                };
            }
            else {
                return response.json().then(function (json) {
                    return {
                        blockUsers: null,
                        error: json,
                    };
                });
            }
        }).catch(function (error) {
            return {
                blockUsers: null,
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