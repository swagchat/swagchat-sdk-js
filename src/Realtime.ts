import { logger, EventName } from './';
import * as I from './interface';

export class Realtime {
  conn: WebSocket;
  endpoint: string;
  userId: string;
  websocket = WebSocket;
  public onConnected: Function;
  public onError: Function;
  public onClosed: Function;

  public onEventHandlers: {[key: string]: {[key: string]: Function}}; // [eventName][funcName] = func;

  constructor(endpoint: string);
  constructor(endpoint: string, userId?: string);
  constructor(endpoint: string, userId?: string, onConnected?: Function);
  constructor(endpoint: string, userId?: string, onConnected?: Function, onError?: Function);
  constructor(endpoint: string, userId?: string, onConnected?: Function, onError?: Function, onClosed?: Function) {
      logger('realtime', 'info', 'Connecting Realtime Server...');

    this.endpoint = endpoint;

    if (userId) {
      this.userId = userId;
    }

    if (onConnected) {
      this.onConnected = onConnected;
    }

    if (onError) {
      this.onError = onError;
    }

    if (onClosed) {
      this.onClosed = onClosed;
    }

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
      if (!e.data) {
        return;
      }
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

    Object.keys(this.onEventHandlers).forEach((eventName: string) => {
      Object.keys(this.onEventHandlers[eventName]).forEach((funcName) => {
        setTimeout(() => {
          this.sendEvent(eventName, funcName, 'subscribe', '');
        }, 2000);
      });
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

  public sendEvent(eventName: string, funcName: string, action: string, roomId: string): Boolean {
      if (this.conn.readyState === this.conn.OPEN) {
      try {
        this.conn.send(JSON.stringify({
          roomId: roomId,
          eventName: eventName,
          funcName: funcName,
          action: action
        }));
      } catch (ex) {
        logger('realtime', 'error', 'Failure send event.');
        console.log(ex);
        return false;
      }
      return true;
    } else {
      logger('realtime', 'error', 'Failure send event. Still not connecting...');
    }
    return false;
  }

  public subscribe(eventName: EventName, funcName: string, func: Function, roomId: string): void {
    if (!eventName || typeof(eventName) !== 'string') {
      logger('realtime', 'error', 'Subscribe failure. eventName is not setting.');
      return;
    }

    if (!funcName || typeof(funcName) !== 'string') {
      logger('realtime', 'error', 'Subscribe ' + eventName + ' failure. funcName is not setting.');
      return;
    }

    if (func === undefined) {
      logger('realtime', 'error', 'Subscribe ' + eventName + ' failure. function is undefined.');
      return;
    }

    if (this.conn.readyState !== this.conn.OPEN) {
      return;
    }

    if (!this.onEventHandlers[eventName]) {
      this.onEventHandlers[eventName] = {};
    }

    if (!(this.onEventHandlers[eventName] && this.onEventHandlers[eventName][funcName])) {

      if (!this.sendEvent(eventName, funcName, 'subscribe', roomId)) {
        logger('realtime', 'error', 'Subscribe ' + eventName + ' failure funcName[' + funcName + '] userId[' + this.userId + ']');
        return;
      }
      this.onEventHandlers[eventName][funcName] = func;
    }

    logger('realtime', 'info', 'Subscribe ' + eventName + ' success funcName[' + funcName + '] userId[' + this.userId + ']');
  }

  public unsubscribe(eventName: EventName, funcName: string): void {
    if (this.conn.readyState !== this.conn.OPEN) {
      return;
    }

    if (!this.sendEvent(eventName, funcName, 'unsubscribe', '')) {
      logger('realtime', 'error', 'Unsubscribe ' + eventName + ' failure funcName[' + funcName + '] userId[' + this.userId + ']');
    }

    if (this.onEventHandlers[eventName] && this.onEventHandlers[eventName][funcName]) {
      delete this.onEventHandlers[eventName][funcName];
    }

    logger('realtime', 'info', 'Unsubscribe ' + eventName + ' success funcName[' + funcName + '] userId[' + this.userId + ']');
  }
}
