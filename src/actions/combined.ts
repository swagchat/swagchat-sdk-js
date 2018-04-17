import { Action } from 'redux';

export const CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST = 'CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST';
export const UPLOAD_ASSET_AND_UPDATE_USER_REQUEST = 'UPLOAD_ASSET_AND_UPDATE_USER_REQUEST';
export const UPLOAD_ASSET_AND_UPDATE_ROOM_REQUEST = 'UPLOAD_ASSET_AND_UPDATE_ROOM_REQUEST';
export const CREATE_GUESTUSER_AND_CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST = 'CREATE_GUESTUSER_AND_CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST';

export type CombinedActionTypes =
  typeof CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST |
  typeof UPLOAD_ASSET_AND_UPDATE_USER_REQUEST |
  typeof UPLOAD_ASSET_AND_UPDATE_ROOM_REQUEST |
  typeof CREATE_GUESTUSER_AND_CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST
;

export interface CombinedBaseAction extends Action {
  type: CombinedActionTypes;
}

export interface CreateRoomAndFetchMessagesRequestAction extends CombinedBaseAction {
}
export const createRoomAndFetchMessagesRequestActionCreator = (): CreateRoomAndFetchMessagesRequestAction => ({
  type: CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST,
});

export interface UploadAssetAndUpdateUserRequestAction extends CombinedBaseAction {
  type: CombinedActionTypes;
  userName: string;
  file: File | null;
}
export const uploadAssetAndUpdateUserRequestActionCreator = (userName: string, file: File | null): UploadAssetAndUpdateUserRequestAction => ({
  type: UPLOAD_ASSET_AND_UPDATE_USER_REQUEST,
  userName: userName,
  file: file,
});

export interface UploadAssetAndUpdateRoomRequestAction extends CombinedBaseAction {
  type: CombinedActionTypes;
  roomName: string;
  file: File | null;
}
export const uploadAssetAndUpdateRoomRequestActionCreator = (roomName: string, file: File | null): UploadAssetAndUpdateRoomRequestAction => ({
  type: UPLOAD_ASSET_AND_UPDATE_ROOM_REQUEST,
  roomName: roomName,
  file: file,
});

export interface CreateGuestuserAndCreateRoomAndFetchMessagesRequestAction extends CombinedBaseAction {
}
export const createGuestuserAndCreateRoomAndFetchMessagesRequestActionCreator = (): CreateGuestuserAndCreateRoomAndFetchMessagesRequestAction => ({
  type: CREATE_GUESTUSER_AND_CREATE_ROOM_AND_FETCH_MESSAGES_REQUEST,
});


export type CombinedActions =
  CombinedBaseAction |
  CreateRoomAndFetchMessagesRequestAction |
  UploadAssetAndUpdateUserRequestAction |
  UploadAssetAndUpdateRoomRequestAction |
  CreateGuestuserAndCreateRoomAndFetchMessagesRequestAction
;
