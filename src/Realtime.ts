import { isBrowser } from "./const";
import * as model from "./interface";

export default class Realtime {
    readonly conn: WebSocket;

    public onConnected: Function;
    public onError: Function;
    public onClosed: Function;
    public onMessageReceived: Function;
    public onUserJoined: Function;
    public onUserLeft: Function;

    constructor(endpoint: string) {
        console.info("Connection Swagchat Realtime Server...");

        let websocket = isBrowser ? WebSocket : require("ws");
        this.conn = new websocket(endpoint);
        this.conn.addEventListener("open", (e: Event) => {
            this.onConnected(<WebSocket>e.target);
        });
        this.conn.addEventListener("error", (e: Event) => {
            this.onError(<WebSocket>e.target);
        });
        this.conn.addEventListener("close", (e: model.ICloseEvent) => {
            this.onClosed(e.code, e.reason);
        });
        this.conn.addEventListener("message", (e: model.IMessageEvent) => {
            let message = <model.IMessage>JSON.parse(<string>e.data);
            switch (message.eventName) {
            case "message":
                this.onMessageReceived(message);
                break;
            case "userJoin":
                this.onUserJoined(message);
                break;
            case "userLeft":
                this.onUserLeft(message);
                break;
            }
        });
    }

    public close() {
        this.conn.close();
    }

    public sendEvent(roomId: string, eventName: string, action: string): Boolean {
        if (this.conn.readyState !== this.conn.OPEN) {
            return false;
        }
        try {
            this.conn.send(JSON.stringify({
                roomId: roomId,
                eventName: eventName,
                action: action
            }));
        } catch (ex) {
            return false;
        }
        return true;
    }
}
