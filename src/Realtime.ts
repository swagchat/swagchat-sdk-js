import { logger } from './utils';
import { EventName } from './const';
import * as I from './interface';

export class Realtime {
  conn: WebSocket;
  endpoint: string;
  userId: string;
  public onConnected: Function;
  public onError: Function;
  public onClosed: Function;

  public onEventHandlers: {[key: string]: {[key: string]: Function}}; // [eventName][funcName] = func;

  constructor(endpoint: string);
  constructor(endpoint: string, userId?: string);
  constructor(endpoint: string, userId?: string, onConnected?: Function);
  constructor(endpoint: string, userId?: string, onConnected?: Function, onError?: Function);
  constructor(endpoint: string, userId?: string, onConnected?: Function, onError?: Function, onClosed?: Function)
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
    if (this.userId === '') {
      logger('realtime', 'error', 'userId is empty');
      return;
    }

    const endpoint = this.endpoint + '/ws?userId=' + this.userId;
    if (typeof(WebSocket) !== 'undefined') {
      this.conn = new WebSocket(endpoint);
    } else {
      const WebSocketForNode =  require('ws');
      this.conn = new WebSocketForNode(endpoint);
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

      if (typeof(e.data) !== 'string') {
        return;
      }

      const dataList = (e.data as string).split('\n\n');
      dataList.forEach(data => {
        try {
          let message = JSON.parse(data) as I.IMessage;
          if (message.eventName) {
            const eventHandlers = this.onEventHandlers[message.eventName];
            const keys = Object.keys(eventHandlers);
            if (keys.length > 0) {
              keys.forEach((key: string) => {
                eventHandlers[key](message);
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    });

    Object.keys(this.onEventHandlers).forEach((eventName: string) => {
      Object.keys(this.onEventHandlers[eventName]).forEach((funcName) => {
        setTimeout(() => {
          this.sendEvent(eventName, funcName, 'subscribe');
        }, 2000);
      });
    });

    if (typeof(window) !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.close();
      }, false);
    }
  }

  public close() {
    this.conn.close();
  }

  public sendEvent(eventName: string, funcName: string, action: string): Boolean {
      if (this.conn.readyState === this.conn.OPEN) {
      try {
        this.conn.send(JSON.stringify({
          // roomId: roomId,
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

  public subscribe(eventName: EventName, funcName: string, func: Function): void {
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

      if (!this.sendEvent(eventName, funcName, 'subscribe')) {
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

    if (!this.sendEvent(eventName, funcName, 'unsubscribe')) {
      logger('realtime', 'error', 'Unsubscribe ' + eventName + ' failure funcName[' + funcName + '] userId[' + this.userId + ']');
    }

    if (this.onEventHandlers[eventName] && this.onEventHandlers[eventName][funcName]) {
      delete this.onEventHandlers[eventName][funcName];
    }

    logger('realtime', 'info', 'Unsubscribe ' + eventName + ' success funcName[' + funcName + '] userId[' + this.userId + ']');
  }
}
