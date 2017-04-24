import * as model from "./interface";
import { Client } from "./Client";
import "isomorphic-fetch";
/**
 * User xxxxxxxxxxxx.
 */
export default class User {
    readonly _client: Client;
    private _data;
    /**
     * constructor xxxxxxxxxxxx.
     */
    constructor(option: model.IUserConfig);
    userId: string;
    name: string;
    pictureUrl: string | undefined;
    informationUrl: string | undefined;
    readonly unreadCount: number;
    readonly metaData: Object;
    readonly created: number;
    readonly modified: number;
    readonly rooms: model.IRoomForUser[];
    private _setDevice(platform, token);
    private _updateDevice(platform, token);
    private _removeDevice(platform);
    setMetaData(key: string, value: string | number | boolean): void;
    getMetaData(key: string): (string | number | boolean);
    setDeviceIos(token: string): Promise<never>;
    setDeviceAndroid(token: string): Promise<never>;
    updateDeviceIos(token: string): Promise<never>;
    updateDeviceAndroid(token: string): Promise<never>;
    removeDeviceIos(): Promise<never>;
    removeDeviceAndroid(): Promise<never>;
    /**
     * Updating user item.
     *
     * @param userObj xxxxxxx.
     * @returns yyyyyyyy.
     */
    update(): Promise<never>;
    reflesh(): Promise<never>;
    sendMessages(...messages: model.IMessage[]): Promise<never>;
    markAsRead(roomId: string): Promise<never>;
    markAllAsRead(): Promise<never>;
}
