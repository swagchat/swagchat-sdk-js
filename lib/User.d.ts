import 'isomorphic-fetch';
import { Client, Platform } from './';
import * as I from './interface';
/**
 * User class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * user.name = 'John';<br />
 * console.log(user.name);</code>
 */
export declare class User {
    readonly _client: Client;
    private _data;
    static auth(params: I.IAuthParams): Promise<I.IFetchUserResponse>;
    constructor(params: I.IUserParams);
    userId: string;
    name: string;
    pictureUrl: string;
    informationUrl: string;
    readonly unreadCount: number;
    isPublic: boolean;
    isCanBlock: boolean;
    isShowUsers: boolean;
    readonly accessToken: string;
    metaData: {
        [key: string]: string | number | boolean | Object;
    };
    readonly created: string;
    readonly modified: string;
    readonly rooms: I.IRoomForUser[];
    readonly devices: I.IDevice[];
    readonly blocks: string[];
    /**
     * Register a new device token.
     *
     * @param token device token.
     */
    setDevice(platform: Platform, token: string): Promise<I.IFetchUserDeviceResponse>;
    /**
     * Delete device token.
     */
    removeDevice(platform: Platform): Promise<I.IErrorResponse>;
    /**
     * Register metadata in separate.
     * An applied key will be added if metadata already exists. A value will be overwritten if an equivalent key exists.
     * Please use accessor if you will register by multiple keys in a lump. In this case, existing metadata will be overwritten.
     *
     * ex)<br />
     * <code>user.metaData = {'key1': 'value1', 'key2': 2, 'key3': true, 'key4': {'key5': 'value5'}};</code>
     * @param key Key for register.
     * @param value A value for key.
     */
    setMetaData(key: string, value: string | number | boolean | Object): void;
    /**
     * Update user information.
     * Please set the data of this object beforehand.
     */
    update(putUser: I.IUser): Promise<I.IFetchUserResponse>;
    /**
     * Refresh user information to the latest.
     * A different client might update an existing user's information while you use the application continuously.
     */
    reflesh(): Promise<I.IFetchUserResponse>;
    /**
     * Send Message.
     * Please create message objects beforehand by using such as client.createTextMessage().
     * @param messages An array for message objects to send.
     */
    sendMessages(...messages: I.IMessage[]): Promise<I.ISendMessagesResponse>;
    /**
     * Reset the number of unread for room specified by parameters.
     * @param roomId Room ID
     */
    markAsRead(roomId: string): Promise<I.IErrorResponse>;
    /**
     * Reset the number of unread for each room for the user.
     */
    markAllAsRead(): Promise<I.IErrorResponse>;
    /**
     * File upload.
     * @param file Image data.
     */
    fileUpload(file: Blob): Promise<I.IPostAssetResponse>;
    getContacts(): Promise<I.IFetchUsersResponse>;
    addBlockUsers(userIds: string[]): Promise<I.IFetchBlockUsersResponse>;
    removeBlockUsers(userIds: string[]): Promise<I.IFetchBlockUsersResponse>;
}
