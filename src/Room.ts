import 'isomorphic-fetch';
import * as I from './interface';
import { Realtime } from './Realtime';
import { logger, createQueryParams } from './utils';
import { SpeechMode } from './const';

export interface IRoomParams {
  apiEndpoint: string;
  userId: string;
  accessToken: string;
  room: I.IRoom;
  conn?: Realtime;
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
  private _accessToken: string;
  private _userId: string;
  private _data: I.IRoom;
  private _conn: Realtime;

  private _baseHeaders(): Object {
    let baseHeaders = {
      'X-Sub': this._userId,
    };
    if (this._accessToken !== undefined) {
      baseHeaders = Object.assign(
        baseHeaders,
        {'Authorization': 'Bearer ' + this._accessToken},
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
    this._userId = params.userId;
    this._data = params.room;

    if (params.accessToken !== undefined) {
      this._accessToken = params.accessToken;
    }

    if (params.conn) {
      this._conn = params.conn;
    }
  }

  get data(): I.IRoom {
    return this._data;
  }

  get roomId(): string {
    return this._data.roomId ? this._data.roomId : '';
  }

  get userId(): string {
    return this._data.userId ? this._data.userId : '';
  }

  set userId(userId: string) {
    this._data.roomId = userId;
  }

  get name(): string {
    return this._data.name ? this._data.name : '';
  }

  set name(name: string) {
    this._data.name = name;
  }

  get pictureUrl(): string {
    return this._data.pictureUrl ? this._data.pictureUrl : '';
  }

  set pictureUrl(pictureUrl: string) {
    this._data.pictureUrl = pictureUrl;
  }

  get informationUrl(): string {
    return this._data.informationUrl ? this._data.informationUrl : '';
  }

  set informationUrl(informationUrl: string) {
    this._data.informationUrl = informationUrl;
  }

  get metaData(): {[key: string]: string | number | boolean | Object} {
    return this._data.metaData ? this._data.metaData : {};
  }

  set metaData(metaData: {[key: string]: string | number | boolean | Object}) {
    if (!metaData || typeof(metaData) !== 'object') {
      logger('api', 'error', 'Set metaData failure. metaData is not setting.');
    } else {
      this._data.metaData = metaData;
    }
  }

  get availableMessageTypes(): string[] | null {
    return this._data.availableMessageTypes ? this._data.availableMessageTypes : null;
  }

  get type(): number {
    return this._data.type ? this._data.type : 0;
  }

  set type(type: number) {
    this._data.type = type;
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

  get canLeft(): boolean {
    return this._data.canLeft ? this._data.canLeft : true;
  }

  set canLeft(canLeft: boolean) {
    this._data.canLeft = canLeft;
  }

  get speechMode(): number {
    return this._data.speechMode ? this._data.speechMode : SpeechMode.MANUAL;
  }

  set speechMode(speechMode: number) {
    this._data.speechMode = speechMode;
  }

  get created(): string {
    return this._data.created ? this._data.created : '';
  }

  get modified(): string {
    return this._data.modified ? this._data.modified : '';
  }

  get users(): I.IUserForRoom[] | null {
    return this._data.users || null;
  }

  get userIds(): string[] {
    return this._data.userIds ? this._data.userIds : [];
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
  public setMetaData(key: string, value: string | number | boolean | Object): void {
    if (!key || typeof(key) !== 'string') {
      logger('api', 'error', 'set metaData failure. Parameter invalid.');
    } else {
      if (this._data.metaData === undefined) {
        let metaData = {key: value};
        this._data.metaData = metaData;
      } else {
        this._data.metaData[key] = value;
      }
    }
  }

  /**
   * Update room information.
   * Please set the data of this object beforehand.
   */
  public update(putRoom: I.IRoom): Promise<I.IFetchRoomResponse> {
    return fetch(this._apiEndpoint + '/rooms/' + this.roomId, {
      method: 'PUT',
      headers: this._jsonHeaders(),
      body: JSON.stringify(putRoom)
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((room) => {
          return (
            {
              room: new Room({
                apiEndpoint: this._apiEndpoint,
                userId: this._userId,
                accessToken: this._accessToken,
                room: room,
                conn: this._conn ? this._conn : undefined,
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

  public addUsers(userIds: string[]): Promise<I.IFetchRoomUsersResponse> {
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
    return fetch(this._apiEndpoint + '/rooms/' + this.roomId + '/users',
      fetchParam
    ).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((addUsersRes) => {
          return (
            {
              roomUsers: addUsersRes.roomUsers,
              error: null,
            } as I.IFetchRoomUsersResponse
          );
        });
      } else if (response.status === 404) {
        return {
          roomUsers: null,
          error: {
            title: response.statusText,
          } as I.IProblemDetail,
        } as I.IFetchRoomUsersResponse;
      } else {
        return response.json().then((json) => {
          return (
            {
              roomUsers: null,
              error: <I.IProblemDetail>json,
            } as I.IFetchRoomUsersResponse
          );
        });
      }
    }).catch((error) => {
      return {
        roomUsers: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchRoomUsersResponse;
    });
  }

  public removeUsers(userIds: string[]): Promise<I.IFetchRoomUsersResponse> {
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
    return fetch(this._apiEndpoint + '/rooms/' + this.roomId + '/users',
      fetchParam
    ).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((removeUsersRes) => {
          return (
            {
              roomUsers: removeUsersRes.roomUsers,
              error: null,
            } as I.IFetchRoomUsersResponse
          );
        });
      } else if (response.status === 404) {
        return {
          roomUsers: null,
          error: {
            title: response.statusText,
          } as I.IProblemDetail,
        } as I.IFetchRoomUsersResponse;
      } else {
        return response.json().then((json) => {
          return (
            {
              roomUsers: null,
              error: <I.IProblemDetail>json,
            } as I.IFetchRoomUsersResponse
          );
        });
      }
    }).catch((error) => {
      return {
        roomUsers: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchRoomUsersResponse;
    });
  }

  public reflesh(): Promise<I.IFetchRoomResponse> {
    return fetch(this._apiEndpoint + '/rooms/' + this.roomId, {
      method: 'GET',
      headers: this._jsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((room) => {
          this._data = <I.IRoom>room;
          return (
            {
              room: this,
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

  public getMessages(queryParams: {[key: string]: string | number}): Promise<I.IFetchMessagesResponse> {
    let queryParamsString = '';
    if (queryParams !== undefined) {
      queryParamsString = createQueryParams(queryParams);
    }
    return fetch(this._apiEndpoint + '/rooms/' + this.roomId + '/messages?' + queryParamsString, {
      method: 'GET',
      headers: this._jsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((messages) => {
          return (
            {
              messages: <I.IMessages>messages,
              error: null,
            } as I.IFetchMessagesResponse
          );
        });
      } else {
        return response.json().then((json) => {
          return (
            {
              messages: null,
              error: <I.IProblemDetail>json,
            } as I.IFetchMessagesResponse
          );
        });
      }
    }).catch((error) => {
      return {
        messages: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchMessagesResponse;
    });
  }
}
