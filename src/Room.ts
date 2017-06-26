import * as I from "./interface";
import { Client } from "./Client";
import { createQueryParams, logger } from "./util";
import "isomorphic-fetch";

/**
 * Room class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * room.name = "John's Room";<br />
 * console.log(room.name);</code>
 */
export class Room {
    private _client: Client;
    private _data: I.IRoom;
    private _onMessageReceived: Function;
    private _onUserJoined: Function;
    private _onUserLeft: Function;

    constructor(params: I.IRoomParams) {
        this._client = params.client;
        this._data = params.data;
    }

    get roomId(): string {
        return this._data.roomId;
    }

    get userId(): string {
        return this._data.userId;
    }

    set userId(userId: string) {
        this._data.roomId = userId;
    }

    get name(): string {
        return this._data.name;
    }

    set name(name: string) {
        this._data.name = name;
    }

    get pictureUrl(): string {
        return this._data.pictureUrl;
    }

    set pictureUrl(pictureUrl: string) {
        this._data.pictureUrl = pictureUrl;
    }

    get informationUrl(): string {
        return this._data.informationUrl;
    }

    set informationUrl(informationUrl: string) {
        this._data.informationUrl = informationUrl;
    }

    get metaData(): {[key: string]: string | number | boolean | Object} {
        return this._data.metaData;
    }

    set metaData(metaData: {[key: string]: string | number | boolean | Object}) {
        if (!metaData || typeof(metaData) !== "object") {
            logger("api", "error", "Set metaData failure. metaData is not setting.");
        } else {
            this._data.metaData = metaData;
        }
    }

    get availableMessageTypes(): string[] | null {
        return this._data.availableMessageTypes;
    }

    get type(): number {
        return this._data.type;
    }

    set type(type: number) {
        this._data.type = type;
    }

    get lastMessage(): string {
        return this._data.lastMessage;
    }

    get lastMessageUpdated(): string {
        return this._data.lastMessageUpdated;
    }

    get messageCount(): number {
        return this._data.messageCount;
    }

    get isCanLeft(): boolean {
        return this._data.isCanLeft;
    }

    set isCanLeft(isCanLeft: boolean) {
        this._data.isCanLeft = isCanLeft;
    }

    get isShowUsers(): boolean {
        return this._data.isShowUsers;
    }

    set isShowUsers(isShowUsers: boolean) {
        this._data.isShowUsers = isShowUsers;
    }

    get created(): string {
        return this._data.created;
    }

    get modified(): string {
        return this._data.modified;
    }

    get users(): I.IUserForRoom[] | null {
        return this._data.users || null;
    }

    /**
     * Register metadata in separate.
     * An applied key will be added if metadata already exists. A value will be overwritten if an equivalent key exists.
     * Please use accessor if you will register by multiple keys in a lump. In this case, existing metadata will be overwritten.
     *
     * ex)<br />
     * <code>room.metaData = {"key1": "value1", "key2": 2, "key3": true, "key4": {"key5": "value5"}};</code>
     * @param key Key for register.
     * @param value A value for key.
     */
    public setMetaData(key: string, value: string | number | boolean | Object): void {
        if (!key || typeof(key) !== "string") {
            logger("api", "error", "set metaData failure. Parameter invalid.");
        } else {
            if (this._data.metaData === undefined) {
                let metaData = {key: value};
                this._data.metaData = metaData;
            } else {
                this._data.metaData[key] = value;
            }
        }
    }

