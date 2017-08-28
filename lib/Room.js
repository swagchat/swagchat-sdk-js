"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("isomorphic-fetch");
var _1 = require("./");
/**
 * Room class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * room.name = 'John's Room';<br />
 * console.log(room.name);</code>
 */
var Room = (function () {
    function Room(params) {
        this._client = params.client;
        this._data = params.data;
    }
    Object.defineProperty(Room.prototype, "onMessageReceived", {
        set: function (onMessageReceived) {
            this._client.connection.onMessageReceived = onMessageReceived;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "roomId", {
        get: function () {
            return this._data.roomId ? this._data.roomId : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "userId", {
        get: function () {
            return this._data.userId ? this._data.userId : '';
        },
        set: function (userId) {
            this._data.roomId = userId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "name", {
        get: function () {
            return this._data.name ? this._data.name : '';
        },
        set: function (name) {
            this._data.name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "pictureUrl", {
        get: function () {
            return this._data.pictureUrl ? this._data.pictureUrl : '';
        },
        set: function (pictureUrl) {
            this._data.pictureUrl = pictureUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "informationUrl", {
        get: function () {
            return this._data.informationUrl ? this._data.informationUrl : '';
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
            if (!metaData || typeof (metaData) !== 'object') {
                _1.logger('api', 'error', 'Set metaData failure. metaData is not setting.');
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
            return this._data.lastMessage ? this._data.lastMessage : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "lastMessageUpdated", {
        get: function () {
            return this._data.lastMessageUpdated ? this._data.lastMessageUpdated : '';
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
            return this._data.created ? this._data.created : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Room.prototype, "modified", {
        get: function () {
            return this._data.modified ? this._data.modified : '';
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
     * <code>room.metaData = {'key1': 'value1', 'key2': 2, 'key3': true, 'key4': {'key5': 'value5'}};</code>
     * @param key Key for register.
     * @param value A value for key.
     */
    Room.prototype.setMetaData = function (key, value) {
        if (!key || typeof (key) !== 'string') {
            _1.logger('api', 'error', 'set metaData failure. Parameter invalid.');
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
        var _this = this;
        return fetch(this._client.apiEndpoint + '/rooms/' + this._data.roomId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this._client.userAccessToken,
            },
            body: JSON.stringify(putRoom)
        }).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (room) {
                    return {
                        room: new Room({
                            client: _this._client,
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
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userIds: userIds
            })
        };
        if (!(userIds instanceof Array) || userIds.length === 0) {
            fetchParam.body = JSON.stringify({});
        }
        return fetch(this._client.apiEndpoint + '/rooms/' + this._data.roomId + '/users', fetchParam).then(function (response) {
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
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userIds: userIds
            })
        };
        if (!(userIds instanceof Array) || userIds.length === 0) {
            fetchParam.body = JSON.stringify({});
        }
        return fetch(this._client.apiEndpoint + '/rooms/' + this._data.roomId + '/users', fetchParam).then(function (response) {
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
        var _this = this;
        return fetch(this._client.apiEndpoint + '/rooms/' + this._data.roomId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this._client.userAccessToken,
            },
        }).then(function (response) {
            if (response.status === 200) {
                return response.json().then(function (room) {
                    _this._data = room;
                    return {
                        room: _this,
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
        var queryParamsString = '';
        if (queryParams !== undefined) {
            queryParamsString = _1.createQueryParams(queryParams);
        }
        return fetch(this._client.apiEndpoint + '/rooms/' + this._data.roomId + '/messages?' + queryParamsString, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this._client.userAccessToken,
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
        this._client.connection ? this._client.connection.subscribeMessage(onMessageReceived, this.roomId) : null;
    };
    Room.prototype.unsubscribeMessage = function () {
        this._client.connection ? this._client.connection.unsubscribeMessage(this.roomId) : null;
    };
    Room.prototype.subscribeUserJoin = function (onUserJoined) {
        this._client.connection ? this._client.connection.subscribeUserJoin(onUserJoined, this.roomId) : null;
    };
    Room.prototype.unsubscribeUserJoin = function () {
        this._client.connection ? this._client.connection.unsubscribeUserJoin(this.roomId) : null;
    };
    Room.prototype.subscribeUserLeft = function (onUserLeft) {
        this._client.connection ? this._client.connection.subscribeUserLeft(onUserLeft, this.roomId) : null;
    };
    Room.prototype.unsubscribeUserLeft = function () {
        this._client.connection ? this._client.connection.unsubscribeUserLeft(this.roomId) : null;
    };
    return Room;
}());
exports.Room = Room;
//# sourceMappingURL=Room.js.map