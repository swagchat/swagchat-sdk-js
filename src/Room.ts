import 'isomorphic-fetch';
import * as I from './interface';
import { User } from './User';
import { logger } from './utils';
import { SpeechMode } from './const';

export interface IRoomParams {
  apiEndpoint: string;
  userId: string;
  room: I.IRoom;
  user: User;
}

/**
 * Room class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * room.name = 'John's Room';<br />
 * console.log(room.name);</code>
 */
export class Room {
  private _apiEndpoint: string;
  private _data: I.IRoom;
  private _user: User;

  constructor(params: IRoomParams) {
    if (!params.apiEndpoint || params.apiEndpoint === '' || typeof(params.apiEndpoint) !== 'string') {
      logger('api', 'error', 'Initialize error. apiEndpoint is invalid.');
      return;
    }
    if (!params.room || typeof(params.room) !== 'object') {
      logger('api', 'error', 'Initialize error. room is invalid.');
      return;
    }

    this._apiEndpoint = params.apiEndpoint;
    this._data = params.room;

    if (params.user) {
      this._user = params.user;
    }
  }

  set data(room: I.IRoom) {
    this._data = room;
  }

  get roomId(): string {
    return this._data.roomId ? this._data.roomId : '';
  }

  get userId(): string {
    return this._data.userId ? this._data.userId : '';
  }

  get name(): string {
    return this._data.name ? this._data.name : '';
  }

  get pictureUrl(): string {
    return this._data.pictureUrl ? this._data.pictureUrl : '';
  }

  get informationUrl(): string {
    return this._data.informationUrl ? this._data.informationUrl : '';
  }

  get type(): number {
    return this._data.type ? this._data.type : 0;
  }

  get canLeft(): boolean {
    return this._data.canLeft ? this._data.canLeft : true;
  }

  get speechMode(): number {
    return this._data.speechMode ? this._data.speechMode : SpeechMode.MANUAL;
  }

  get metaData(): Object {
    return this._data.metaData ? this._data.metaData : {};
  }

  get availableMessageTypes(): Array<string> {
    return this._data.availableMessageTypes ? this._data.availableMessageTypes.split(',') : new Array<string>(0);
  }

  get lastMessage(): string {
    return this._data.lastMessage ? this._data.lastMessage : '';
  }

  get lastMessageUpdated(): string {
    return this._data.lastMessageUpdated ? this._data.lastMessageUpdated : '';
  }

  get messageCount(): number {
    return this._data.messageCount ? this._data.messageCount : 0;
  }

  get created(): string {
    return this._data.created ? this._data.created : '';
  }

  get modified(): string {
    return this._data.modified ? this._data.modified : '';
  }

  get users(): Array<I.IMiniUser> {
    return this._data.users ? this._data.users : new Array<I.IMiniUser>(0);
  }

  /**
   * Register metadata in separate.
   * An applied key will be added if metadata already exists. A value will be overwritten if an equivalent key exists.
   * Please use accessor if you will register by multiple keys in a lump. In this case, existing metadata will be overwritten.
   *
   * ex)<br />
   * <code>room.metaData = {'key1': 'value1', 'key2': 2, 'key3': true, 'key4': {'key5': 'value5'}};</code>
   * @param key Key for register.
   * @param value A value for key.
   */
  // public setMetaData(key: string, value: string | number | boolean | Object): void {
  //   if (!key || typeof(key) !== 'string') {
  //     logger('api', 'error', 'set metaData failure. Parameter invalid.');
  //   } else {
  //     if (this._data.metaData === undefined) {
  //       let metaData = {key: value};
  //       this._data.metaData = metaData;
  //     } else {
  //       this._data.metaData[key] = value;
  //     }
  //   }
  // }

