import "isomorphic-fetch";

import * as I from "./interface";
import { Platform } from "./interface";
import { Client } from "./Client";

/**
 * User class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * user.name = "John";<br />
 * console.log(user.name);</code>
 */
export class User {
    readonly  _client: Client;
    private _data: I.IUser;

    static auth(params: I.IAuthParams): Promise<I.IFetchUserResponse> {
        if (!params.userId || typeof(params.userId) !== "string") {
            throw Error("Auth user failure. Parameter invalid [userId].");
        }

        return fetch(params.apiEndpoint + "/users/" + params.userId, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + params.accessToken,
            },
        }).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then((user) => {
                    user.accessToken = params.accessToken || "";
                    const client = new Client({
                        apiKey: params.apiKey,
                        apiEndpoint: params.apiEndpoint,
                        userAccessToken: params.accessToken || "",
                        realtime: {
                            endpoint: params.realtimeEndpoint || "",
                        },
                    });
                    return (
                        {
                            user: new User({
                                client: client,
                                data: <User>user,
                            }),
                            error: null,
                        } as I.IFetchUserResponse
                    );
                });
            } else if (response.status === 404) {
                return {
                    user: null,
                    error: {
                        title: response.statusText,
                    } as I.IProblemDetail,
                } as I.IFetchUserResponse;
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            user: null,
                            error: <I.IProblemDetail>json,
                        } as I.IFetchUserResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                user: null,
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IFetchUserResponse;
        });
    }

    constructor(params: I.IUserParams) {
        this._client = params.client;
        this._data = params.data;
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

    get isPublic(): boolean {
        return this._data.isPublic;
    }

    set isPublic(isPublic: boolean) {
        this._data.isPublic = isPublic;
    }

    get accessToken(): string {
        return this._data.accessToken;
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

    get created(): string {
        return this._data.created;
    }

    get modified(): string {
        return this._data.modified;
    }

    get rooms(): I.IRoomForUser[] {
        return this._data.rooms;
    }

    get devices(): I.IDevice[] {
        return this._data.devices;
    }

    /**
     * Register a new device token.
     *
     * @param token device token.
     */
    public setDevice(platform: Platform, token: string): Promise<I.IFetchUserDeviceResponse> {
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
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
            body: JSON.stringify({
                token: token,
            })
        }).then((response: Response) => {
            if (response.status === 200 || response.status === 201) {
                this.reflesh();
                return response.json().then((device) => {
                    return (
                        {
                            device: device,
                            error: null,
                        } as I.IFetchUserDeviceResponse
                    );
                });
            } else if (response.status === 404) {
                return {
                    device: null,
                    error: {
                        title: response.statusText,
                    } as I.IProblemDetail,
                } as I.IFetchUserDeviceResponse;
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            device: null,
                            error: <I.IProblemDetail>json,
                        } as I.IFetchUserDeviceResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                device: null,
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IFetchUserDeviceResponse;
        });
    }

    /**
     * Delete device token.
     */
    public removeDevice(platform: Platform): Promise<I.IErrorResponse> {
        if (!platform || typeof(platform) !== "number") {
            throw Error("Set device failure. platform is not setting.");
        }
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId + "/devices/" + String(platform), {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + this.accessToken,
            },
        }).then((response: Response) => {
            if (response.status === 204) {
                this.reflesh();
                return response.json().then(() => {
                    return (
                        {
                            error: null,
                        } as I.IErrorResponse
                    );
                });
            } else if (response.status === 404) {
                return {
                    error: {
                        title: response.statusText,
                    } as I.IProblemDetail,
                } as I.IErrorResponse;
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            error: <I.IProblemDetail>json,
                        } as I.IErrorResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IErrorResponse;
        });
    }

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
    public setMetaData(key: string, value: string | number | boolean | Object): void {
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

    /**
     * Update user information.
     * Please set the data of this object beforehand.
     */
    public update(): Promise<I.IFetchUserResponse> {
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
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
            body: JSON.stringify(putUser)
        }).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then((user) => {
                    self._data = <I.IUser>user;
                    return (
                        {
                            user: self,
                            error: null,
                        } as I.IFetchUserResponse
                    );
                });
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            user: null,
                            error: <I.IProblemDetail>json,
                        } as I.IFetchUserResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                user: null,
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IFetchUserResponse;
        });
    }

    /**
     * Refresh user information to the latest.
     * A different client might update an existing user's information while you use the application continuously.
     */
    public reflesh(): Promise<I.IFetchUserResponse> {
        const self = this;
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
        }).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then((user) => {
                    const accessToken = self.accessToken;
                    self._data = <I.IUser>user;
                    self._data.accessToken = accessToken;
                    return (
                        {
                            user: self,
                            error: null,
                        } as I.IFetchUserResponse
                    );
                });
            } else if (response.status === 404) {
                return {
                    user: null,
                    error: {
                        title: response.statusText,
                    } as I.IProblemDetail,
                } as I.IFetchUserResponse;
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            user: null,
                            error: <I.IProblemDetail>json,
                        } as I.IFetchUserResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                user: null,
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IFetchUserResponse;
        });
    }

    /**
     * Send Message.
     * Please create message objects beforehand by using such as client.createTextMessage().
     * @param messages An array for message objects to send.
     */
    public sendMessages(...messages: I.IMessage[]): Promise<I.ISendMessagesResponse> {
        if (!messages || !Array.isArray(messages)) {
            throw Error("set metaData failure. Parameter invalid.");
        }
        return fetch(this._client.apiEndpoint + "/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
            body: JSON.stringify({messages: messages})
        }).then((response: Response) => {
            if (response.status === 201) {
                return response.json().then((res) => {
                    return (
                        {
                            messageIds: <string[]>res.messageIds,
                            error: null,
                        } as I.ISendMessagesResponse
                    );
                });
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            messageIds: null,
                            error: <I.IProblemDetail>json,
                        } as I.ISendMessagesResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                messageIds: null,
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.ISendMessagesResponse;
        });
    }

    /**
     * Reset the number of unread for room specified by parameters.
     * @param roomId Room ID
     */
    public markAsRead(roomId: string): Promise<I.IErrorResponse> {
        if (!roomId || typeof(roomId) !== "string") {
            throw Error("markAsRead failure. Parameter invalid.");
        }
        return fetch(this._client.apiEndpoint + "/rooms/" + roomId + "/users/" + this._data.userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
            body: JSON.stringify({unreadCount: 0})
        }).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then(() => {
                    return (
                        {
                            error: null,
                        } as I.IErrorResponse
                    );
                });
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            error: <I.IProblemDetail>json,
                        } as I.IErrorResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IErrorResponse;
        });
    }

    /**
     * Reset the number of unread for each room for the user.
     */
    public markAllAsRead(): Promise<I.IErrorResponse> {
        return fetch(this._client.apiEndpoint + "/users/" + this._data.userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            },
            body: JSON.stringify({unreadCount: 0})
        }).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then(() => {
                    return (
                        {
                            error: null,
                        } as I.IErrorResponse
                    );
                });
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            error: <I.IProblemDetail>json,
                        } as I.IErrorResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IErrorResponse;
        });
    }
}
