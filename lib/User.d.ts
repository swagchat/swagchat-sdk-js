import * as model from "./interface";
import { Client } from "./Client";
import "isomorphic-fetch";
/**
 * User class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * user.name = "John";<br />
 * console.log(user.name);</code>
 */
export default class User {
    readonly _client: Client;
    private _data;
    constructor(option: model.IUserConfig);
    userId: string;
    name: string;
    pictureUrl: string;
    informationUrl: string;
    readonly unreadCount: number;
    isPublic: boolean;
    readonly accessToken: string;
    metaData: {
        [key: string]: string | number | boolean | Object;
    };
    readonly created: string;
    readonly modified: string;
    readonly rooms: model.IRoomForUser[];
    readonly devices: model.IDevice[];
    private _setDevice(platform, token);
    private _removeDevice(platform);
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
    setMetaData(key: string, value: string | number | boolean | Object): void;
    /**
     * Register a new iOS device token.
     *
     * @param token device token for iOS.
     */
    setDeviceIos(token: string): Promise<Response>;
    /**
     * Register a new Android device token.
     *
     * @param token device token for Android.
     */
    setDeviceAndroid(token: string): Promise<Response>;
    /**
     * Delete device token for iOS.
     */
    removeDeviceIos(): Promise<Response>;
    /**
     * Delete device token for Android.
     */
    removeDeviceAndroid(): Promise<Response>;
    /**
     * Update user information.
     * Please set the data of this object beforehand.
     */
    update(): Promise<Response>;
    /**
     * Refresh user information to the latest.
     * A different client might update an existing user's information while you use the application continuously.
     */
    reflesh(): Promise<Response>;
    /**
     * Send Message.
     * Please create message objects beforehand by using such as client.createTextMessage().
     * @param messages An array for message objects to send.
     */
    sendMessages(...messages: model.IMessage[]): Promise<Response>;
    /**
     * Reset the number of unread for room specified by parameters.
     * @param roomId Room ID
     */
    markAsRead(roomId: string): Promise<Response>;
    /**
     * Reset the number of unread for each room for the user.
     */
    markAllAsRead(): Promise<Response>;
}
