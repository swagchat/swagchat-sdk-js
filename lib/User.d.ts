import * as model from "./interface";
import { Client } from "./Client";
import "isomorphic-fetch";
export default class User {
    readonly _client: Client;
    private _data;
    constructor(option: model.IUserConfig);
    userId: string;
    name: string;
    pictureUrl: string;
    informationUrl: string;
    readonly unreadCount: number;
    metaData: {
        [key: string]: string | number | boolean | Object;
    };
    readonly created: number;
    readonly modified: number;
    readonly rooms: model.IRoomForUser[];
    readonly devices: model.IDevice[];
    private _setDevice(platform, token);
    private _removeDevice(platform);
    setMetaData(key: string, value: string | number | boolean | Object): void;
    setDeviceIos(token: string): Promise<Response>;
    setDeviceAndroid(token: string): Promise<Response>;
    removeDeviceIos(): Promise<Response>;
    removeDeviceAndroid(): Promise<Response>;
    update(): Promise<Response>;
    reflesh(): Promise<Response>;
    sendMessages(...messages: model.IMessage[]): Promise<Response>;
    markAsRead(roomId: string): Promise<Response>;
    markAllAsRead(): Promise<Response>;
}
