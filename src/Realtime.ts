import { logger } from './utils';
import { EventType } from './const';
import * as I from './interface';

export class Realtime {
  conn: WebSocket;
  endpoint: string;
  userId: string;
  public onConnected: Function;
  public onError: Function;
  public onClosed: Function;

  public onEventHandlers: {[key: string]: Function}[]; // [eventType][funcName] = func;

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

    this.onEventHandlers = new Array<{[key: string]: Function}>();
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

      const sendEventHandler = (dataString: string) => {
        if (dataString === '') {
          return;
        }

        const dataList = dataString.split('\n\n') as string[];
        dataList.forEach(data => {
          try {
            const eventDataObj = JSON.parse(data) as I.IEventData;
            if (eventDataObj.type !== EventType.MESSAGEEVENT && eventDataObj.type !== EventType.USERJOINEVENT) {
              return;
            }

            const buffer = new Buffer(eventDataObj.data as string, 'base64');
            const dataJson = buffer.toString('utf-8');
            const eventData = JSON.parse(dataJson);
            const eventHandlers = this.onEventHandlers[eventDataObj.type];
            if (!eventHandlers) {
              return;
            }

            const keys = Object.keys(eventHandlers);
            if (keys.length > 0) {
              keys.forEach((key: string) => {
                eventHandlers[key](eventData);
              });
            }
          } catch (ex) {
            console.log(ex);
          }
        });
      };

      let dataString = '';

      if (typeof(e.data) === 'string') {
        dataString = e.data;
      }

      if (typeof(e.data) === 'object') {
        try {
          if (e.data instanceof Blob) {
            const reader = new FileReader();
            reader.addEventListener('loadend', (e: ProgressEvent) => {
              dataString = (e.target as FileReader).result;
              sendEventHandler(dataString);
            });
            reader.readAsText(e.data);
          } else {
            const buf = new Uint8Array(e.data as Buffer).buffer;
            dataString = String.fromCharCode.apply(null, new Uint8Array(buf));
            sendEventHandler(dataString);
          }
        } catch (error) {
          const buf = new Uint8Array(e.data as Buffer).buffer;
          dataString = String.fromCharCode.apply(null, new Uint8Array(buf));
          sendEventHandler(dataString);
        }
      }
    });

    for (let eventType = 0; eventType < this.onEventHandlers.length; eventType++) {
      Object.keys(this.onEventHandlers[eventType]).forEach((funcName) => {
        setTimeout(() => {
          this.sendEvent(eventType, funcName, 'subscribe');
        }, 2000);
      });
    }

    if (typeof(window) !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.close();
      }, false);
    }
  }

  public close() {
    this.conn.close();
  }

  public sendEvent(eventType: EventType, funcName: string, action: string): Boolean {
    if (this.conn.readyState === this.conn.OPEN) {
      try {
        this.conn.send(JSON.stringify({
          // roomId: roomId,
          eventType: eventType,
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

  public subscribe(eventType: EventType, funcName: string, func: Function): void {
    if (eventType !== EventType.MESSAGEEVENT && eventType !== EventType.USERJOINEVENT) {
      logger('realtime', 'error', 'Subscribe failure. eventType is not setting.');
      return;
    }

    if (!funcName || typeof(funcName) !== 'string') {
      logger('realtime', 'error', 'Subscribe ' + eventType + ' failure. funcName is not setting.');
      return;
    }

    if (func === undefined) {
      logger('realtime', 'error', 'Subscribe ' + eventType + ' failure. function is undefined.');
      return;
    }

    if (this.conn.readyState !== this.conn.OPEN) {
      return;
    }

    if (!this.onEventHandlers[eventType]) {
      this.onEventHandlers[eventType] = {};
    }

    if (!(this.onEventHandlers[eventType] && this.onEventHandlers[eventType][funcName])) {

      if (!this.sendEvent(eventType, funcName, 'subscribe')) {
        logger('realtime', 'error', 'Subscribe ' + eventType + ' failure funcName[' + funcName + '] userId[' + this.userId + ']');
        return;
      }
      this.onEventHandlers[eventType][funcName] = func;
    }

    logger('realtime', 'info', 'Subscribe ' + eventType + ' success funcName[' + funcName + '] userId[' + this.userId + ']');
  }

  public unsubscribe(eventType: EventType, funcName: string): void {
    if (this.conn.readyState !== this.conn.OPEN) {
      return;
    }

    if (!this.sendEvent(eventType, funcName, 'unsubscribe')) {
      logger('realtime', 'error', 'Unsubscribe ' + eventType + ' failure funcName[' + funcName + '] userId[' + this.userId + ']');
    }

    if (this.onEventHandlers[eventType] && this.onEventHandlers[eventType][funcName]) {
      delete this.onEventHandlers[eventType][funcName];
    }

    logger('realtime', 'info', 'Unsubscribe ' + eventType + ' success funcName[' + funcName + '] userId[' + this.userId + ']');
  }
}
