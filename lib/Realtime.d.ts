export declare class Realtime {
    readonly conn: WebSocket;
    onConnected: Function;
    onError: Function;
    onClosed: Function;
    onMessageReceived: Function;
    onUserJoined: Function;
    onUserLeft: Function;
    constructor(endpoint: string);
    close(): void;
    sendEvent(roomId: string, eventName: string, action: string): Boolean;
}
