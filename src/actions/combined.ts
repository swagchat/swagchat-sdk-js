import { Action } from 'redux';
import { store } from '../stores';
import { IMessage, IRoom } from '../';

export const FETCH_ROOM_AND_MESSAGES_REQUEST = 'FETCH_ROOM_AND_MESSAGES_REQUEST';
export const FETCH_USER_AND_ROOM_AND_MESSAGES_REQUEST = 'FETCH_USER_AND_ROOM_AND_MESSAGES_REQUEST';
export const FETCH_USER_AND_ROOM_REQUEST = 'FETCH_USER_AND_ROOM_REQUEST';
export const UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST = 'UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST';
export const UPDATE_MESSAGES_AND_SCROLL_BOTTOM = 'UPDATE_MESSAGES_AND_SCROLL_BOTTOM';
export const CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST = 'CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST';
export const UPLOAD_ASSET_AND_UPDATE_ROOM_REQUEST = 'UPLOAD_ASSET_AND_UPDATE_ROOM_REQUEST';
export const UPLOAD_ASSET_AND_CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST = 'UPLOAD_ASSET_AND_CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST';

export type CombinedActionTypes = typeof FETCH_ROOM_AND_MESSAGES_REQUEST
  | typeof FETCH_USER_AND_ROOM_AND_MESSAGES_REQUEST
  | typeof FETCH_USER_AND_ROOM_REQUEST
  | typeof UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST
  | typeof UPDATE_MESSAGES_AND_SCROLL_BOTTOM
  | typeof CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST
  | typeof UPLOAD_ASSET_AND_UPDATE_ROOM_REQUEST
  | typeof UPLOAD_ASSET_AND_CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST
;

export interface IFetchRoomAndMessagesRequestAction extends Action {
  type: CombinedActionTypes;
  roomId: string;
}
export const fetchRoomAndMessagesRequestActionCreator = (roomId: string): IFetchRoomAndMessagesRequestAction => ({
  type: FETCH_ROOM_AND_MESSAGES_REQUEST,
  roomId: roomId,
});

export interface IFetchUserAndRoomAndMessagesRequestAction extends Action {
  type: CombinedActionTypes;
  apiKey: string;
  apiEndpoint: string;
  realtimeEndpoint: string;
  userId: string;
  accessToken: string;
  roomId: string;
}
export const fetchUserAndRoomAndMessagesRequestActionCreator = (apiKey: string, apiEndpoint: string, realtimeEndpoint: string, userId: string, accessToken: string, roomId: string): IFetchUserAndRoomAndMessagesRequestAction => ({
  type: FETCH_USER_AND_ROOM_AND_MESSAGES_REQUEST,
  apiKey: apiKey,
  apiEndpoint: apiEndpoint,
  realtimeEndpoint: realtimeEndpoint,
  userId: userId,
  accessToken: accessToken,
  roomId: roomId,
});

export interface IFetchUserAndRoomRequestAction extends Action {
  type: CombinedActionTypes;
  apiKey: string;
  apiEndpoint: string;
  realtimeEndpoint: string;
  userId: string;
  accessToken: string;
  roomId: string;
}
export const fetchUserAndRoomRequestActionCreator = (apiKey: string, apiEndpoint: string, realtimeEndpoint: string, userId: string, accessToken: string, roomId: string): IFetchUserAndRoomRequestAction => ({
  type: FETCH_USER_AND_ROOM_REQUEST,
  apiKey: apiKey,
  apiEndpoint: apiEndpoint,
  realtimeEndpoint: realtimeEndpoint,
  userId: userId,
  accessToken: accessToken,
  roomId: roomId,
});

export interface IUploadAssetAndSendMessageRequestAction extends Action {
  type: CombinedActionTypes;
  file: Blob;
}
export const uploadAssetAndSendMessageRequestActionCreator = (file: Blob): IUploadAssetAndSendMessageRequestAction => ({
  type: UPLOAD_ASSET_AND_SEND_MESSAGE_REQUEST,
  file: file,
});

export interface IUpdateMessagesAndScrollBottomAction extends Action {
  type: CombinedActionTypes;
  messages: IMessage[];
}
export const updateMessagesAndScrollBottomActionCreator = (messages: IMessage[]): IUpdateMessagesAndScrollBottomAction => ({
  type: UPDATE_MESSAGES_AND_SCROLL_BOTTOM,
  messages: messages,
});

export interface ICreateRoomAndFetchMessagesRequestAction extends Action {
  type: CombinedActionTypes;
  room: IRoom;
}
export const createRoomAndFetchMessagesRequestActionCreator = (room: IRoom): ICreateRoomAndFetchMessagesRequestAction => ({
  type: CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST,
  room: room,
});

export interface IUploadAssetAndUpdateRoomRequestAction extends Action {
  type: CombinedActionTypes;
}
export const uploadAssetAndUpdateRoomRequestActionCreator = (): IUploadAssetAndUpdateRoomRequestAction => ({
  type: UPLOAD_ASSET_AND_UPDATE_ROOM_REQUEST,
});

export interface IUploadAssetAndCreateRoomAndFetchMessagesRequestAction extends Action {
  type: CombinedActionTypes;
}
export const uploadAssetAndCreateRoomAndFetchMessagesRequestActionCreator = (): IUploadAssetAndCreateRoomAndFetchMessagesRequestAction => ({
  type: UPLOAD_ASSET_AND_CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST,
});

export type CombinedActions = IFetchRoomAndMessagesRequestAction
  | IFetchUserAndRoomAndMessagesRequestAction
  | IFetchUserAndRoomRequestAction
  | IUploadAssetAndSendMessageRequestAction
  | IUpdateMessagesAndScrollBottomAction
  | ICreateRoomAndFetchMessagesRequestAction
  | IUploadAssetAndUpdateRoomRequestAction
  | IUploadAssetAndCreateRoomAndFetchMessagesRequestAction
;

export const uploadAssetAndUpdateRoomRequestActionDispatch = () => store.dispatch(uploadAssetAndUpdateRoomRequestActionCreator());
export const createRoomAndFetchMessagesRequestActionDispatch = (room: IRoom) => store.dispatch(createRoomAndFetchMessagesRequestActionCreator(room));
export const uploadAssetAndCreateRoomAndFetchMessagesRequestActionDispatch = () => store.dispatch(uploadAssetAndCreateRoomAndFetchMessagesRequestActionCreator());
export const uploadAssetAndSendMessageRequestActionDispatch = (file: Blob) => store.dispatch(uploadAssetAndSendMessageRequestActionCreator(file));
export const fetchRoomAndMessagesRequestActionDispatch = (roomId: string) => store.dispatch(fetchRoomAndMessagesRequestActionCreator(roomId));