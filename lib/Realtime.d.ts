export declare class Realtime {
    conn: WebSocket;
    endpoint: string;
    userId: string;
    websocket: any;
    subMsgRoomIds: {
        [key: string]: boolean;
    } | null;
    subUserJoinedRoomIds: {
        [key: string]: boolean;
    } | null;
    subUserLeftRoomIds: {
        [key: string]: boolean;
    } | null;
    onConnected: Function;
    onError: Function;
    onClosed: Function;
    onMessageReceived: Function | null;
    onUserJoined: Function | null;
    onUserLeft: Function | null;
    constructor(endpoint: string, userId: string);
    connect(): void;
    close(): void;
    sendEvent(roomId: string, eventName: string, action: string): Boolean;
    subscribeMessage(onMessageReceived: Function, roomId: string): void;
    unsubscribeMessage(roomId: string): void;
    subscribeUserJoin(onUserJoined: Function, roomId: string): void;
    unsubscribeUserJoin(roomId: string): void;
    subscribeUserLeft(onUserLeft: Function, roomId: string): void;
    unsubscribeUserLeft(roomId: string): void;
}
