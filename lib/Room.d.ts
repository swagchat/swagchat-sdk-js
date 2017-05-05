import * as model from "./interface";
import "isomorphic-fetch";
/**
 * Room class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * room.name = "John's Room";<br />
 * console.log(room.name);</code>
 */
export default class Room {
    private _client;
    private _data;
    private _onMessageReceived;
    private _onUserJoined;
    private _onUserLeft;
    constructor(option: model.IRoomConfig);
    readonly roomId: string;
    userId: string;
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
    setMetaData(key: string, value: string | number | boolean | Object): void;
    /**
     * Update room information.
     * Please set the data of this object beforehand.
     */
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