  /**
   * Update room information.
   * Please set the data of this object beforehand.
   */
  public update(req: I.IUpdateRoomRequest): Promise<I.IUpdateRoomResponse> {
    const UpdateRoomRequest = require('swagchat-protobuf/roomMessage_pb').UpdateRoomRequest;
    const pbReq = new UpdateRoomRequest();
    pbReq.setName(req.name!);
    const body = pbReq.toObject();
    body['metaData'] = req.metaDataObj;

    const res = {
      error: null,
    } as I.IUpdateRoomResponse;

    return fetch(this._apiEndpoint + '/rooms/' + this.roomId, {
      method: 'PUT',
      headers: this._user.client.setHeaders(this._user.userId),
      body: JSON.stringify(body)
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((room) => {
          this._data = room;
          return res;
        });
      } else {
        return response.json().then(error => {
          throw error;
        });
      }
    }).catch((error) => {
      let errRes = {} as I.IErrorResponse;
      if (error.hasOwnProperty('message')) {
        errRes.message = error.message;
      }
      if (error.hasOwnProperty('invalidParams')) {
        errRes.invalidParamsList = error.invalidParams;
      }
      res.error = errRes;
      return res;
    });
  }

  public addUsers(req: I.IAddRoomUsersRequest): Promise<I.IAddRoomUsersResponse> {
    const AddRoomUsersRequest = require('swagchat-protobuf/roomUserMessage_pb').AddRoomUsersRequest;
    const pbReq = new AddRoomUsersRequest();
    pbReq.setRoomId(this.roomId);
    if (req.display) {
      pbReq.setDisplay(req.display);
    } else {
      pbReq.setDisplay(true);
    }
    const body = pbReq.toObject();
    body['userIds'] = req.userIdsList;
    delete(body.userIdsList);
    delete(body.roomId);

    const res = {
      error: null,
    } as I.IAddRoomUsersResponse;

    return fetch(this._apiEndpoint + '/rooms/' + this.roomId + '/users', {
      method: 'POST',
      headers: this._user.client.setHeaders(this._user.userId),
      body: JSON.stringify(body)
    }).then((response: Response) => {
      if (response.status === 201) {
        const req = {
          roomId: this.roomId
        } as I.IRetrieveRoomRequest;
        return this._user.retrieveRoom(req);
      } else {
        return response.json().then(error => {
          throw error;
        });
      }
    }).then(res => {
      if (res.error) {
        throw res.error!;
      }

      this._data = res.room!._data;
      return res;
    }).catch(error => {
      let errRes = {} as I.IErrorResponse;
      if (error.hasOwnProperty('message')) {
        errRes.message = error.message;
      }
      if (error.hasOwnProperty('invalidParams')) {
        errRes.invalidParams = error.invalidParams;
      }
      res.error = errRes;
      return res;
    });
  }

  public deleteUsers(req: I.IDeleteRoomUsersRequest): Promise<I.IDeleteRoomUsersResponse> {
    const DeleteRoomUsersRequest = require('swagchat-protobuf/roomUserMessage_pb').DeleteRoomUsersRequest;
    const pbReq = new DeleteRoomUsersRequest();
    pbReq.setRoomId(this.roomId);
    const body = pbReq.toObject();
    body['userIds'] = req.userIdsList;
    delete(body.userIdsList);
    delete(body.roomId);

    const res = {
      error: null,
    } as I.IDeleteRoomUsersResponse;

    return fetch(this._apiEndpoint + '/rooms/' + this.roomId + '/users', {
      method: 'DELETE',
      headers: this._user.client.setHeaders(this._user.userId),
      body: JSON.stringify(body)
    }).then((response: Response) => {
      if (response.status === 204) {
        const req = {
          roomId: this.roomId
        } as I.IRetrieveRoomRequest;
        return this._user.retrieveRoom(req);
      } else {
        return response.json().then(error => {
          throw error;
        });
      }
    }).then(res => {
      if (res.error) {
        throw res.error!;
      }

      this._data = res.room!._data;
      return res;
    }).catch(error => {
      let errRes = {} as I.IErrorResponse;
      if (error.hasOwnProperty('message')) {
        errRes.message = error.message;
      }
      if (error.hasOwnProperty('invalidParams')) {
        errRes.invalidParams = error.invalidParams;
      }
      res.error = errRes;
      return res;
    });
  }

  /**
   * Reset the number of unread for room specified by parameters.
   * @param roomId Room ID
   */
  public markAsRead(): Promise<I.IMarkAsReadResponse> {
    const res = {
      error: null,
    } as I.IMarkAsReadResponse;

    return fetch(this._apiEndpoint + '/rooms/' + this.roomId + '/users/' + this.userId, {
      method: 'PUT',
      headers: this._user.client.setHeaders(this._user.userId),
      body: JSON.stringify({unreadCount: 0})
    }).then((response: Response) => {
      if (response.status === 204) {
        return response.json().then(() => {
          return res;
        });
      } else {
        return response.json().then(error => {
          throw error;
        });
      }
    }).catch(error => {
      let errRes = {} as I.IErrorResponse;
      if (error.hasOwnProperty('message')) {
        errRes.message = error.message;
      }
      if (error.hasOwnProperty('invalidParams')) {
        errRes.invalidParams = error.invalidParams;
      }
      res.error = errRes;
      return res;
    });
  }

  public retrieveRoomMessages(req: I.IRetrieveRoomMessagesRequest): Promise<I.IRetrieveRoomMessagesResponse> {
    const res = {
      roomMessagesResponse: null,
      error: null,
    } as I.IRetrieveRoomMessagesResponse;

    return fetch(this._apiEndpoint + '/rooms/' + this.roomId + '/messages' +
     '?limit=' + req.limit + '&offset=' + req.offset + '&limitTimestamp=' + req.limitTimestamp + '&offsetTimestamp=' + req.offsetTimestamp, {
      method: 'GET',
      headers: this._user.client.setHeaders(this._user.userId),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then(res => {
          res.roomMessagesResponse = res;
          return res;
        });
      } else {
        return response.json().then(error => {
          throw error;
        });
      }
    }).catch(error => {
      let errRes = {} as I.IErrorResponse;
      if (error.hasOwnProperty('message')) {
        errRes.message = error.message;
      }
      if (error.hasOwnProperty('invalidParams')) {
        errRes.invalidParamsList = error.invalidParams;
      }
      res.error = errRes;
      return res;
    });
  }

  /**
   * Send Message.
   * Please create message objects beforehand by using such as client.createTextMessage().
   * @param messages An array for message objects to send.
   */
  public sendMessage(req: I.ISendMessageRequest): Promise<I.ISendMessageResponse> {
    const SendMessageRequest = require('swagchat-protobuf/messageMessage_pb').SendMessageRequest;
    const pbReq = new SendMessageRequest();
    pbReq.setMessageId(req.messageId);
    pbReq.setRoomId(this.roomId);
    pbReq.setUserId(this._user.userId);
    pbReq.setType(req.type);
    pbReq.setRole(req.role);
    const body = pbReq.toObject();
    body['payload'] = req.payloadObj;

    const res = {
      error: null,
    } as I.ISendMessageResponse;

    return fetch(this._apiEndpoint + '/messages', {
      method: 'POST',
      headers: this._user.client.setHeaders(this._user.userId),
      body: JSON.stringify(body)
    }).then((response: Response) => {
      if (response.status === 201) {
        return response.json().then(() => {
          return res;
        });
      } else {
        return response.json().then(error => {
          throw error;
        });
      }
    }).catch(error => {
      let errRes = {} as I.IErrorResponse;
      if (error.hasOwnProperty('message')) {
        errRes.message = error.message;
      }
      if (error.hasOwnProperty('invalidParams')) {
        errRes.invalidParamsList = error.invalidParams;
      }
      res.error = errRes;
      return res;
    });
  }
}
