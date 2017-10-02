import 'isomorphic-fetch';
import { Client, logger, Platform } from './';
import * as I from './interface';

/**
 * User class has API client, own data and the behaivor for itself.
 * Please use accessor to get or set although data is stored in variable <code>_data</code>.
 *
 * ex)<br /><code>
 * user.name = 'John';<br />
 * console.log(user.name);</code>
 */
export class User {
  private _data: I.IUser;

  constructor(userData: I.IUser) {
    this._data = userData;
  }

  get data(): I.IUser {
    return this._data;
  }

  get userId(): string {
    return this._data.userId;
  }

  set userId(userId: string) {
    if (!userId || userId === '' || typeof(userId) !== 'string') {
      logger('api', 'error', 'Set userId failure. userId is not setting.');
    } else {
      this._data.userId = userId;
    }
  }

  get name(): string {
    return this._data.name;
  }

  set name(name: string) {
    if (!name || name === '' || typeof(name) !== 'string') {
      logger('api', 'error', 'Set userId failure. userId is not setting.');
    } else {
      this._data.name = name;
    }
  }

  get pictureUrl(): string | undefined {
    return this._data.pictureUrl;
  }

  set pictureUrl(pictureUrl: string | undefined) {
    if (!pictureUrl || pictureUrl === '' || typeof(pictureUrl) !== 'string') {
      logger('api', 'error', 'Set pictureUrl failure. pictureUrl is not setting.');
    } else {
      this._data.pictureUrl = pictureUrl;
    }
  }

  get informationUrl(): string | undefined {
    return this._data.informationUrl;
  }

  set informationUrl(informationUrl: string | undefined) {
    if (!informationUrl || informationUrl === '' || typeof(informationUrl) !== 'string') {
      logger('api', 'error', 'Set userId failure. userId is not setting.');
    } else {
      this._data.informationUrl = informationUrl;
    }
  }

  get unreadCount(): number | undefined {
    return this._data.unreadCount;
  }

  get isPublic(): boolean | undefined {
    return this._data.isPublic;
  }

  set isPublic(isPublic: boolean | undefined) {
    this._data.isPublic = isPublic;
  }

  get isCanBlock(): boolean | undefined {
    return this._data.isCanBlock;
  }

  set isCanBlock(isCanBlock: boolean | undefined) {
    this._data.isCanBlock = isCanBlock;
  }

  get isShowUsers(): boolean | undefined {
    return this._data.isShowUsers;
  }

  set isShowUsers(isShowUsers: boolean | undefined) {
    this._data.isShowUsers = isShowUsers;
  }

  get metaData(): {[key: string]: string | number | boolean | Object} | undefined {
    return this._data.metaData;
  }

  set metaData(metaData: {[key: string]: string | number | boolean | Object} | undefined) {
    if (!metaData || typeof(metaData) !== 'object') {
      logger('api', 'error', 'Set metaData failure. metaData is not setting.');
    } else {
      this._data.metaData = metaData;
    }
  }

  get created(): string | undefined {
    return this._data.created;
  }

  get modified(): string | undefined {
    return this._data.modified;
  }

  get rooms(): I.IRoomForUser[] | undefined {
    return this._data.rooms;
  }

  get devices(): I.IDevice[] | undefined {
    return this._data.devices;
  }

  get blocks(): string[] | undefined {
    return this._data.blocks;
  }

  /**
   * Register a new device token.
   *
   * @param token device token.
   */
  public setDevice(platform: Platform, token: string): Promise<I.IFetchUserDeviceResponse> {
    let method = 'POST';
    if (this.devices) {
      for (let device of this.devices) {
        if (device.platform === platform) {
          method = 'PUT';
        }
      }
    }
    return fetch(Client.API_ENDPOINT + '/users/' + this.userId + '/devices/' + String(platform), {
      method: method,
      headers: Client.JsonHeaders(),
      body: JSON.stringify({
        token: token,
      })
    }).then((response: Response) => {
      if (response.status === 200 || response.status === 201) {
        this.reflesh();
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
    return fetch(Client.API_ENDPOINT + '/users/' + this.userId + '/devices/' + String(platform), {
      method: 'DELETE',
      headers: Client.JsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 204) {
        this.reflesh();
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
  public setUserMetaData(key: string, value: string | number | boolean | Object): void {
    if (!key || typeof(key) !== 'string') {
      logger('api', 'error', 'set metaData failure. Parameter invalid.');
      return;
    }
    if (this.metaData === undefined) {
      let metaData = {key: value};
      this.metaData = metaData;
    } else {
      this.metaData[key] = value;
    }
  }

  /**
   * Update user information.
   * Please set the data of this object beforehand.
   */
  public update(putUser: I.IUser): Promise<I.IFetchUserResponse> {
    return fetch(Client.API_ENDPOINT + '/users/' + this.userId, {
      method: 'PUT',
      headers: Client.JsonHeaders(),
      body: JSON.stringify(putUser)
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((user) => {
          this._data = user;
          return (
            {
              user: this,
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
   * Refresh user information to the latest.
   * A different client might update an existing user's information while you use the application continuously.
   */
  public reflesh(): Promise<I.IFetchUserResponse> {
    return fetch(Client.API_ENDPOINT + '/users/' + this.userId, {
      method: 'GET',
      headers: Client.JsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((user) => {
          this._data = <I.IUser>user;
          return (
            {
              user: this,
              error: null,
            } as I.IFetchUserResponse
          );
        });
      } else if (response.status === 404) {
        return {
          user: null,
          error: {
            title: response.statusText,
          } as I.IProblemDetail,
        } as I.IFetchUserResponse;
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
    return fetch(Client.API_ENDPOINT + '/messages', {
      method: 'POST',
      headers: Client.JsonHeaders(),
      body: JSON.stringify({messages: messages})
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
    return fetch(Client.API_ENDPOINT + '/rooms/' + roomId + '/users/' + this.userId, {
      method: 'PUT',
      headers: Client.JsonHeaders(),
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
    return fetch(Client.API_ENDPOINT + '/users/' + this.userId, {
      method: 'PUT',
      headers: Client.JsonHeaders(),
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
  public fileUpload(file: Blob): Promise<I.IPostAssetResponse> {
    let formData = new FormData();
    formData.append('asset', file);
    return fetch(Client.API_ENDPOINT + '/assets', {
      method: 'POST',
      headers: Client.BaseHeaders(),
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

  public getContacts(): Promise<I.IFetchUsersResponse> {
    return fetch(Client.API_ENDPOINT + '/contacts/' + this.userId, {
      method: 'GET',
      headers: Client.JsonHeaders(),
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
              users: null,
              error: <I.IProblemDetail>json,
            } as I.IFetchUsersResponse
          );
        });
      }
    }).catch((error) => {
      return {
        users: null,
        error: {
          title: error.message,
        } as I.IProblemDetail,
      } as I.IFetchUsersResponse;
    });
  }

  public addBlockUsers(userIds: string[]): Promise<I.IFetchBlockUsersResponse> {
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
    return fetch(Client.API_ENDPOINT + '/users/' + this.userId + '/blocks',
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

  public removeBlockUsers(userIds: string[]): Promise<I.IFetchBlockUsersResponse> {
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
    return fetch(Client.API_ENDPOINT + '/users/' + this.userId + '/blocks',
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
}
