import 'isomorphic-fetch';
import { History, createHashHistory } from 'history';
import { Realtime } from './Realtime';
import { EventType } from './const';
import { logger } from './utils';
import * as I from './interface';
import { User, IUserParams } from './User';

export interface IClientParams {
  apiEndpoint: string;
  wsEndpoint?: string;
  clientId?: string;
  userId?: string;
  accessToken?: string;
  paths?: IPaths;
  history?: History;
  isGuest?: boolean;
  realm?: string;
  renderDomId?: string;
  renderDomSize?: IRenderDomSize;
  updateLastAccessRoomId?: boolean;
  singlePaneView?: boolean;
  settings?: ISettings;
}

export interface IRenderDomSize {
  width: string;
  height: string;
}

export interface ISettings {
  roomListPagingCount?: number;
  messageListPagingCount?: number;
  messageListPlaceholderCount?: number;
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
  private _clientId: string;
  private _userId: string;
  private _accessToken: string;
  private _conn: Realtime;
  // private _speechRt: Realtime;
  private _paths: IPaths;
  private _history: History;
  // private _realm: string;
  private _settings: ISettings;
  private _renderDomSize: IRenderDomSize;


  public updateLastAccessRoomId: boolean;
  public singlePaneView: boolean;
  public refreshAccessToken: () => void;

  get apiEndpoint(): string {
    return this._apiEndpoint;
  }

  get userId(): string {
    return this._userId;
  }

