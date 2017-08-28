import 'isomorphic-fetch';
import * as I from './interface';
/**
 * Room class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * room.name = 'John's Room';<br />
 * console.log(room.name);</code>
 */
export declare class Room {
    private _client;
    private _data;
    constructor(params: I.IRoomParams);
    onMessageReceived: Function;
    readonly roomId: string;
    userId: string;
    name: string;
    pictureUrl: string;
    informationUrl: string;
    metaData: {
        [key: string]: string | number | boolean | Object;
    };
    readonly availableMessageTypes: string[] | null;
    type: number;
    readonly lastMessage: string;
    readonly lastMessageUpdated: string;
    readonly messageCount: number;
    isCanLeft: boolean;
    isShowUsers: boolean;
    readonly created: string;
    readonly modified: string;
    readonly users: I.IUserForRoom[] | null;
    readonly userIds: string[];
    /**
     * Register metadata in separate.
     * An applied key will be added if metadata already exists. A value will be overwritten if an equivalent key exists.
     * Please use accessor if you will register by multiple keys in a lump. In this case, existing metadata will be overwritten.
     *
     * ex)<br />
     * <code>room.metaData = {'key1': 'value1', 'key2': 2, 'key3': true, 'key4': {'key5': 'value5'}};</code>
     * @param key Key for register.
     * @param value A value for key.
     */
    setMetaData(key: string, value: string | number | boolean | Object): void;
    /**
     * Update room information.
     * Please set the data of this object beforehand.
     */
    update(putRoom: I.IRoom): Promise<I.IFetchRoomResponse>;
    addUsers(userIds: string[]): Promise<I.IFetchRoomUsersResponse>;
    removeUsers(userIds: string[]): Promise<I.IFetchRoomUsersResponse>;
    reflesh(): Promise<I.IFetchRoomResponse>;
    getMessages(queryParams: {
        [key: string]: string | number;
    }): Promise<I.IFetchMessagesResponse>;
    subscribeMessage(onMessageReceived: Function): void;
    unsubscribeMessage(): void;
    subscribeUserJoin(onUserJoined: Function): void;
    unsubscribeUserJoin(): void;
    subscribeUserLeft(onUserLeft: Function): void;
    unsubscribeUserLeft(): void;
}
