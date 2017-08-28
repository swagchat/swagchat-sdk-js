import { Realtime } from './';
import * as I from './interface';
import 'isomorphic-fetch';
export declare class Client {
    readonly apiKey: string;
    readonly apiSecret: string;
    readonly apiEndpoint: string;
    readonly userId: string;
    readonly userAccessToken: string;
    connection: Realtime;
    onConnected: Function;
    onError: Function;
    onClosed: Function;
    private getApiHeaders();
    constructor(params: I.IClientParams);
    socketClose(): void;
    createUser(createUserObject: I.IUser): Promise<I.IFetchUserResponse>;
    getUsers(): Promise<I.IFetchUsersResponse>;
    getUser(userId: string, accessToken?: string): Promise<I.IFetchUserResponse>;
    removeUser(userId: string): Promise<I.IErrorResponse>;
    createRoom(createRoomObject: I.IRoom): Promise<I.IFetchRoomResponse>;
    getRooms(): Promise<I.IFetchRoomsResponse>;
    getRoom(roomId: string): Promise<I.IFetchRoomResponse>;
    removeRoom(roomId: string): Promise<I.IErrorResponse>;
}
