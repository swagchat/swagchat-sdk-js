import * as model from "./interface";
import "isomorphic-fetch";
export default class Room {
    private _client;
    private _data;
    private _onMessageReceived;
    private _onUserJoined;
    private _onUserLeft;
    constructor(option: model.IRoomConfig);
    roomId: string;
    name: string;
    pictureUrl: string;
    informationUrl: string;
    metaData: {
        [key: string]: string | number | boolean | Object;
    };
    isPublic: boolean;
    readonly created: number;
    readonly modified: number;
    readonly users: model.IUserForRoom[];
    setMetaData(key: string, value: string | number | boolean | Object): void;
    update(): Promise<Response>;
    setUsers(userIds: string[]): Promise<never>;
    addUsers(userIds: string[]): Promise<never>;
    removeUsers(userIds: string[]): Promise<never>;
    reflesh(): Promise<Response>;
    getMessages(queryParams: {
        [key: string]: string;
    }): Promise<Response>;
    subscribeMessage(onMessageReceived: Function): void;
    unsubscribeMessage(): void;
    subscribeUserJoin(onUserJoined: Function): void;
    unsubscribeUserJoin(): void;
    subscribeUserLeft(onUserLeft: Function): void;
    unsubscribeUserLeft(): void;
}