    /**
     * Update room information.
     * Please set the data of this object beforehand.
     */
    public update(putRoom: I.IRoom): Promise<I.IFetchRoomResponse> {
        const self = this;
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._client.userAccessToken,
            },
            body: JSON.stringify(putRoom)
        }).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then((room) => {
                    return (
                        {
                            room: new Room({
                                client: self._client,
                                data: <I.IRoom>room,
                            }),
                            error: null,
                        } as I.IFetchRoomResponse
                    );
                });
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            room: null,
                            error: <I.IProblemDetail>json,
                        } as I.IFetchRoomResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                room: null,
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IFetchRoomResponse;
        });
    }

    public addUsers(userIds: string[]): Promise<I.IFetchRoomUsersResponse> {
        let fetchParam = {
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
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId + "/users",
            fetchParam
        ).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then((roomUsers) => {
                    return (
                        {
                            roomUsers: roomUsers,
                            error: null,
                        } as I.IFetchRoomUsersResponse
                    );
                });
            } else if (response.status === 404) {
                return {
                    roomUsers: null,
                    error: {
                        title: response.statusText,
                    } as I.IProblemDetail,
                } as I.IFetchRoomUsersResponse;
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            roomUsers: null,
                            error: <I.IProblemDetail>json,
                        } as I.IFetchRoomUsersResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                roomUsers: null,
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IFetchRoomUsersResponse;
        });
    }

    public removeUsers(userIds: string[]): Promise<I.IFetchRoomUsersResponse> {
        let fetchParam = {
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
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId + "/users",
            fetchParam
        ).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then((roomUsers) => {
                    return (
                        {
                            roomUsers: roomUsers,
                            error: null,
                        } as I.IFetchRoomUsersResponse
                    );
                });
            } else if (response.status === 404) {
                return {
                    roomUsers: null,
                    error: {
                        title: response.statusText,
                    } as I.IProblemDetail,
                } as I.IFetchRoomUsersResponse;
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            roomUsers: null,
                            error: <I.IProblemDetail>json,
                        } as I.IFetchRoomUsersResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                roomUsers: null,
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IFetchRoomUsersResponse;
        });
    }

    public reflesh(): Promise<I.IFetchRoomResponse> {
        const self = this;
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._client.userAccessToken,
            },
        }).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then((room) => {
                    self._data = <I.IRoom>room;
                    return (
                        {
                            room: self,
                            error: null,
                        } as I.IFetchRoomResponse
                    );
                });
            } else if (response.status === 404) {
                return {
                    room: null,
                    error: {
                        title: response.statusText,
                    } as I.IProblemDetail,
                } as I.IFetchRoomResponse;
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            room: null,
                            error: <I.IProblemDetail>json,
                        } as I.IFetchRoomResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                room: null,
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IFetchRoomResponse;
        });
    }

    public getMessages(queryParams: {[key: string]: string | number}): Promise<I.IFetchMessagesResponse> {
        let queryParamsString = "";
        if (queryParams !== undefined) {
            queryParamsString = createQueryParams(queryParams);
        }
        return fetch(this._client.apiEndpoint + "/rooms/" + this._data.roomId + "/messages?" + queryParamsString, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this._client.userAccessToken,
            },
        }).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then((messages) => {
                    return (
                        {
                            messages: <I.IMessages>messages,
                            error: null,
                        } as I.IFetchMessagesResponse
                    );
                });
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            messages: null,
                            error: <I.IProblemDetail>json,
                        } as I.IFetchMessagesResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                messages: null,
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IFetchMessagesResponse;
        });
    }

    public subscribeMessage(onMessageReceived: Function): void {
        if (!this._data.roomId || typeof(this._data.roomId) !== "string") {
            logger("realtime", "error", "Subscribe message failure. roomId is not setting.");
            return;
        }
        if (onMessageReceived === undefined) {
            logger("realtime", "error", "Subscribe message failure. onMessageReceived is undefined.");
            return;
        }
        if (!this._client.connection) {
            logger("realtime", "error", "Subscribe userLeft failure. Realtime connection is not setting.");
            return;
        }
        this._onMessageReceived = onMessageReceived;
        if (this._client.connection.sendEvent(this._data.roomId, "message", "bind")) {
            this._client.connection.onMessageReceived = (data: I.IMessage) => {
                this._onMessageReceived(data);
            };
            logger("realtime", "info", "Subscribe message success roomId[" + this._data.roomId + "]");
        } else {
            logger("realtime", "error", "Subscribe message failure roomId[" + this._data.roomId + "]");
        }
    }

    public unsubscribeMessage(): void {
        if (!this._data.roomId || typeof(this._data.roomId) !== "string") {
            logger("realtime", "error", "Unsubscribe message failure. roomId is not setting.");
            return;
        }
        if (!this._client.connection) {
            logger("realtime", "error", "Subscribe userLeft failure. Realtime connection is not setting.");
            return;
        }
        this._onMessageReceived = Function;
        if (this._client.connection.sendEvent(this._data.roomId, "message", "unbind")) {
            logger("realtime", "info", "Unsubscribe message success roomId[" + this._data.roomId + "]");
        } else {
            logger("realtime", "error", "Unsubscribe message failure roomId[" + this._data.roomId + "]");
        }
    }

    public subscribeUserJoin(onUserJoined: Function): void {
        if (!this._data.roomId || typeof(this._data.roomId) !== "string") {
            logger("realtime", "error", "Subscribe userJoin failure. roomId is not setting.");
            return;
        }
        if (onUserJoined === undefined) {
            logger("realtime", "error", "Subscribe userJoin failure. onUserJoined is undefined.");
            return;
        }
        if (!this._client.connection) {
            logger("realtime", "error", "Subscribe userLeft failure. Realtime connection is not setting.");
            return;
        }
        this._onUserJoined = onUserJoined;
        if (this._client.connection.sendEvent(this._data.roomId, "userJoin", "bind")) {
            this._client.connection.onUserJoined = (data: I.IMessage) => {
                let users = <I.IUserForRoom[]>data.payload;
                this._data.users = users;
                this._onUserJoined(users);
            };
            logger("realtime", "info", "Subscribe userJoin success roomId[" + this._data.roomId + "]");
        } else {
            logger("realtime", "error", "Subscribe userJoin failure roomId[" + this._data.roomId + "]");
        }
    }

    public unsubscribeUserJoin(): void {
        if (!this._data.roomId || typeof(this._data.roomId) !== "string") {
            logger("realtime", "error", "Unsubscribe userJoin failure. roomId is not setting.");
            return;
        }
        if (!this._client.connection) {
            logger("realtime", "error", "Subscribe userLeft failure. Realtime connection is not setting.");
            return;
        }
        this._onUserJoined = Function;
        if (this._client.connection.sendEvent(this._data.roomId, "userJoin", "unbind")) {
            logger("realtime", "info", "Unsubscribe userJoin success roomId[" + this._data.roomId + "]");
        } else {
            logger("realtime", "error", "Unsubscribe userJoin failure roomId[" + this._data.roomId + "]");
        }
    }

    public subscribeUserLeft(onUserLeft: Function): void {
        if (!this._data.roomId || typeof(this._data.roomId) !== "string") {
            logger("realtime", "error", "Subscribe userLeft failure. roomId is not setting.");
            return;
        }
        if (onUserLeft === undefined) {
            logger("realtime", "error", "Subscribe userLeft failure. Parameter invalid.");
            return;
        }
        if (!this._client.connection) {
            logger("realtime", "error", "Subscribe userLeft failure. Realtime connection is not setting.");
            return;
        }
        this._onUserLeft = onUserLeft;
        if (this._client.connection.sendEvent(this._data.roomId, "userLeft", "bind")) {
            this._client.connection.onUserLeft = (data: I.IMessage) => {
                let users = <I.IUserForRoom[]>data.payload;
                this._data.users = users;
                this._onUserLeft(users);
            };
            logger("realtime", "info", "Subscribe userLeft success roomId[" + this._data.roomId + "]");
        } else {
            logger("realtime", "error", "Subscribe userLeft failure roomId[" + this._data.roomId + "]");
        }
    }

    public unsubscribeUserLeft(): void {
        if (!this._data.roomId || typeof(this._data.roomId) !== "string") {
            logger("realtime", "error", "Unsubscribe userLeft failure. roomId is not setting.");
            return;
        }
        if (this._onUserLeft === undefined) {
            logger("realtime", "error", "Unsubscribe userLeft failure. onUserLeft is undefined.");
            return;
        }
        if (!this._client.connection) {
            logger("realtime", "error", "Subscribe userLeft failure. Realtime connection is not setting.");
            return;
        }
        this._onUserLeft = Function;
        if (this._client.connection.sendEvent(this._data.roomId, "userLeft", "unbind")) {
            logger("realtime", "info", "Unsubscribe userLeft success roomId[" + this._data.roomId + "]");
        } else {
            logger("realtime", "error", "Unsubscribe userLeft failure roomId[" + this._data.roomId + "]");
        }
    }
}
