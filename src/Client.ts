import { History } from 'history';
import { Realtime, Room, Platform, logger, EventName } from './';
import * as I from './interface';
import 'isomorphic-fetch';

export interface IClientParams {
  apiEndpoint: string;
  wsEndpoint?: string;
  accessToken?: string;
  userId?: string;
  username?: string;
  paths?: IPaths;
  history: History;
  isGuest?: boolean;
  realm?: string;
  updateLastAccessRoomId?: boolean;
}

export interface IPaths {
  roomListPath?: string;
  messageListPath?: string;
  roomSettingPath?: string;
  profilePath?: string;
  accountPath?: string;
  guestMessageListPath?: string;
}

export class Client {
  private _apiEndpoint: string;
  private _wsEndpoint: string;
  private _conn: Realtime;
  private _speechRt: Realtime;
  private _paths: IPaths;
  private _history: History;
  private _realm: string;

  public accessToken?: string;
  public userId?: string;
  public username?: string;
  public updateLastAccessRoomId: boolean;

  get apiEndpoint(): string {
    return this._apiEndpoint;
  }

  set onConnected(callback: Function) {
    if (this._conn) {
      this._conn.onConnected = callback;
    }
  }

  set onError(callback: Function) {
    this._conn.onError = callback;
  }

  set onClosed(callback: Function) {
    this._conn.onClosed = callback;
  }

  get paths(): IPaths {
    return this._paths;
  }

  get history(): History {
    return this._history;
  }

  private _baseHeaders(): {} {
    let baseHeaders = {
      'X-Sub': this.userId,
    };
    if (this.accessToken !== undefined) {
      baseHeaders = Object.assign(
        baseHeaders,
        {'Authorization': 'Bearer ' + this.accessToken},
      );
    }
    return baseHeaders;
  }

  private _jsonHeaders(): {} {
    return Object.assign(
      this._baseHeaders(),
      {'Content-Type': 'application/json'},
    );
  }

  constructor(params: IClientParams) {
    logger('api', 'info', 'Initializing API Client...');
    if (!params.apiEndpoint || params.apiEndpoint === '' || typeof(params.apiEndpoint) !== 'string') {
      logger('api', 'error', 'Initialize error. apiEndpoint is invalid.');
      return;
    }
    this._apiEndpoint = params.apiEndpoint;

    if (params.isGuest === undefined) {
      params.isGuest = false;
    }

    if (!params.isGuest) {
      if (!params.userId || params.userId === '' || typeof(params.userId) !== 'string') {
        logger('api', 'error', 'Initialize error. userId is invalid.');
        return;
      }
      if (!params.username || params.username === '' || typeof(params.username) !== 'string') {
        logger('api', 'error', 'Initialize error. username is invalid.');
        return;
      }
      this.userId = params.userId;
      this.username = params.username;

      if (params.accessToken !== undefined) {
        this.accessToken = params.accessToken;
      }
    }

    if (params.wsEndpoint !== undefined) {
      if (!params.wsEndpoint || params.wsEndpoint === '' || typeof(params.wsEndpoint) !== 'string') {
        logger('api', 'error', 'Initialize error. wsEndpoint is invalid.');
        return;
      }
      this._wsEndpoint = params.wsEndpoint!;
    }

    if (params.paths !== undefined) {
      this._paths = params.paths;
    }

    if (params.history !== undefined) {
      this._history = params.history;
    }

    if (params.realm !== undefined) {
      this._realm = params.realm;
    }

    if (params.updateLastAccessRoomId === undefined) {
      this.updateLastAccessRoomId = false;
    } else {
      this.updateLastAccessRoomId = params.updateLastAccessRoomId;
    }

    logger('api', 'info', 'Initialized API Client OK');
  }

  public socketOpen() {
    if (this._wsEndpoint && this.userId) {
      this._conn = new Realtime(this._wsEndpoint, this.userId);
    }
  }

