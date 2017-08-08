import { isBrowser, logger } from "./";
import * as I from "./interface";

export class Realtime {
    conn: WebSocket;
    endpoint: string;
    userId: string;
    websocket = isBrowser ? WebSocket : require("ws");
    public onConnected: Function;
    public onError: Function;
    public onClosed: Function;
    public onMessageReceived: Function;
    public onUserJoined: Function;
    public onUserLeft: Function;

    constructor(endpoint: string, userId: string) {
        logger("realtime", "info", "Connecting Realtime Server...");

        this.endpoint = endpoint;
        this.userId = userId;
        this.connect();
    }

    public connect() {
        this.conn = new this.websocket(this.endpoint + "?userId=" + this.userId);
        this.conn.addEventListener("open", (e: Event) => {
            logger("realtime", "info", "Connecting Realtime Server OK");
            console.log(e);
            if (this.onConnected) {
                this.onConnected(<WebSocket>e.target);
            }
        });
        this.conn.addEventListener("error", (e: Event) => {
            logger("realtime", "error", "Connecting Realtime Server ERROR");
            console.log(e);
            if (this.onError) {
                this.onError(<WebSocket>e.target);
            }
        });
        this.conn.addEventListener("close", (e: I.ICloseEvent) => {
            logger("realtime", "info", "Connecting Realtime Server CLOSE");
            console.log(e);
            if (this.onClosed) {
                this.onClosed(e.code, e.reason);
            }
            let self = this;
            setTimeout(function() {
                self.connect();
            }, 3000);
        });
        this.conn.addEventListener("message", (e: I.IMessageEvent) => {
            let message = <I.IMessage>JSON.parse(<string>e.data);
            switch (message.eventName) {
            case "message":
                if (this.onMessageReceived) {
                    this.onMessageReceived(message);
                }
                break;
            case "userJoin":
                if (this.onUserJoined) {
                    this.onUserJoined(message);
                }
                break;
            case "userLeft":
                if (this.onUserLeft) {
                    this.onUserLeft(message);
                }
                break;
            }
        });
        if (window) {
            window.addEventListener("beforeunload", () => {
                this.close();
            }, false);
        }
    }

    public close() {
        this.conn.close();
    }

    public sendEvent(roomId: string, eventName: string, action: string): Boolean {
        if (this.conn.readyState === this.conn.OPEN) {
            try {
                this.conn.send(JSON.stringify({
                    roomId: roomId,
                    eventName: eventName,
                    action: action
                }));
            } catch (ex) {
                logger("realtime", "error", "Failure send event.");
                console.log(ex);
                return false;
            }
            return true;
        } else {
            logger("realtime", "error", "ReadyState is not open. Retry after 3 seconds.");
            let self = this;
            setTimeout(function() {
                self.sendEvent(roomId, eventName, action);
            }, 3000);
            return false;
        }
    }
}
