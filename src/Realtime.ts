import { logger, EventName } from './';
import * as I from './interface';

export class Realtime {
  conn: WebSocket;
  endpoint: string;
  userId: string;
  websocket = WebSocket;
  // subMsgRoomIds: {[key: string]: boolean} | null;
  // subUserJoinedRoomIds: {[key: string]: boolean} | null;
  // subUserLeftRoomIds: {[key: string]: boolean} | null;
  public onConnected: Function;
  public onError: Function;
  public onClosed: Function;

  // Chat
  public onEventHandlers: {[key: string]: {[key: string]: Function}};

  constructor(endpoint: string, userId: string | undefined) {
    logger('realtime', 'info', 'Connecting Realtime Server...');

    this.endpoint = endpoint;
    userId ? this.userId = userId : null;
    this.onEventHandlers = {};
    this.connect();
  }

  public connect() {
    if (this.userId) {
      this.conn = new this.websocket(this.endpoint + '/ws?userId=' + this.userId);
    } else {
      this.conn = new this.websocket(this.endpoint);
    }

    this.conn.addEventListener('open', (e: Event) => {
      logger('realtime', 'info', 'Connecting Realtime Server OK');

      if (this.onConnected) {
        this.onConnected(<WebSocket>e.target);
      }
    });

    this.conn.addEventListener('error', (e: Event) => {
      logger('realtime', 'error', 'Connecting Realtime Server ERROR');

      if (this.onError) {
        this.onError(<WebSocket>e.target);
      }
    });

    this.conn.addEventListener('close', (e: I.ICloseEvent) => {
      logger('realtime', 'error', 'Connecting Realtime Server CLOSE');

      if (this.onClosed) {
        this.onClosed(e.code, e.reason);
      }

      setTimeout(() => {
        logger('realtime', 'error', 'Connecting Realtime Server after 3 seconds...');
        this.connect();
      }, 3000);
    });

    this.conn.addEventListener('message', (e: I.IMessageEvent) => {
      let message = <I.IMessage>JSON.parse(<string>e.data);
      if (message.eventName) {
        const eventHandlers = this.onEventHandlers[message.eventName];
        const keys = Object.keys(eventHandlers);
        if (keys.length > 0) {
          keys.forEach((key: string) => {
            eventHandlers[key](message);
          });
        }
      }
    });

    if (window) {
      window.addEventListener('beforeunload', () => {
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
        logger('realtime', 'error', 'Failure send event.');
        console.log(ex);
        return false;
      }
    }
    return true;
  }

  public subscribe(eventName: EventName, funcName: string, func: Function, userId: string): void {
    if (!eventName || typeof(eventName) !== 'string') {
      logger('realtime', 'error', 'Subscribe failure. eventName is not setting.');
      return;
    }

    if (!funcName || typeof(funcName) !== 'string') {
      logger('realtime', 'error', 'Subscribe ' + eventName + 'failure. funcName is not setting.');
      return;
    }

    if (func === undefined) {
      logger('realtime', 'error', 'Subscribe ' + eventName + 'failure. function is undefined.');
      return;
    }

    if (!userId || typeof(userId) !== 'string') {
      logger('realtime', 'error', 'Subscribe ' + eventName + 'failure. userId is not setting.');
      return;
    }

    if (this.conn.readyState !== this.conn.OPEN) {
      return;
    }

    if (!this.sendEvent(userId, eventName, 'subscribe')) {
      logger('realtime', 'error', 'Subscribe ' + eventName + ' failure funcName[' + funcName + '] userId[' + userId + ']');
      return;
    }

    if (!this.onEventHandlers[eventName]) {
      this.onEventHandlers[eventName] = {};
    }

    this.onEventHandlers[eventName][funcName] = func;
    logger('realtime', 'info', 'Subscribe ' + eventName + 'success funcName[' + funcName + '] userId[' + userId + ']');
  }

  public unsubscribe(eventName: EventName, funcName: string, userId: string): void {
    if (this.conn.readyState !== this.conn.OPEN) {
      return;
    }

    if (!this.sendEvent(userId, eventName, 'unsubscribe')) {
      logger('realtime', 'error', 'Unsubscribe ' + eventName + 'failure funcName[' + funcName + '] userId[' + userId + ']');
    }

    if (this.onEventHandlers[eventName] && this.onEventHandlers[eventName][funcName]) {
      delete this.onEventHandlers[eventName][funcName];
    }

    logger('realtime', 'info', 'Unsubscribe ' + eventName + 'success funcName[' + funcName + '] userId[' + userId + ']');
  }
}
