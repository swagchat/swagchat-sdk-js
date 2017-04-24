import * as model from "./interface";
import "isomorphic-fetch";
/**
 * Room xxxxxxxxxxxx.
 */
export default class Room {
    private _client;
    private _data;
    private _onMessageReceived;
    private _onUserJoined;
    private _onUserLeft;
    /**
     * constructor xxxxxxxxxxxx.
     */
    constructor(option: model.IRoomConfig);
    roomId: string;
    name: string;
    pictureUrl: string | undefined;
    informationUrl: string | undefined;
    readonly metaData: Object | undefined;
    isPublic: boolean;
    readonly created: number;
    readonly modified: number;
    readonly users: model.IUserForRoom[];
    setMetaData(key: string, value: string | number | boolean): void;
    getMetaData(key: string): (string | number | boolean);
    /**
     * Updating user item.
     *
     * @param userObj xxxxxxx.
     * @returns yyyyyyyy.
     */
    update(): Promise<never>;
    setUsers(userIds: string[]): Promise<never>;
    addUsers(userIds: string[]): Promise<never>;
    removeUsers(userIds: string[]): Promise<never>;
    reflesh(): Promise<never>;
    getMessages(queryParams: {
        [key: string]: string;
    }): Promise<never>;
    subscribeMessage(onMessageReceived: Function): void;
    unsubscribeMessage(): void;
    subscribeUserJoin(onUserJoined: Function): void;
    unsubscribeUserJoin(): void;
    subscribeUserLeft(onUserLeft: Function): void;
    unsubscribeUserLeft(): void;
}
