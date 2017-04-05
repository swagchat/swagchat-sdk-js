import * as model from "./interface";
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

    public getMetaData(key: string): (string | number | boolean) {
        return this._data.metaData[key];
    }

    public setMetaData(key: string, value: string | number | boolean) {
        if (this._data.metaData === undefined) {
            let metaData = {key: value};
            this._data.metaData = metaData;
        } else {
            this._data.metaData[key] = value;
        }
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