  public socketClose() {
    this._conn.close();
  }

  /**
   * Create websocket connection for speech
   */
  public createSpeechRt() {
    const speechRt = new Realtime(this._wsEndpoint + '/speech', undefined);
    speechRt.conn.binaryType = 'arraybuffer';
    this._speechRt = speechRt;
  }

  /**
   * Create a user
   */
  public createUser(): Promise<I.IFetchUserResponse> {
    const user = {
      userId: this.userId,
      name: this.username,
    };

    return fetch(this._apiEndpoint + '/users', {
      method: 'POST',
      headers: this._jsonHeaders(),
      body: JSON.stringify(user)
    }).then((response: Response) => {
      if (response.status === 201) {
        return response.json().then((user) => {
          return (
            {
              user: user,
              error: null,
            } as I.IFetchUserResponse
          );
        });
      } else {
        return response.json().then((json) => {
          return (
            {
              user: null,
              error: <I.IProblemDetail>json,
            } as I.IFetchUserResponse
          );
        });
      }
    }).catch((error) => {
      return {
        user: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchUserResponse;
    });
  }

  /**
   * Get my user infomation
   */
  public getUser(): Promise<I.IFetchUserResponse> {
    return fetch(this._apiEndpoint + '/users/' + this.userId, {
      method: 'GET',
      headers: this._jsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((user) => {
          return (
            {
              user: user,
              error: null,
            } as I.IFetchUserResponse
          );
        });
      } else if (response.status === 404) {
        return this.createUser();
      } else if (response.status === 401) {
        return this.createUser();
      } else {
        return response.json().then((json) => {
          return (
            {
              user: null,
              error: <I.IProblemDetail>json,
            } as I.IFetchUserResponse
          );
        });
      }
    }).catch((error) => {
      return {
        user: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchUserResponse;
    });
  }

  /**
   * Get a profile user infomation
   */
  public getProfileUser(userId: string): Promise<I.IFetchUserResponse> {
    return fetch(this._apiEndpoint + '/profiles/' + userId, {
      method: 'GET',
      headers: this._jsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((user) => {
          return (
            {
              user: user,
              error: null,
            } as I.IFetchUserResponse
          );
        });
      } else if (response.status === 404) {
        return this.createUser();
      } else {
        return response.json().then((json) => {
          return (
            {
              user: null,
              error: <I.IProblemDetail>json,
            } as I.IFetchUserResponse
          );
        });
      }
    }).catch((error) => {
      return {
        user: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchUserResponse;
    });
  }

  /**
   * Create a room
   *
   * @param room
   */
  public createRoom(room: I.IRoom): Promise<I.IFetchRoomResponse> {
    return fetch(this._apiEndpoint + '/rooms', {
      method: 'POST',
      headers: this._jsonHeaders(),
      body: JSON.stringify(room)
    }).then((response: Response) => {
      if (response.status === 201) {
        return response.json().then((room) => {
          return (
            {
              room: new Room({
                apiEndpoint: this._apiEndpoint,
                userId: this.userId!,
                accessToken: this.accessToken!,
                room: room,
                conn: this._conn,
              }),
              error: null,
            } as I.IFetchRoomResponse
          );
        });
      } else {
      return response.json().then((json) => {
        return (
          {
            room: null,
            error: <I.IProblemDetail>json,
          } as I.IFetchRoomResponse
        );
      });
      }
    }).catch((error) => {
      return {
        room: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchRoomResponse;
    });
  }

  /**
   * Get my room list
   */
  public getRooms(): Promise<I.IFetchRoomsResponse> {
    return fetch(this._apiEndpoint + '/rooms', {
      method: 'GET',
      headers: this._jsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
      return response.json().then((rooms) => {
        return (
        {
          rooms: <I.IRoom[]>rooms,
          error: null,
        } as I.IFetchRoomsResponse
        );
      });
      } else {
      return response.json().then((json) => {
        return (
        {
          rooms: null,
          error: <I.IProblemDetail>json,
        } as I.IFetchRoomsResponse
        );
      });
      }
    }).catch((error) => {
      return {
      rooms: null,
      error: {
        title: error.message,
      } as I.IProblemDetail,
      } as I.IFetchRoomsResponse;
    });
  }

  /**
   * Get a room infromation
   *
   * @param roomId
   */
  public getRoom(roomId: string): Promise<I.IFetchRoomResponse> {
    return fetch(this._apiEndpoint + '/rooms/' + roomId, {
      method: 'GET',
      headers: this._jsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
      return response.json().then((room) => {
        return (
          {
            room: new Room({
              apiEndpoint: this._apiEndpoint,
              userId: this.userId!,
              accessToken: this.accessToken!,
              room: room,
              conn: this._conn ? this._conn : undefined,
            }),
            error: null,
          } as I.IFetchRoomResponse
        );
      });
      } else if (response.status === 404) {
        return {
          room: null,
          error: {
          title: response.statusText,
          } as I.IProblemDetail,
        } as I.IFetchRoomResponse;
      } else {
        return response.json().then((json) => {
          return (
          {
            room: null,
            error: <I.IProblemDetail>json,
          } as I.IFetchRoomResponse
          );
        });
      }
    }).catch((error) => {
      return {
        room: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchRoomResponse;
    });
  }

  /**
   * Remove a room
   *
   * @param roomId
   */
  public removeRoom(roomId: string): Promise<I.IErrorResponse> {
    return fetch(this._apiEndpoint + '/rooms/' + roomId, {
      method: 'DELETE',
      headers: this._jsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 204) {
        return {
          error: null,
        } as I.IErrorResponse;
      } else if (response.status === 404) {
        return {
          error: {
            title: response.statusText,
          } as I.IProblemDetail,
        } as I.IErrorResponse;
      } else {
        return response.json().then((json) => {
          return (
            {
              error: <I.IProblemDetail>json,
            } as I.IErrorResponse
          );
        });
      }
    }).catch((error) => {
      return {
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IErrorResponse;
    });
  }

  /**
   * Get settings
   */
  public getSetting(): Promise<I.IFetchSettingResponse> {
    return fetch(this._apiEndpoint + '/setting', {
      method: 'GET',
      headers: this._jsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((setting) => {
          return (
            {
              setting: setting,
              error: null,
            } as I.IFetchSettingResponse
          );
        });
      } else if (response.status === 404) {
        return {
            setting: null,
            error: {
            title: response.statusText,
          } as I.IProblemDetail,
        } as I.IFetchSettingResponse;
      } else {
        return response.json().then((json) => {
          return (
            {
              setting: null,
              error: <I.IProblemDetail>json,
            } as I.IFetchSettingResponse
          );
        });
      }
    }).catch((error) => {
      return {
        setting: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchSettingResponse;
    });
  }

  /**
   * Register a new device token.
   *
   * @param platform platform
   * @param token device token.
   */
  public setDevice(platform: Platform, token: string): Promise<I.IFetchUserDeviceResponse> {
    return fetch(this._apiEndpoint + '/users/' + this.userId + '/devices/' + String(platform), {
      method: 'PUT',
      headers: this._jsonHeaders(),
      body: JSON.stringify({
        token: token,
      })
    }).then((response: Response) => {
      if (response.status === 200 || response.status === 201) {
        return response.json().then((device) => {
          return (
            {
              device: device,
              error: null,
            } as I.IFetchUserDeviceResponse
          );
        });
      } else if (response.status === 404) {
        return {
          device: null,
          error: {
            title: response.statusText,
          } as I.IProblemDetail,
        } as I.IFetchUserDeviceResponse;
      } else {
        return response.json().then((json) => {
          return (
            {
              device: null,
              error: <I.IProblemDetail>json,
            } as I.IFetchUserDeviceResponse
          );
        });
      }
    }).catch((error) => {
      return {
        device: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchUserDeviceResponse;
    });
  }

  /**
   * Delete device token.
   */
  public removeDevice(platform: Platform): Promise<I.IErrorResponse> {
    return fetch(this._apiEndpoint + '/users/' + this.userId + '/devices/' + String(platform), {
      method: 'DELETE',
      headers: this._jsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 204) {
        return response.json().then(() => {
          return (
            {
              error: null,
            } as I.IErrorResponse
          );
        });
      } else if (response.status === 404) {
        return {
          error: {
            title: response.statusText,
          } as I.IProblemDetail,
        } as I.IErrorResponse;
      } else {
        return response.json().then((json) => {
          return (
            {
              error: <I.IProblemDetail>json,
            } as I.IErrorResponse
          );
        });
      }
    }).catch((error) => {
      return {
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IErrorResponse;
    });
  }

  /**
   * Register metadata in separate.
   * An applied key will be added if metadata already exists. A value will be overwritten if an equivalent key exists.
   * Please use accessor if you will register by multiple keys in a lump. In this case, existing metadata will be overwritten.
   *
   * ex)<br />
   * <code>user.metaData = {'key1': 'value1', 'key2': 2, 'key3': true, 'key4': {'key5': 'value5'}};</code>
   * @param key Key for register.
   * @param value A value for key.
   */
  // public setUserMetaData(key: string, value: string | number | boolean | Object): void {
  //   if (!key || typeof(key) !== 'string') {
  //     logger('api', 'error', 'set metaData failure. Parameter invalid.');
  //     return;
  //   }
  //   if (this.metaData === undefined) {
  //     let metaData = {key: value};
  //     this.metaData = metaData;
  //   } else {
  //     this.metaData[key] = value;
  //   }
  // }

  /**
   * Update user information.
   * @param user
   */
  public update(putUser: I.IUser): Promise<I.IFetchUserResponse> {
    return fetch(this._apiEndpoint + '/users/' + this.userId, {
      method: 'PUT',
      headers: this._jsonHeaders(),
      body: JSON.stringify(putUser)
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((user) => {
          return (
            {
              user: user,
              error: null,
              } as I.IFetchUserResponse
          );
        });
      } else {
      return response.json().then((json) => {
        return (
          {
            user: null,
            error: <I.IProblemDetail>json,
          } as I.IFetchUserResponse
        );
      });
      }
    }).catch((error) => {
      return {
        user: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchUserResponse;
    });
  }

  /**
   * Send Message.
   * Please create message objects beforehand by using such as client.createTextMessage().
   * @param messages An array for message objects to send.
   */
  public sendMessages(...messages: I.IMessage[]): Promise<I.ISendMessagesResponse> {
    const sendMessages: I.IMessage[] = [];
    let copyMessage: I.IMessage;
    messages.forEach(message => {
      copyMessage = Object.assign({}, message);
      delete copyMessage.messageId;
      delete copyMessage.created;
      delete copyMessage.modified;
      if (copyMessage.payload.hasOwnProperty('dataUrl')) {
        delete (copyMessage.payload as I.IImagePayload).dataUrl;
      }
      sendMessages.push(copyMessage);
    });
    return fetch(this._apiEndpoint + '/messages', {
      method: 'POST',
      headers: this._jsonHeaders(),
      body: JSON.stringify({messages: sendMessages})
    }).then((response: Response) => {
      if (response.status === 201) {
        return response.json().then((messagesRes) => {
          return (
            {
              messageIds: <string[]>messagesRes.messageIds,
              error: null,
            } as I.ISendMessagesResponse
          );
        });
      } else {
        return response.json().then((json) => {
          return (
            {
              messageIds: null,
              error: <I.IProblemDetail>json,
            } as I.ISendMessagesResponse
          );
        });
      }
    }).catch((error) => {
      return {
        messageIds: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.ISendMessagesResponse;
    });
  }

  /**
   * Reset the number of unread for room specified by parameters.
   * @param roomId Room ID
   */
  public markAsRead(roomId: string): Promise<I.IErrorResponse> {
    return fetch(this._apiEndpoint + '/rooms/' + roomId + '/users/' + this.userId, {
      method: 'PUT',
      headers: this._jsonHeaders(),
      body: JSON.stringify({unreadCount: 0})
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then(() => {
          return (
            {
              error: null,
            } as I.IErrorResponse
          );
        });
      } else {
        return response.json().then((json) => {
          return (
            {
              error: <I.IProblemDetail>json,
            } as I.IErrorResponse
          );
        });
      }
    }).catch((error) => {
      return {
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IErrorResponse;
    });
  }

  /**
   * Reset the number of unread for each room for the user.
   */
  public markAllAsRead(): Promise<I.IErrorResponse> {
    return fetch(this._apiEndpoint + '/users/' + this.userId, {
      method: 'PUT',
      headers: this._jsonHeaders(),
      body: JSON.stringify({unreadCount: 0})
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then(() => {
          return (
            {
              error: null,
            } as I.IErrorResponse
          );
        });
      } else {
        return response.json().then((json) => {
          return (
            {
              error: <I.IProblemDetail>json,
            } as I.IErrorResponse
          );
        });
      }
    }).catch((error) => {
      return {
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IErrorResponse;
    });
  }

  /**
   * File upload.
   * @param file Image data.
   */
  public fileUpload(file: File, mime: string): Promise<I.IPostAssetResponse>;
  public fileUpload(file: File, mime: string, width: number, height: number): Promise<I.IPostAssetResponse>;
  public fileUpload(file: File, mime: string, width?: number, height?: number): Promise<I.IPostAssetResponse> {
    let formData = new FormData();
    formData.append('asset', file);
    if (width) {
      formData.append('width', String(width));
    }
    if (height) {
      formData.append('height', String(height));
    }
    if (mime !== '') {
      formData.append('mime', mime);
    }
    return fetch(this._apiEndpoint + '/assets', {
      method: 'POST',
      headers: this._baseHeaders(),
      body: formData,
    }).then((response: Response) => {
      if (response.status === 201) {
        return response.json().then((asset) => {
          return (
            {
              asset: <I.IAsset>asset,
              error: null,
            } as I.IPostAssetResponse
          );
        });
      } else {
        return response.json().then((json) => {
          return (
            {
              asset: null,
              error: <I.IProblemDetail>json,
            } as I.IPostAssetResponse
          );
        });
      }
    }).catch((error) => {
      return {
        asset: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IPostAssetResponse;
    });
  }

  /**
   * Get my contacts
   */
  public getContacts(): Promise<I.IFetchUsersResponse> {
    return fetch(this._apiEndpoint + '/users/' + this.userId + '/contacts', {
      method: 'GET',
      headers: this._jsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((usersRes) => {
          return (
            {
              users: <I.IUser[]>usersRes.users,
              error: null,
            } as I.IFetchUsersResponse
          );
        });
      } else {
        return response.json().then((json) => {
          return (
            {
              users: [],
              error: <I.IProblemDetail>json,
            } as I.IFetchUsersResponse
          );
        });
      }
    }).catch((error) => {
      return {
        users: [],
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchUsersResponse;
    });
  }

  /**
   * Add block users
   * @param userIds
   */
  public addBlockUsers(userIds: string[]): Promise<I.IFetchBlockUsersResponse> {
    let fetchParam = {
      method: 'PUT',
      headers: this._jsonHeaders(),
      body: JSON.stringify({
        userIds: userIds
      })
    };
    if (!(userIds instanceof Array) || userIds.length === 0) {
      fetchParam.body = JSON.stringify({});
    }
    return fetch(this._apiEndpoint + '/users/' + this.userId + '/blocks',
      fetchParam
    ).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((blockUsersRes) => {
          return (
            {
              blockUsers: blockUsersRes.blockUsers,
              error: null,
            } as I.IFetchBlockUsersResponse
          );
        });
      } else if (response.status === 404) {
        return {
          blockUsers: null,
          error: {
            title: response.statusText,
          } as I.IProblemDetail,
        } as I.IFetchBlockUsersResponse;
      } else {
        return response.json().then((json) => {
          return (
            {
              blockUsers: null,
              error: <I.IProblemDetail>json,
            } as I.IFetchBlockUsersResponse
          );
        });
      }
    }).catch((error) => {
      return {
        blockUsers: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchBlockUsersResponse;
    });
  }

  /**
   * Remove block users
   * @param userIds
   */
  public removeBlockUsers(userIds: string[]): Promise<I.IFetchBlockUsersResponse> {
    let fetchParam = {
      method: 'DELETE',
      headers: this._jsonHeaders(),
      body: JSON.stringify({
        userIds: userIds
      })
    };
    if (!(userIds instanceof Array) || userIds.length === 0) {
      fetchParam.body = JSON.stringify({});
    }
    return fetch(this._apiEndpoint + '/users/' + this.userId + '/blocks',
      fetchParam
    ).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((blockUsersRes) => {
          return (
            {
              blockUsers: blockUsersRes.blockUsers,
              error: null,
            } as I.IFetchBlockUsersResponse
          );
        });
      } else if (response.status === 404) {
        return {
          blockUsers: null,
          error: {
            title: response.statusText,
          } as I.IProblemDetail,
        } as I.IFetchBlockUsersResponse;
      } else {
        return response.json().then((json) => {
          return (
            {
              blockUsers: null,
              error: <I.IProblemDetail>json,
            } as I.IFetchBlockUsersResponse
          );
        });
      }
    }).catch((error) => {
      return {
        blockUsers: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchBlockUsersResponse;
    });
  }


