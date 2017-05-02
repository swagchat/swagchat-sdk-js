import * as model from "./interface";
import { PLATFORM_IOS, PLATFORM_ANDROID } from "./const";
import { Client } from "./Client";
import "isomorphic-fetch";

export default class User {
    readonly _client: Client;
    private _data: model.IUser;

    constructor(option: model.IUserConfig) {
        this._client = option.client;
        this._data = option.userObj;
    }

    get userId(): string {
        return this._data.userId;
    }

    set userId(userId: string) {
        if (!userId || userId === "" || typeof(userId) !== "string") {
            throw Error("Set userId failure. userId is not setting.");
        }
        this._data.userId = userId;
    }

    get name(): string {
        return this._data.name;
    }

    set name(name: string) {
        if (!name || name === "" || typeof(name) !== "string") {
            throw Error("Set userId failure. userId is not setting.");
        }
        this._data.name = name;
    }

    get pictureUrl(): string {
        return this._data.pictureUrl;
    }

    set pictureUrl(pictureUrl: string) {
        if (!pictureUrl || pictureUrl === "" || typeof(pictureUrl) !== "string") {
            throw Error("Set userId failure. userId is not setting.");
        }
        this._data.pictureUrl = pictureUrl;
    }

    get informationUrl(): string {
        return this._data.informationUrl;
    }

    set informationUrl(informationUrl: string) {
        if (!informationUrl || informationUrl === "" || typeof(informationUrl) !== "string") {
            throw Error("Set userId failure. userId is not setting.");
        }
        this._data.informationUrl = informationUrl;
    }

    get unreadCount(): number {
        return this._data.unreadCount;
    }

    get metaData(): {[key: string]: string | number | boolean | Object} {
        return this._data.metaData;
    }

    set metaData(metaData: {[key: string]: string | number | boolean | Object}) {
        if (!metaData || typeof(metaData) !== "object") {
            throw Error("Set metaData failure. metaData is not setting.");
        }
        this._data.metaData = metaData;
    }

    get created(): number {
        return this._data.created;
    }

    get modified(): number {
        return this._data.modified;
    }

    get rooms(): model.IRoomForUser[] {
        return this._data.rooms;
    }

    get devices(): model.IDevice[] {
        return this._data.devices;
    }

    private _setDevice(platform: number, token: string): Promise<Response> {
        if (!platform || typeof(platform) !== "number") {
            throw Error("Set device failure. platform is not setting.");
        }
        let method = "POST";
        if (this._data.devices) {
            for (let device of this._data.devices) {
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
        }).then((response: Response) => response.json())
        .then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            this.reflesh();
            return json;
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    private _removeDevice(platform: number): Promise<Response> {
        if (!platform || typeof(platform) !== "number") {
            throw Error("Set device failure. platform is not setting.");
        }
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId + "/devices/" + String(platform), {
            method: "DELETE",
        }).then((response: Response) => {
            if (response.status !== 204) {
                return response.json();
            }
            return {};
        }).then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            this.reflesh();
            return json;
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    public setMetaData(key: string, value: string | number | boolean | Object) {
        if (!key || typeof(key) !== "string") {
            throw Error("set metaData failure. Parameter invalid.");
        }
        if (this._data.metaData === undefined) {
            let metaData = {key: value};
            this._data.metaData = metaData;
        } else {
            this._data.metaData[key] = value;
        }
    }

    public setDeviceIos(token: string): Promise<Response> {
        return this._setDevice(PLATFORM_IOS, token);
    }

    public setDeviceAndroid(token: string): Promise<Response> {
        return this._setDevice(PLATFORM_ANDROID, token);
    }

    public removeDeviceIos(): Promise<Response> {
        return this._removeDevice(PLATFORM_IOS);
    }

    public removeDeviceAndroid(): Promise<Response> {
        return this._removeDevice(PLATFORM_ANDROID);
    }

    public update(): Promise<Response> {
        const self = this;
        const putUser = {
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
        }).then((response: Response) => response.json())
        .then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            self._data = <model.IUser>json;
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    public reflesh(): Promise<Response> {
        const self = this;
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId, {
        }).then((response: Response) => response.json())
        .then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            self._data = <model.IUser>json;
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    public sendMessages(...messages: model.IMessage[]): Promise<Response> {
        if (!messages || !Array.isArray(messages)) {
            throw Error("set metaData failure. Parameter invalid.");
        }
        return fetch(this._client.apiEndpoint + "/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({messages: messages})
        }).then((response: Response) => response.json())
        .then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
            return json;
        }).then((json) => json)
        .catch((error) => {
            throw Error(error.message);
        });
    }

    public markAsRead(roomId: string): Promise<Response> {
        if (!roomId || typeof(roomId) !== "string") {
            throw Error("markAsRead failure. Parameter invalid.");
        }
        return fetch(this._client.apiEndpoint + "/rooms/" + roomId + "/users/" + this._data.userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({unreadCount: 0})
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

    public markAllAsRead(): Promise<Response> {
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({unreadCount: 0})
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
}