  get accessToken(): string {
    return this._accessToken;
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

  get settings(): ISettings {
    return this._settings;
  }

  get renderDomSize(): IRenderDomSize {
    return this._renderDomSize;
  }

  public setHeaders(userId?: string): { [key: string]: string } {
    let baseHeaders = {'Content-Type': 'application/json'};

    if (this._clientId !== undefined) {
      baseHeaders = Object.assign(
        baseHeaders,
        {'X-ClientId': this._clientId}
      );
    }

    if (this._accessToken !== undefined) {
      baseHeaders = Object.assign(
        baseHeaders,
        {'Authorization': 'Bearer ' + this._accessToken},
      );
    }

    if (userId !== undefined) {
      baseHeaders = Object.assign(
        baseHeaders,
        {'X-Sub': userId},
      );
    }

    return baseHeaders;
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

    if (params.clientId !== undefined) {
      if (!params.clientId || params.clientId === '' || typeof(params.clientId) !== 'string') {
        logger('api', 'error', 'Initialize error. clientId is invalid.');
        return;
      }
      this._clientId = params.clientId!;
    }

    if (params.userId !== undefined) {
      if (!params.userId || params.userId === '' || typeof(params.userId) !== 'string') {
        logger('api', 'error', 'Initialize error. userId is invalid.');
        return;
      }
      this._userId = params.userId!;
    }

    if (params.accessToken !== undefined) {
      if (!params.accessToken || params.accessToken === '' || typeof(params.accessToken) !== 'string') {
        logger('api', 'error', 'Initialize error. accessToken is invalid.');
        return;
      }
      this._accessToken = params.accessToken!;
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
    } else {
      this._paths = {
        accountPath: '/account',
        messageListPath: '/messages',
        profilePath: '/profile',
        roomListPath: '/rooms',
        roomSettingPath: '/roomSetting'
      } as IPaths;
    }

    if (params.history !== undefined) {
      this._history = params.history;
    } else {
      this._history = createHashHistory();
    }

    // if (params.realm !== undefined) {
    //   this._realm = params.realm;
    // }

    if (params.updateLastAccessRoomId === undefined) {
      this.updateLastAccessRoomId = false;
    } else {
      this.updateLastAccessRoomId = params.updateLastAccessRoomId;
    }

    if (params.singlePaneView === undefined) {
      this.singlePaneView = true;
    } else {
      this.singlePaneView = params.singlePaneView;
    }

    if (params.settings !== undefined) {
      this._settings = params.settings;
    } else {
      this._settings = {} as ISettings;
    }

    if (params.renderDomSize !== undefined) {
      this._renderDomSize = params.renderDomSize;
    } else {
      this._renderDomSize = {} as IRenderDomSize;
    }

    this.defaultSettings();

    logger('api', 'info', 'Initialized API Client OK');
  }

  private defaultSettings() {
    if (this._settings.roomListPagingCount === undefined) {
      this._settings.roomListPagingCount = 20;
    }
    if (this._settings.messageListPagingCount === undefined) {
      this._settings.messageListPagingCount = 20;
    }
    if (this._settings.messageListPlaceholderCount === undefined) {
      this._settings.messageListPlaceholderCount = 10;
    }
  }

  public socketOpen(userId: string) {
    if (this._wsEndpoint && userId) {
      this._conn = new Realtime(this._wsEndpoint, userId);
    }
  }

  public socketClose() {
    this._conn.close();
  }

  /**
   * Create websocket connection for speech
   */
  // public createSpeechRt() {
  //   const speechRt = new Realtime(this._wsEndpoint + '/speech');
  //   speechRt.conn.binaryType = 'arraybuffer';
  //   this._speechRt = speechRt;
  // }

  /**
   * Create a user
   */
  public createUser(req: I.ICreateUserRequest): Promise<I.ICreateUserResponse> {
    const CreateUserRequest = require('swagchat-protobuf/userMessage_pb').CreateUserRequest;
    const pbReq = new CreateUserRequest();
    pbReq.setUserId(req.userId);
    pbReq.setName(req.name!);
    pbReq.setRolesList(req.rolesList);
    const body = pbReq.toObject();
    body['metaData'] = req.metaDataObj;
    body['roles'] = req.rolesList;

    const res = {
      user: null,
      error: null,
    } as I.ICreateUserResponse;

    return fetch(this._apiEndpoint + '/users', {
      method: 'POST',
      headers: this.setHeaders(),
      body: JSON.stringify(body)
    }).then((response: Response) => {
      if (response.status === 201) {
        return response.json().then(user => {
          const params = {
            apiEndpoint: this.apiEndpoint,
            accessToken: this.accessToken,
            user,
            client: this
          } as IUserParams;
          res.user = new User(params);
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
   * Retrieves a user
   */
  public retrieveUser(req: I.IRetrieveUserRequest): Promise<I.IFetchUserResponse> {
    const res = {
      user: null,
      error: null,
    } as I.IFetchUserResponse;

    return fetch(this._apiEndpoint + '/users/' + req.userId, {
      method: 'GET',
      headers: this.setHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then(user => {
          const params = {
            apiEndpoint: this.apiEndpoint,
            accessToken: this.accessToken,
            user,
            client: this
          } as IUserParams;
          res.user = new User(params);
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
   * Retrieve room list
   */
  public retrieveRooms(): Promise<I.IFetchRoomsResponse> {
    const res = {
      rooms: [],
      error: null,
    } as I.IFetchRoomsResponse;

    return fetch(this._apiEndpoint + '/rooms', {
      method: 'GET',
      headers: this.setHeaders(),
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
   * Retrieve settings
   */
  public retrieveSetting(): Promise<I.IFetchSettingResponse> {
    const res = {
      setting: null,
      error: null,
    } as I.IFetchSettingResponse;

    return fetch(this._apiEndpoint + '/setting', {
      method: 'GET',
      headers: this.setHeaders(),
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
        res.error = {
          message: 'Setting not found.'
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
   * File upload.
   * @param file Image data.
   */
  public fileUpload(file: File, mime: string): Promise<I.IPostAssetResponse>;
  public fileUpload(file: File, mime: string, width: number, height: number): Promise<I.IPostAssetResponse>;
  public fileUpload(file: File, mime: string, width?: number, height?: number): Promise<I.IPostAssetResponse> {
    const res = {
      asset: null,
      error: null,
    } as I.IPostAssetResponse;

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
    let headers = this.setHeaders();
    delete(headers['Content-Type']);

    return fetch(this._apiEndpoint + '/assets', {
      method: 'POST',
      headers: this.setHeaders(),
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
   * Retrieve asset info
   */
  public retrieveAssetInfo(filename: string): Promise<I.IHeadAssetResponse> {
    const res = {
      size: 0,
      width: 0,
      height: 0,
      error: null,
    } as I.IHeadAssetResponse;

    return fetch(this._apiEndpoint + '/assets/' + filename + '/info', {
      method: 'GET',
      headers: this.setHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.json().then((asset: I.IAsset) => {
          return (
            {
              size: asset.size,
              width: asset.width,
              height: asset.height,
              error: null,
            } as I.IHeadAssetResponse
          );
        });
      } else if (response.status === 404) {
        res.error = {
          message: 'Asset not found.'
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
   * Retrieve asset data url
   */
  public retrieveAssetDataUrl(filename: string): Promise<string> {
    return fetch(this._apiEndpoint + '/assets/' + filename, {
      method: 'GET',
      headers: this.setHeaders(),
    }).then((response: Response) => {
      if (response.status === 200) {
        return response.arrayBuffer().then((buffer: ArrayBuffer) => {
          const base64Flag = 'data:image/jpeg;base64,';
          const imageStr = this.arrayBufferToBase64(buffer);
          const dataUrl = base64Flag + imageStr;
          return dataUrl;
        });
      } else {
        return '';
      }
    }).catch(() => {
      return '';
    });
  }

  private arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b: number) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  }

  public subscribe(eventType: EventType, funcName: string, onMessage: Function): void {
    if (this._conn) {
      this._conn.subscribe(eventType, funcName, onMessage);
    }
  }

  public unsubscribe(eventType: EventType, funcName: string): void {
    if (this._conn) {
      this._conn.unsubscribe(eventType, funcName);
    }
  }
}
