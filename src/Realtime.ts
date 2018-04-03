import { logger } from './';
import * as I from './interface';

export class Realtime {
  conn: WebSocket;
  endpoint: string;
  userId: string;
  websocket = WebSocket;
  subMsgRoomIds: {[key: string]: boolean} | null;
  subUserJoinedRoomIds: {[key: string]: boolean} | null;
  subUserLeftRoomIds: {[key: string]: boolean} | null;
  public onConnected: Function;
  public onError: Function;
  public onClosed: Function;
  public onMessageReceived: Function | null;
  public onUserJoined: Function | null;
  public onUserLeft: Function | null;
  public onSpeech2Text: Function | null;

  constructor(endpoint: string, userId: string | null) {
    logger('realtime', 'info', 'Connecting Realtime Server...');

    this.endpoint = endpoint;
    userId ? this.userId = userId : null;
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

      if (this.subMsgRoomIds) {
        let subMsgRoomIds = Object.keys(this.subMsgRoomIds);
        for (let i = 0; i < subMsgRoomIds.length; i++) {
          let subMsgRoomId = subMsgRoomIds[i];
          if (this.onMessageReceived && this.subMsgRoomIds && !this.subMsgRoomIds[subMsgRoomId]) {
            if (this.sendEvent(subMsgRoomId, 'message', 'bind')) {
              this.subMsgRoomIds[subMsgRoomId] = true;
            }
          }
        }
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

      if (this.subMsgRoomIds) {
        let subMsgRoomIds = Object.keys(this.subMsgRoomIds);
        for (let i = 0; i < subMsgRoomIds.length; i++) {
          let subMsgRoomId = subMsgRoomIds[i];
          this.subMsgRoomIds[subMsgRoomId] = false;
        }
      }

      setTimeout(() => {
        logger('realtime', 'error', 'Connecting Realtime Server after 3 seconds...');
        this.connect();
      }, 3000);
    });
    this.conn.addEventListener('message', (e: I.IMessageEvent) => {
      let message = <I.IMessage>JSON.parse(<string>e.data);
      switch (message.eventName) {
      case 'message':
        if (this.onMessageReceived) {
          this.onMessageReceived(message);
        }
        break;
      case 'userJoin':
        if (this.onUserJoined) {
          this.onUserJoined(message);
        }
        break;
      case 'userLeft':
        if (this.onUserLeft) {
          this.onUserLeft(message);
        }
        break;
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

  public subscribeMessage(onMessageReceived: Function, roomId: string): void {
    if (!roomId || typeof(roomId) !== 'string') {
      logger('realtime', 'error', 'Subscribe message failure. roomId is not setting.');
      return;
    }
    if (onMessageReceived === undefined) {
      logger('realtime', 'error', 'Subscribe message failure. onMessageReceived is undefined.');
      return;
    }

    if (!this.subMsgRoomIds) {
      this.subMsgRoomIds = {[roomId]: false};
    } else {
      this.subMsgRoomIds = Object.assign(
        this.subMsgRoomIds,
        {[roomId]: false},
      );
    }

    if (this.conn.readyState === this.conn.OPEN) {
      if (this.sendEvent(roomId, 'message', 'bind')) {
        this.onMessageReceived = onMessageReceived;
        logger('realtime', 'info', 'Subscribe message success roomId[' + roomId + ']');
        this.subMsgRoomIds[roomId] = true;
      } else {
        logger('realtime', 'error', 'Subscribe message failure roomId[' + roomId + ']');
      }
    }
  }

  public unsubscribeMessage(roomId: string): void {
    if (this.conn.readyState === this.conn.OPEN) {
      if (this.sendEvent(roomId, 'message', 'unbind')) {
        this.onMessageReceived = null;
        logger('realtime', 'info', 'Unsubscribe message success roomId[' + roomId + ']');
        if (this.subMsgRoomIds !== undefined && this.subMsgRoomIds![roomId] === undefined) {
          this.subMsgRoomIds![roomId] = false;
        }
      } else {
        logger('realtime', 'error', 'Unsubscribe message failure roomId[' + roomId + ']');
      }
    }
  }

  public subscribeUserJoin(onUserJoined: Function, roomId: string): void {
    if (!roomId || typeof(roomId) !== 'string') {
      logger('realtime', 'error', 'Subscribe userJoin failure. roomId is not setting.');
      return;
    }
    if (onUserJoined === undefined) {
      logger('realtime', 'error', 'Subscribe userJoin failure. onUserJoined is undefined.');
      return;
    }

    if (!this.subUserJoinedRoomIds) {
      this.subUserJoinedRoomIds = {[roomId]: false};
    } else {
      this.subUserJoinedRoomIds = Object.assign(
        this.subUserJoinedRoomIds,
        {[roomId]: false},
      );
    }

    if (this.conn.readyState === this.conn.OPEN) {
      if (this.sendEvent(roomId, 'userJoin', 'bind')) {
        this.onUserJoined = onUserJoined;
        logger('realtime', 'info', 'Subscribe userJoin success roomId[' + roomId + ']');
        this.subUserJoinedRoomIds[roomId] = true;
      } else {
        logger('realtime', 'error', 'Subscribe userJoin failure roomId[' + roomId + ']');
      }
    }
  }

  public unsubscribeUserJoin(roomId: string): void {
    if (this.conn.readyState === this.conn.OPEN) {
      if (this.sendEvent(roomId, 'userJoin', 'unbind')) {
        this.onUserJoined = null;
        logger('realtime', 'info', 'Unsubscribe userJoin success roomId[' + roomId + ']');
        this.subUserJoinedRoomIds![roomId] = false;
      } else {
        logger('realtime', 'error', 'Unsubscribe userJoin failure roomId[' + roomId + ']');
      }
    }
  }

  public subscribeUserLeft(onUserLeft: Function, roomId: string): void {
    if (!roomId || typeof(roomId) !== 'string') {
      logger('realtime', 'error', 'Subscribe userLeft failure. roomId is not setting.');
      return;
    }
    if (onUserLeft === undefined) {
      logger('realtime', 'error', 'Subscribe userLeft failure. Parameter invalid.');
      return;
    }

    if (!this.subUserLeftRoomIds) {
      this.subUserLeftRoomIds = {[roomId]: false};
    } else {
      this.subUserLeftRoomIds = Object.assign(
        this.subUserLeftRoomIds,
        {[roomId]: false},
      );
    }

    if (this.conn.readyState === this.conn.OPEN) {
      if (this.sendEvent(roomId, 'userLeft', 'bind')) {
        this.onUserLeft = onUserLeft;
        logger('realtime', 'info', 'Subscribe userLeft success roomId[' + roomId + ']');
        this.subUserLeftRoomIds[roomId] = true;
      } else {
        logger('realtime', 'error', 'Subscribe userLeft failure roomId[' + roomId + ']');
      }
    }
  }

  public unsubscribeUserLeft(roomId: string): void {
    if (this.conn.readyState === this.conn.OPEN) {
      if (this.sendEvent(roomId, 'userLeft', 'unbind')) {
        this.onUserLeft = null;
        logger('realtime', 'info', 'Unsubscribe userLeft success roomId[' + roomId + ']');
        this.subUserLeftRoomIds![roomId] = false;
      } else {
        logger('realtime', 'error', 'Unsubscribe userLeft failure roomId[' + roomId + ']');
      }
    }
  }
}
