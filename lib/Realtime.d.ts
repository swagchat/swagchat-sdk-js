export declare class Realtime {
    conn: WebSocket;
    endpoint: string;
    userId: string;
    websocket: any;
    onConnected: Function;
    onError: Function;
    onClosed: Function;
    onMessageReceived: Function;
    onUserJoined: Function;
    onUserLeft: Function;
    constructor(endpoint: string, userId: string);
    connect(): void;
    close(): void;
    sendEvent(roomId: string, eventName: string, action: string): Boolean;
}
