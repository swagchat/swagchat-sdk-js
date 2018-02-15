import { Realtime, User, Room, logger } from './';
import * as I from './interface';

import 'isomorphic-fetch';

export class Client {
  private static _API_KEY: string;
  private static _API_SECRET: string;
  private static _REALTIME_CONFIG: I.IRealtimeConfig;
  private static _ACCESS_TOKEN: string | '';
  public static API_ENDPOINT: string;
  public static CONNECTION: Realtime;
  public speechRt: Realtime;
  public user: User;

  static get API_KEY(): string {
    return this._API_KEY;
  }

  static set API_KEY(apiKey: string) {
    this.API_KEY = apiKey;
  }

  set onConnected(callback: Function) {
    Client.CONNECTION.onConnected = callback;
  }

  set onError(callback: Function) {
    Client.CONNECTION.onError = callback;
  }

  set onClosed(callback: Function) {
    Client.CONNECTION.onClosed = callback;
  }

  static BaseHeaders(): Object {
    return {
      'X-SwagChat-Api-Key': Client._API_KEY,
      'X-SwagChat-Api-Secret': Client._API_SECRET,
      'Authorization': 'Bearer ' + Client._ACCESS_TOKEN,
    };
  }

  static JsonHeaders(): {} {
    return Object.assign(
      this.BaseHeaders(),
      {'Content-Type': 'application/json'},
    );
  }

  constructor(params: I.IClientParams) {
    logger('api', 'info', 'Initializing API Client...');
    Client._API_KEY = params.apiKey;
    Client._API_SECRET = params.apiSecret;
    Client.API_ENDPOINT = params.apiEndpoint;
    if (params.hasOwnProperty('realtime') && params.realtime!.hasOwnProperty('endpoint') && params.realtime!.endpoint !== '') {
      Client._REALTIME_CONFIG = <I.IRealtimeConfig>params.realtime;
    }

    logger('api', 'info', 'Initialized API Client OK');
  }

  public socketClose() {
    Client.CONNECTION.close();
  }

  public auth(params: I.IAuthParams): Promise<I.IFetchUserResponse> {
    return fetch(Client.API_ENDPOINT + '/users/' + params.userId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + params.accessToken,
      },
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((user) => {
          Client.CONNECTION = new Realtime(Client._REALTIME_CONFIG.endpoint, user.userId);

          Client._ACCESS_TOKEN = params.accessToken || '';
          this.user = new User(user);
          return (
            {
              user: this.user,
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

  public createSpeechRt() {
    let speechRt = new Realtime(Client._REALTIME_CONFIG.endpoint + '/speech', null);
    speechRt.conn.binaryType = 'arraybuffer';
    this.speechRt = speechRt;
  }

  public createUser(createUserObject: I.IUser): Promise<I.IFetchUserResponse> {
    return fetch(Client.API_ENDPOINT + '/users', {
      method: 'POST',
      headers: Client.JsonHeaders(),
      body: JSON.stringify(createUserObject)
    }).then((response: Response) => {
      if (response.status === 201) {
        return response.json().then((user) => {
          return (
            {
              user: new User(user),
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

  public getUsers(): Promise<I.IFetchUsersResponse> {
    return fetch(Client.API_ENDPOINT + '/users', {
      method: 'GET',
      headers: Client.JsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((users) => {
          return (
            {
              users: <I.IUser[]>users,
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

  public getUser(userId: string, accessToken?: string): Promise<I.IFetchUserResponse> {
    return fetch(Client.API_ENDPOINT + '/users/' + userId, {
      method: 'GET',
      headers: Client.JsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((user) => {
          user.accessToken = accessToken || '';
          return (
            {
              user: new User(user),
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

  public removeUser(userId: string): Promise<I.IErrorResponse> {
    return fetch(Client.API_ENDPOINT + '/users/' + userId, {
      method: 'DELETE',
      headers: Client.JsonHeaders(),
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

  public createRoom(createRoomObject: I.IRoom): Promise<I.IFetchRoomResponse> {
    return fetch(Client.API_ENDPOINT + '/rooms', {
      method: 'POST',
      headers: Client.JsonHeaders(),
      body: JSON.stringify(createRoomObject)
    }).then((response: Response) => {
      if (response.status === 201) {
        return response.json().then((room) => {
          return (
            {
              room: new Room(room),
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

  public getRooms(): Promise<I.IFetchRoomsResponse> {
    return fetch(Client.API_ENDPOINT + '/rooms', {
      method: 'GET',
      headers: Client.JsonHeaders(),
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

  public getRoom(roomId: string): Promise<I.IFetchRoomResponse> {
    return fetch(Client.API_ENDPOINT + '/rooms/' + roomId, {
      method: 'GET',
      headers: Client.JsonHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
      return response.json().then((room) => {
        return (
          {
            room: new Room(room),
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

  public removeRoom(roomId: string): Promise<I.IErrorResponse> {
    return fetch(Client.API_ENDPOINT + '/rooms/' + roomId, {
      method: 'DELETE',
      headers: Client.JsonHeaders(),
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

  public getSetting(): Promise<I.IFetchSettingResponse> {
    return fetch(Client.API_ENDPOINT + '/setting', {
      method: 'GET',
      headers: Client.JsonHeaders(),
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
}
