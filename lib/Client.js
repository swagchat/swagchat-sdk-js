"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Realtime_1 = require("./Realtime");
var User_1 = require("./User");
var Room_1 = require("./Room");
require("isomorphic-fetch");
var Client = (function () {
    function Client(config) {
        console.info("Initializing Swagchat Client...");
        this.apiKey = config.apiKey;
        this.apiEndpoint = config.apiEndpoint;
        if (config.hasOwnProperty("realtime")) {
            var realtimeConfig = config.realtime;
            this.connection = new Realtime_1.default(realtimeConfig.endpoint);
        }
        console.info("Initialized Swagchat Client.");
    }
    Object.defineProperty(Client.prototype, "onConnected", {
        set: function (onConnected) {
            this.connection.onConnected = onConnected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "onError", {
        set: function (onError) {
            this.connection.onError = onError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "onClosed", {
        set: function (onClosed) {
            this.connection.onClosed = onClosed;
        },
        enumerable: true,
        configurable: true
    });
    Client.prototype.socketClose = function () {
        this.connection.close();
    };
    Client.prototype.createUser = function (createUserObject) {
        var self = this;
        return fetch(this.apiEndpoint + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createUserObject)
        }).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).then(function (json) {
            return new User_1.default({
                client: self,
                userObj: json
            });
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Client.prototype.getUsers = function () {
        return fetch(this.apiEndpoint + "/users", {}).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Client.prototype.getUser = function (userId) {
        if (!userId || typeof (userId) !== "string") {
            throw Error("Get user failure. Parameter invalid.");
        }
        var self = this;
        return fetch(this.apiEndpoint + "/users/" + userId, {}).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return new User_1.default({
                client: self,
                userObj: json
            });
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Client.prototype.removeUser = function (userId) {
        return fetch(this.apiEndpoint + "/users/" + userId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if (response.status !== 204) {
                return response.json();
            }
            return {};
        }).then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Client.prototype.createRoom = function (createRoomObject) {
        var self = this;
        return fetch(this.apiEndpoint + "/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createRoomObject)
        }).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).then(function (json) {
            console.log("---------------------");
            console.log(json);
            return new Room_1.default({
                client: self,
                roomObj: json
            });
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Client.prototype.getRooms = function () {
        return fetch(this.apiEndpoint + "/rooms", {}).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Client.prototype.getRoom = function (roomId) {
        if (!roomId || typeof (roomId) !== "string") {
            throw Error("Get room failure. Parameter invalid.");
        }
        var self = this;
        return fetch(this.apiEndpoint + "/rooms/" + roomId, {}).then(function (response) { return response.json(); })
            .then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return new Room_1.default({
                client: self,
                roomObj: json
            });
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Client.prototype.removeRoom = function (roomId) {
        return fetch(this.apiEndpoint + "/rooms/" + roomId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if (response.status !== 204) {
                return response.json();
            }
            return {};
        }).then(function (json) {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
        }).catch(function (error) {
            throw Error(error.message);
        });
    };
    Client.prototype.createTextMessage = function (roomId, userId, text) {
        if (!roomId || !userId || !text || typeof (roomId) !== "string" || typeof (userId) !== "string" || typeof (text) !== "string") {
            throw Error("Creating message failure. Parameter invalid.");
        }
        ;
        return {
            roomId: roomId,
            userId: userId,
            type: "text",
            eventName: "message",
            payload: {
                "text": text
            }
        };
    };
    Client.prototype.createCustomMessage = function (roomId, userId, payload, type) {
        if (!roomId || !userId || !payload || typeof (roomId) !== "string" || !(payload instanceof Object) || !(payload instanceof Object)) {
            throw Error("Creating message failure. Parameter invalid.");
        }
        ;
        if (Object.keys(payload).length === 0) {
            throw Error("Creating message failure. Parameter invalid.");
        }
        return {
            roomId: roomId,
            userId: userId,
            type: type,
            eventName: "message",
            payload: payload
        };
    };
    return Client;
}());
exports.Client = Client;
