import 'isomorphic-fetch';

import { Device, PublicProfileScope } from 'swagchat-protobuf';

import { Client } from './Client';
import { EventType, Platform } from './const';
import * as I from './interface';
import { IRoomParams, Room } from './Room';
import { logger } from './utils';

export interface IUserParams {
  apiEndpoint: string;
  user: I.IUser;
  client: Client;
}

/**
 * User class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * room.name = 'John's Room';<br />
 * console.log(room.name);</code>
 */
export class User {
  private _apiEndpoint: string;
  private _accessToken: string;
  private _data: I.IUser;
  private _client: Client;

  constructor(params: IUserParams) {
    if (!params.apiEndpoint || params.apiEndpoint === '' || typeof(params.apiEndpoint) !== 'string') {
      logger('api', 'error', 'Initialize error. apiEndpoint is invalid.');
      return;
    }

    if (!params.user || typeof(params.user) !== 'object') {
      logger('api', 'error', 'Initialize error. room is invalid.');
      return;
    }

    this._apiEndpoint = params.apiEndpoint;
    this._data = params.user;
    this._client = params.client;
  }

  get client(): Client {
    return this._client;
  }

  set data(user: I.IUser) {
    this._data = user;
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

  get unreadCount(): number {
    return this._data.unreadCount ? this._data.unreadCount : 0;
  }

  get metaData(): Object {
    return this._data.metaData ? this._data.metaData : {};
  }

  get publicProfileScope(): number {
    return this._data.publicProfileScope ? this._data.publicProfileScope : PublicProfileScope.ALL;
  }

  get canBlock(): boolean {
    return this._data.canBlock ? this._data.canBlock : true;
  }

  get lang(): string {
    return this._data.lang ? this._data.lang : '';
  }

  get lastAccessRoomId(): string {
    return this._data.lastAccessRoomId ? this._data.lastAccessRoomId : '';
  }

  get lastAccessed(): string {
    return this._data.lastAccessed ? this._data.lastAccessed : '';
  }

  get created(): string {
    return this._data.created ? this._data.created : '';
  }

  get modified(): string {
    return this._data.modified ? this._data.modified : '';
  }

  get blockUsers(): Array<string> {
    return this._data.blockUsersList ? this._data.blockUsersList : new Array<string>(0);
  }

  get devices(): Array<Device.AsObject> {
    return this._data.devicesList ? this._data.devicesList : new Array<Device.AsObject>(0);
  }

  set devices(device: Array<Device.AsObject>) {
    const devices = new Array<Device.AsObject>(device.length);
    devices.forEach(device => {
      devices[device.platform] = device;
    });
    this._data.devicesList = devices;
  }

  private addDeviceToList(device: Device.AsObject) {
    this._data.devicesList[device.platform] = device;
  }

  private deleteDeviceToList(platform: Platform) {
    delete (this._data.devicesList[platform]);
  }

  get roles(): Array<number> {
    return this._data.rolesList ? this._data.rolesList : new Array<number>(0);
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

  public socketOpen() {
    this._client.socketOpen(this.userId);
  }

  public socketClose() {
    this._client.socketClose();
  }

  public onMessageReceived(callback: Function) {
    this._client.subscribe(EventType.MESSAGEEVENT, 'messageList', callback);
  }

  public onUserJoinReceived(callback: Function) {
    this._client.subscribe(EventType.USERJOINEVENT, 'userJoin', callback);
  }

  /**
   * Reset the number of unread for each room for the user.
   */
  public markAllAsRead(): Promise<I.IUpdateUserResponse> {
    let req = {
      unreadCount: 0
    } as I.IUpdateUserRequest;
    return this.update(req);
  }

  /**
   * Update a user.
   * Please set the data of this object beforehand.
   */
  public update(req: I.IUpdateUserRequest): Promise<I.IUpdateUserResponse> {
    const UpdateUserRequest = require('swagchat-protobuf/userMessage_pb').UpdateUserRequest;
    const pbReq = new UpdateUserRequest();
    pbReq.setName(req.name!);
    const body = pbReq.toObject();
    body['metaData'] = req.metaDataObj;

    const res = {
      error: null,
    } as I.IUpdateUserResponse;

    return fetch(this._apiEndpoint + '/users/' + this.userId, {
      method: 'PUT',
      headers: this.client.setHeaders(this.userId),
      body: JSON.stringify(body)
    }).then((response: Response) => {
      if (response.status === 200) {
        const req = {
          userId: this.userId
        } as I.IRetrieveUserRequest;
        return this._client.retrieveUser(req);
      } else {
        return response.json().then(error => {
          throw error;
        });
      }
    }).then(res => {
      if (res.error) {
        throw res.error!;
      }

      this._data = res.user!._data;
      return res;
    }).catch(error => {
      res.error = {
        message: error.message
      } as I.IErrorResponse;
      return res;
    });
  }

  /**
   * Create a room
   *
   * @param room
   */
  public createRoom(req: I.ICreateRoomRequest): Promise<I.ICreateRoomResponse> {
    const CreateRoomRequest = require('swagchat-protobuf/roomMessage_pb').CreateRoomRequest;
    const pbReq = new CreateRoomRequest();
    pbReq.setRoomId(req.roomId);
    pbReq.setUserId(this.userId);
    pbReq.setName(req.name);
    pbReq.setType(req.type);
    const body = pbReq.toObject();
    body['metaData'] = req.metaDataObj;

    const res = {
      room: null,
      error: null,
    } as I.ICreateRoomResponse;

    return fetch(this._apiEndpoint + '/rooms', {
      method: 'POST',
      headers: this.client.setHeaders(this.userId),
      body: JSON.stringify(body)
    }).then((response: Response) => {
      if (response.status === 201) {
        return response.json().then(room => {
          const params = {
            apiEndpoint: this._apiEndpoint,
            accessToken: this._accessToken,
            userId: this.userId,
            room,
            client: this._client,
            user: this,
          } as IRoomParams;
          res.room = new Room(params);
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

  /**
   * Retrieve room list
   *
   * @param roomId
   */
  public retrieveRooms(req: I.IRetrieveUserRoomsRequest): Promise<I.IRetrieveUserRoomsResponse> {
    const res = {
      userRoomsResponse: null,
      error: null,
    } as I.IRetrieveUserRoomsResponse;

    return fetch(this._apiEndpoint + '/users/' + this.userId + '/rooms' +
     '?limit=' + req.limit + '&offset=' + req.offset + '&filter=' + req.filter, {
      method: 'GET',
      headers: this.client.setHeaders(this.userId),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then(res => {
          res.userRoomsResponse = res;
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

  /**
   * Retrieve a room
   *
   * @param roomId
   */
  public retrieveRoom(req: I.IRetrieveRoomRequest): Promise<I.IFetchRoomResponse> {
    const res = {
      room: null,
      error: null,
    } as I.IFetchRoomResponse;

    return fetch(this._apiEndpoint + '/rooms/' + req.roomId, {
      method: 'GET',
      headers: this.client.setHeaders(this.userId),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then(room => {
          const params = {
            apiEndpoint: this._apiEndpoint,
            userId: this.userId,
            room,
            user: this
          } as IRoomParams;
          res.room = new Room(params);
          return res;
        });
      } else if (response.status === 404) {
        res.error = {
          message: 'Room not found.'
        } as I.IErrorResponse;
        return res;
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

  /**
   * Register a new device token.
   *
   * @param platform platform
   * @param token device token.
   */
  public addDevice(req: I.IAddDeviceRequest): Promise<I.IAddDeviceResponse> {
    const res = {
      device: null,
      error: null,
    } as I.IAddDeviceResponse;

    return fetch(this._apiEndpoint + '/users/' + this.userId + '/devices/' + String(req.platform), {
      method: 'POST',
      headers: this.client.setHeaders(this.userId),
      body: JSON.stringify({
        token: req.token,
      })
    }).then((response: Response) => {
      if (response.status === 201) {
        return response.json().then(device => {
          this.addDeviceToList(device);
          res.device = device;
          return res;
        });
      } else if (response.status === 304) {
        return res;
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

  /**
   * Delete a device.
   *
   * @param platform platform
   * @param token device token.
   */
  public deleteDevice(req: I.IDeleteDeviceRequest): Promise<I.IDeleteDeviceResponse> {
    const res = {
      error: null,
    } as I.IDeleteDeviceResponse;

    return fetch(this._apiEndpoint + '/users/' + this.userId + '/devices/' + String(req.platform), {
      method: 'DELETE',
      headers: this.client.setHeaders(this.userId),
    }).then((response: Response) => {
      if (response.status === 2) {
        return response.json().then(() => {
          this.deleteDeviceToList(req.platform);
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

  public addBlockUsers(req: I.IAddBlockUsersRequest): Promise<I.IAddBlockUsersResponse> {
    const AddBlockUsersRequest = require('swagchat-protobuf/blockUserMessage_pb').AddRoomUsersRequest;
    const pbReq = new AddBlockUsersRequest();
    const body = pbReq.toObject();
    body['blockUserIds'] = req.blockUserIdsList;

    const res = {
      error: null,
    } as I.IAddBlockUsersResponse;

    return fetch(this._apiEndpoint + '/users/' + this.userId + '/blocks', {
      method: 'POST',
      headers: this.client.setHeaders(this.userId),
      body: JSON.stringify(body)
    }).then((response: Response) => {
      if (response.status === 201) {
        const req = {
          userId: this.userId
        } as I.IRetrieveUserRequest;
        return this._client.retrieveUser(req);
      } else {
        return response.json().then(error => {
          throw error;
        });
      }
    }).then(res => {
      if (res.error) {
        throw res.error!;
      }

      this._data = res.user!._data;
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
   * Delete block users
   * @param blockUserIds
   */
  public deleteBlockUsers(req: I.IDeleteBlockUsersRequest): Promise<I.IDeleteBlockUsersResponse> {
    const DeleteRoomUsersRequest = require('swagchat-protobuf/blockUserMessage_pb').DeleteRoomUsersRequest;
    const pbReq = new DeleteRoomUsersRequest();
    const body = pbReq.toObject();
    body['blockUserIds'] = req.blockUserIdsList;

    const res = {
      error: null,
    } as I.IDeleteBlockUsersResponse;

    return fetch(this._apiEndpoint + '/users/' + this.userId + '/blocks', {
      method: 'DELETE',
      headers: this.client.setHeaders(this.userId),
      body: JSON.stringify(body)
    }).then((response: Response) => {
      if (response.status === 201) {
        const req = {
          userId: this.userId
        } as I.IRetrieveUserRequest;
        return this._client.retrieveUser(req);
      } else {
        return response.json().then(error => {
          throw error;
        });
      }
    }).then(res => {
      if (res.error) {
        throw res.error!;
      }

      this._data = res.user!._data;
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
   * Retrieve contacts
   */
  public retrieveContacts(): Promise<I.IFetchUsersResponse> {
    const res = {
      users: [],
      error: null,
    } as I.IFetchUsersResponse;

    return fetch(this._apiEndpoint + '/users/' + this.userId + '/contacts', {
      method: 'GET',
      headers: this.client.setHeaders(this.userId),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((usersRes) => {
          return (
            {
              users: usersRes.users,
              error: null,
            } as I.IFetchUsersResponse
          );
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

  /**
   * Retrieves a profile
   */
  public retrieveProfile(req: I.IRetrieveUserRequest): Promise<I.IFetchProfileResponse> {
    const res = {
      user: null,
      error: null,
    } as I.IFetchProfileResponse;

    return fetch(this._apiEndpoint + '/profiles/' + req.userId, {
      method: 'GET',
      headers: this.client.setHeaders(this.userId),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then(user => {
          res.user = user;
          return res;
        });
      } else if (response.status === 404) {
        res.error = {
          message: 'User not found.'
        } as I.IErrorResponse;
        return res;
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

  /**
   * Send Message.
   * Please create message objects beforehand by using such as client.createTextMessage().
   * @param messages An array for message objects to send.
   */
  public sendMessage(req: I.ISendMessageRequest): Promise<I.ISendMessageResponse> {
    const SendMessageRequest = require('swagchat-protobuf/messageMessage_pb').SendMessageRequest;
    const pbReq = new SendMessageRequest();
    pbReq.setMessageId(req.messageId);
    pbReq.setRoomId(req.roomId);
    pbReq.setUserId(this.userId);
    pbReq.setType(req.type);
    pbReq.setRole(req.role);
    const body = pbReq.toObject();
    body['payload'] = req.payloadObj;

    const res = {
      error: null,
    } as I.ISendMessageResponse;

    return fetch(this._apiEndpoint + '/messages', {
      method: 'POST',
      headers: this.client.setHeaders(this.userId),
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
        errRes.invalidParams = error.invalidParams;
      }
      res.error = errRes;
      return res;
    });
  }
}
