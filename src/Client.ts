import { Realtime, User, Room } from "./";
import * as I from "./interface";
import { logger } from "./util";

import "isomorphic-fetch";

export class Client {
    readonly apiKey: string;
    readonly apiSecret: string;
    readonly apiEndpoint: string;
    readonly userAccessToken: string;
    public connection: Realtime;

    set onConnected(callback: Function) {
        this.connection.onConnected = callback;
    }

    set onError(callback: Function) {
        this.connection.onError = callback;
    }

    set onClosed(callback: Function) {
        this.connection.onClosed = callback;
    }

    private getApiHeaders(): {
            "X-SwagChat-Api-Key": string;
            "X-SwagChat-Api-Secret": string;
            "Content-Type"?: string;
        } {
        return {
            "X-SwagChat-Api-Key": this.apiKey,
            "X-SwagChat-Api-Secret": this.apiSecret,
        };
    }

    constructor(params: I.IClientParams) {
        logger("api", "info", "Initializing API Client...");
        this.apiKey = params.apiKey;
        this.apiSecret = params.apiSecret || "";
        this.apiEndpoint = params.apiEndpoint;
        this.userAccessToken = params.userAccessToken || "";
        if (params.hasOwnProperty("realtime") && params.realtime!.hasOwnProperty("endpoint") && params.realtime!.endpoint !== "") {
            const realtimeConfig = <I.IRealtimeConfig>params.realtime;
            this.connection = new Realtime(realtimeConfig.endpoint);
        }

        logger("api", "info", "Initialized API Client OK");
    }

    public socketClose() {
        this.connection.close();
    }

    public createUser(createUserObject: I.IUser): Promise<I.IFetchUserResponse> {
        let headers = this.getApiHeaders();
        headers["Content-Type"] = "application/json";
        const self = this;
        return fetch(this.apiEndpoint + "/users", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(createUserObject)
        }).then((response: Response) => {
            if (response.status === 201) {
                return response.json().then((user) => {
                    return (
                        {
                            user: new User({
                                client: self,
                                data: <I.IUser>user,
                            }),
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

    public getUsers(): Promise<I.IFetchUsersResponse> {
        return fetch(this.apiEndpoint + "/users", {
            method: "GET",
            headers: this.getApiHeaders(),
        }).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then((users) => {
                    return (
                        {
                            users: <I.IUser[]>users,
                            error: null,
                        } as I.IFetchUsersResponse
                    );
                });
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            users: null,
                            error: <I.IProblemDetail>json,
                        } as I.IFetchUsersResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                users: null,
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IFetchUsersResponse;
        });
    }

    public getUser(userId: string, accessToken?: string): Promise<I.IFetchUserResponse> {
        const self = this;
        return fetch(this.apiEndpoint + "/users/" + userId, {
            method: "GET",
            headers: this.getApiHeaders(),
        }).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then((user) => {
                    user.accessToken = accessToken || "";
                    return (
                        {
                            user: new User({
                                client: self,
                                data: <I.IUser>user,
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

    public removeUser(userId: string): Promise<I.IErrorResponse> {
        let headers = this.getApiHeaders();
        headers["Content-Type"] = "application/json";
        return fetch(this.apiEndpoint + "/users/" + userId, {
            method: "DELETE",
            headers: headers,
        }).then((response: Response) => {
            if (response.status === 204) {
                return {
                    error: null,
                } as I.IErrorResponse;
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

    public createRoom(createRoomObject: I.IRoom): Promise<I.IFetchRoomResponse> {
        let headers = this.getApiHeaders();
        headers["Content-Type"] = "application/json";
        const self = this;
        return fetch(this.apiEndpoint + "/rooms", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(createRoomObject)
        }).then((response: Response) => {
            if (response.status === 201) {
                return response.json().then((room) => {
                    return (
                        {
                            room: new Room({
                                client: self,
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

    public getRooms(): Promise<I.IFetchRoomsResponse> {
        return fetch(this.apiEndpoint + "/rooms", {
            method: "GET",
            headers: this.getApiHeaders(),
        }).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then((rooms) => {
                    return (
                        {
                            rooms: <I.IRoom[]>rooms,
                            error: null,
                        } as I.IFetchRoomsResponse
                    );
                });
            } else {
                return response.json().then((json) => {
                    return (
                        {
                            rooms: null,
                            error: <I.IProblemDetail>json,
                        } as I.IFetchRoomsResponse
                    );
                });
            }
        }).catch((error) => {
            return {
                rooms: null,
                error: {
                    title: error.message,
                } as I.IProblemDetail,
            } as I.IFetchRoomsResponse;
        });
    }

    public getRoom(roomId: string): Promise<I.IFetchRoomResponse> {
        const self = this;
        return fetch(this.apiEndpoint + "/rooms/" + roomId, {
            method: "GET",
            headers: this.getApiHeaders(),
        }).then((response: Response) => {
            if (response.status === 200) {
                return response.json().then((room) => {
                    return (
                        {
                            room: new Room({
                                client: self,
                                data: <I.IRoom>room
                            }),
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

    public removeRoom(roomId: string): Promise<I.IErrorResponse> {
        let headers = this.getApiHeaders();
        headers["Content-Type"] = "application/json";
        return fetch(this.apiEndpoint + "/rooms/" + roomId, {
            method: "DELETE",
            headers: headers,
        }).then((response: Response) => {
            if (response.status === 204) {
                return {
                    error: null,
                } as I.IErrorResponse;
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
}
