import Realtime from "./Realtime";
import * as model from "./interface";
import "isomorphic-fetch";
export declare class Client {
    readonly apiKey: string;
    readonly apiEndpoint: string;
    connection: Realtime;
    constructor(config: model.IClientConfig);
    onConnected: Function;
    onError: Function;
    onClosed: Function;
    socketClose(): void;
    createUser(createUserObject: model.IUser): Promise<never>;
    getUsers(): Promise<never>;
    getUser(userId: string): Promise<never>;
    removeUser(userId: string): Promise<never>;
    createRoom(createRoomObject: model.IRoom): Promise<never>;
    getRooms(): Promise<never>;
    getRoom(roomId: string): Promise<never>;
    removeRoom(roomId: string): Promise<never>;
    createTextMessage(roomId: string, userId: string, text: string): model.IMessage;
    createCustomMessage(roomId: string, userId: string, payload: Object, type: string): model.IMessage;
}
