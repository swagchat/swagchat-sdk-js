import 'isomorphic-fetch';
import * as I from './interface';
import { Client, createQueryParams, logger, SpeechMode } from './';

/**
 * Room class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * room.name = 'John's Room';<br />
 * console.log(room.name);</code>
 */
export class Room {
  private _data: I.IRoom;

  constructor(roomData: I.IRoom) {
    this._data = roomData;
  }

  set onMessageReceived(onMessageReceived: Function) {
    Client.CONNECTION.onMessageReceived = onMessageReceived;
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

  get isCanLeft(): boolean {
    return this._data.isCanLeft ? this._data.isCanLeft : true;
  }

  set isCanLeft(isCanLeft: boolean) {
    this._data.isCanLeft = isCanLeft;
  }

  get isShowUsers(): boolean {
    return this._data.isShowUsers ? this._data.isShowUsers : true;
  }

  set isShowUsers(isShowUsers: boolean) {
    this._data.isShowUsers = isShowUsers;
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
    return fetch(Client.API_ENDPOINT + '/rooms/' + this.roomId, {
      method: 'PUT',
      headers: Client.JsonHeaders(),
      body: JSON.stringify(putRoom)
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((room) => {
          this._data = room;
          return (
            {
              room: this,
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
      headers: Client.JsonHeaders(),
      body: JSON.stringify({
        userIds: userIds
      })
    };
    if (!(userIds instanceof Array) || userIds.length === 0) {
      fetchParam.body = JSON.stringify({});
    }
    return fetch(Client.API_ENDPOINT + '/rooms/' + this.roomId + '/users',
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
      headers: Client.JsonHeaders(),
      body: JSON.stringify({
        userIds: userIds
      })
    };
    if (!(userIds instanceof Array) || userIds.length === 0) {
      fetchParam.body = JSON.stringify({});
    }
    return fetch(Client.API_ENDPOINT + '/rooms/' + this.roomId + '/users',
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
    return fetch(Client.API_ENDPOINT + '/rooms/' + this.roomId, {
      method: 'GET',
      headers: Client.JsonHeaders(),
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
    return fetch(Client.API_ENDPOINT + '/rooms/' + this.roomId + '/messages?' + queryParamsString, {
      method: 'GET',
      headers: Client.JsonHeaders(),
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

  public subscribeMessage(onMessageReceived: Function): void {
    Client.CONNECTION ? Client.CONNECTION.subscribeMessage(onMessageReceived, this.roomId) : null;
  }

  public unsubscribeMessage(): void {
    Client.CONNECTION ? Client.CONNECTION.unsubscribeMessage(this.roomId) : null;
  }

  public subscribeUserJoin(onUserJoined: Function): void {
    Client.CONNECTION ? Client.CONNECTION.subscribeUserJoin(onUserJoined, this.roomId) : null;
  }

  public unsubscribeUserJoin(): void {
    Client.CONNECTION ? Client.CONNECTION.unsubscribeUserJoin(this.roomId) : null;
  }

  public subscribeUserLeft(onUserLeft: Function): void {
    Client.CONNECTION ? Client.CONNECTION.subscribeUserLeft(onUserLeft, this.roomId) : null;
  }

  public unsubscribeUserLeft(): void {
    Client.CONNECTION ? Client.CONNECTION.unsubscribeUserLeft(this.roomId) : null;
  }
}