  /**
   * Create a guest user
   */
  public createGuestUser(): Promise<I.IFetchUserResponse> {
    return fetch(this._apiEndpoint + '/guests', {
      method: 'POST',
      headers: {'X-Realm': this._realm ? this._realm : ''},
      credentials: 'same-origin',
    }).then((response: Response) => {
      if (response.status === 201) {
        return response.json().then((user) => {
          this.accessToken = user.accessToken;
          return (
            {
              user: user,
              error: null,
            } as I.IFetchUserResponse
          );
        });
      } else {
        return response.json().then((json) => {
          return (
            {
              user: null,
              error: <I.IProblemDetail>json,
            } as I.IFetchUserResponse
          );
        });
      }
    }).catch((error) => {
      return {
        user: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchUserResponse;
    });
  }

  /**
   * Get a guest user infomation
   */
  public getGuestUser(userId: string): Promise<I.IFetchUserResponse> {
    return fetch(this._apiEndpoint + '/guests/' + userId, {
      method: 'GET',
      headers: {'X-Realm': this._realm ? this._realm : ''},
      credentials: 'same-origin',
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((user) => {
          this.accessToken = user.accessToken;
          return (
            {
              user: user,
              error: null,
            } as I.IFetchUserResponse
          );
        });
      } else if (response.status === 404) {
        return this.createUser();
      } else {
        return response.json().then((json) => {
          return (
            {
              user: null,
              error: <I.IProblemDetail>json,
            } as I.IFetchUserResponse
          );
        });
      }
    }).catch((error) => {
      return {
        user: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchUserResponse;
    });
  }

  public subscribe(eventName: EventName, funcName: string, onMessage: Function): void {
    if (this._conn && this.userId) {
      this._conn.subscribe(eventName, funcName, onMessage, this.userId);
    }
  }

  public unsubscribe(eventName: EventName, funcName: string): void {
    if (this._conn && this.userId) {
      this._conn.unsubscribe(eventName, funcName, this.userId);
    }
  }
}
