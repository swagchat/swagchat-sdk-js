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
    createUser(createUserObject: model.IUser): Promise<Response>;
    getUsers(): Promise<Response>;
    getUser(userId: string): Promise<Response>;
    removeUser(userId: string): Promise<Response>;
    createRoom(createRoomObject: model.IRoom): Promise<Response>;
    getRooms(): Promise<Response>;
    getRoom(roomId: string): Promise<Response>;
    removeRoom(roomId: string): Promise<Response>;
    createTextMessage(roomId: string, userId: string, text: string): model.IMessage;
    createCustomMessage(roomId: string, userId: string, payload: Object, type: string): model.IMessage;
}
