import Realtime from "./Realtime";
import User from "./User";
import Room from "./Room";
import * as model from "./interface";
import "isomorphic-fetch";

export class Client {
    readonly apiKey: string;
    readonly apiEndpoint: string;
    public connection: Realtime;

    constructor(config: model.IClientConfig) {
        console.info("Initializing Swagchat Client...");

        this.apiKey = config.apiKey;
        this.apiEndpoint = config.apiEndpoint;
        if (config.hasOwnProperty("realtime")) {
            const realtimeConfig = <model.IRealtimeConfig>config.realtime;
            this.connection = new Realtime(realtimeConfig.endpoint);
        }

        console.info("Initialized Swagchat Client.");
    }

    set onConnected(onConnected: Function) {
        this.connection.onConnected = onConnected;
    }

    set onError(onError: Function) {
        this.connection.onError = onError;
    }

    set onClosed(onClosed: Function) {
        this.connection.onClosed = onClosed;
    }

    public socketClose() {
        this.connection.close();
    }

    public createUser(createUserObject: model.IUser): Promise<Response> {
        const self = this;
        return fetch(this.apiEndpoint + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createUserObject)
        }).then((response: Response) => response.json())
        .then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).then((json) => {
            return new User({
                client: self,
                userObj: <model.IUser>json
            });
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    public getUsers(): Promise<Response> {
        return fetch(this.apiEndpoint + "/users", {
        }).then((response: Response) => response.json())
        .then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    public getUser(userId: string): Promise<Response> {
        if (!userId || typeof(userId) !== "string") {
            throw Error("Get user failure. Parameter invalid.");
        }
        const self = this;
        return fetch(this.apiEndpoint + "/users/" + userId, {
        }).then((response: Response) => response.json())
        .then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return new User({
                client: self,
                userObj: <model.IUser>json
            });
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    public removeUser(userId: string): Promise<Response> {
        if (!userId || typeof(userId) !== "string") {
            throw Error("Remove user failure. Parameter invalid.");
        }
        return fetch(this.apiEndpoint + "/users/" + userId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response: Response) => {
            if (response.status !== 204) {
                return response.json();
            }
            return {};
        }).then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    public createRoom(createRoomObject: model.IRoom): Promise<Response> {
        const self = this;
        return fetch(this.apiEndpoint + "/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createRoomObject)
        }).then((response: Response) => response.json())
        .then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).then((json) => {
            return new Room({
                client: self,
                roomObj: <model.IRoom>json
            });
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    public getRooms(): Promise<Response> {
        return fetch(this.apiEndpoint + "/rooms", {
        }).then((response: Response) => response.json())
        .then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    public getRoom(roomId: string): Promise<Response> {
        if (!roomId || typeof(roomId) !== "string") {
            throw Error("Get room failure. Parameter invalid.");
        }
        const self = this;
        return fetch(this.apiEndpoint + "/rooms/" + roomId, {
        }).then((response: Response) => response.json())
        .then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return new Room({
                client: self,
                roomObj: <model.IRoom>json
            });
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    public removeRoom(roomId: string): Promise<Response> {
        if (!roomId || typeof(roomId) !== "string") {
            throw Error("Remove room failure. Parameter invalid.");
        }
        return fetch(this.apiEndpoint + "/rooms/" + roomId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response: Response) => {
            if (response.status !== 204) {
                return response.json();
            }
            return {};
        }).then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    public createTextMessage(roomId: string, userId: string, text: string): model.IMessage {
        if (!roomId || !userId || !text || typeof(roomId) !== "string" || typeof(userId) !== "string" || typeof(text) !== "string") {
            throw Error("Message creation failed. Parameter invalid.");
        };
        return {
            roomId: roomId,
            userId: userId,
            type: "text",
            eventName: "message",
            payload: {
                "text": text
            }
        };
    }

    public createCustomMessage(roomId: string, userId: string, payload: Object, type: string): model.IMessage {
        if (!roomId || !userId || !payload || typeof(roomId) !== "string" || !(payload instanceof Object) || !(payload instanceof Object)) {
            throw Error("Creating message failure. Parameter invalid.");
        };
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
    }
}
