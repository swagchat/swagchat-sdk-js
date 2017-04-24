import * as model from "./interface";
import { PLATFORM_IOS, PLATFORM_ANDROID } from "./const";
import { Client } from "./Client";
import "isomorphic-fetch";

/**
 * User xxxxxxxxxxxx.
 */
export default class User {
    readonly _client: Client;
    private _data: model.IUser;

    /**
     * constructor xxxxxxxxxxxx.
     */
    constructor(option: model.IUserConfig) {
        this._client = option.client;
        this._data = option.userObj;
    }

    get userId(): string {
        return this._data.userId;
    }

    set userId(userId: string) {
        this._data.userId = userId;
    }

    get name(): string {
        return this._data.name;
    }

    set name(name: string) {
        this._data.name = name;
    }

    get pictureUrl(): string | undefined {
        return this._data.pictureUrl;
    }

    set pictureUrl(pictureUrl: string | undefined) {
        this._data.pictureUrl = pictureUrl;
    }

    get informationUrl(): string | undefined {
        return this._data.informationUrl;
    }

    set informationUrl(informationUrl: string | undefined) {
        this._data.informationUrl = informationUrl;
    }

    get unreadCount(): number {
        return this._data.unreadCount;
    }

    get metaData(): Object {
        return this._data.metaData;
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

    private _setDevice(platform: number, token: string): Promise<never> {
        if (!platform || typeof(platform) !== "number") {
            throw Error("Set device failure. platform is not setting.");
        }
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId + "/devices/" + String(platform), {
            method: "POST",
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
            return json;
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    private _updateDevice(platform: number, token: string): Promise<never> {
        if (!platform || typeof(platform) !== "number") {
            throw Error("Set device failure. platform is not setting.");
        }
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId + "/devices/" + String(platform), {
            method: "PUT",
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
            return json;
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    private _removeDevice(platform: number): Promise<never> {
        if (!platform || typeof(platform) !== "number") {
            throw Error("Set device failure. platform is not setting.");
        }
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId + "/devices/" + String(platform), {
            method: "DELETE",
        }).then((response: Response) => response.json())
        .then((json) => {
            if (json.hasOwnProperty("errorName")) {
                throw Error(JSON.stringify(json));
            }
        }).catch((error) => {
            throw Error(error.message);
        });
    }

    public setMetaData(key: string, value: string | number | boolean) {
        if (this._data.metaData === undefined) {
            let metaData = {key: value};
            this._data.metaData = metaData;
        } else {
            this._data.metaData[key] = value;
        }
    }

    public getMetaData(key: string): (string | number | boolean) {
        return this._data.metaData[key];
    }

    public setDeviceIos(token: string): Promise<never> {
        return this._setDevice(PLATFORM_IOS, token);
    }

    public setDeviceAndroid(token: string): Promise<never> {
        return this._setDevice(PLATFORM_ANDROID, token);
    }

    public updateDeviceIos(token: string): Promise<never> {
        return this._updateDevice(PLATFORM_IOS, token);
    }

    public updateDeviceAndroid(token: string): Promise<never> {
        return this._updateDevice(PLATFORM_ANDROID, token);
    }

    public removeDeviceIos(): Promise<never> {
        return this._removeDevice(PLATFORM_IOS);
    }

    public removeDeviceAndroid(): Promise<never> {
        return this._removeDevice(PLATFORM_ANDROID);
    }
    /**
     * Updating user item.
     *
     * @param userObj xxxxxxx.
     * @returns yyyyyyyy.
     */
    public update(): Promise<never> {
        const self = this;
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this._data)
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

    public reflesh(): Promise<never> {
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

    public sendMessages(...messages: model.IMessage[]) {
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

    public markAsRead(roomId: string): Promise<never> {
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

    public markAllAsRead(): Promise<never> {
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

