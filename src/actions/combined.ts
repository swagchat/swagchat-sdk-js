import { Action } from 'redux';
import { IMessage, IRoom } from '../';

export const COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST = 'COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST';
export const COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST = 'COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST';
export const COMBINED_USER_AND_ROOM_FETCH_REQUEST = 'COMBINED_USER_AND_ROOM_FETCH_REQUEST';
export const COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST = 'COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST';
export const COMBINED_UPDATE_MESSAGES = 'COMBINED_UPDATE_MESSAGES';
export const COMBINED_CREATE_ROOM_AND_MESSAGES_FETCH_REQUEST = 'COMBINED_CREATE_ROOM_AND_MESSAGES_FETCH_REQUEST';
export const COMBINED_ASSET_POST_AND_ROOM_UPDATE_REQUEST = 'COMBINED_ASSET_POST_AND_ROOM_UPDATE_REQUEST';
export const COMBINED_ASSET_POST_AND_ROOM_CREATE_AND_MESSAGES_FETCH_REQUEST = 'COMBINED_ASSET_POST_AND_ROOM_CREATE_AND_MESSAGES_FETCH_REQUEST';

export type CombinedActionTypes = typeof COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST
  | typeof COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST
  | typeof COMBINED_USER_AND_ROOM_FETCH_REQUEST
  | typeof COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST
  | typeof COMBINED_UPDATE_MESSAGES
  | typeof COMBINED_CREATE_ROOM_AND_MESSAGES_FETCH_REQUEST
  | typeof COMBINED_ASSET_POST_AND_ROOM_UPDATE_REQUEST
  | typeof COMBINED_ASSET_POST_AND_ROOM_CREATE_AND_MESSAGES_FETCH_REQUEST
;

export interface ICombinedRoomAndMessagesFetchRequestAction extends Action {
  type: CombinedActionTypes;
  roomId: string;
}
export const combinedRoomAndMessagesFetchRequestActionCreator = (roomId: string): ICombinedRoomAndMessagesFetchRequestAction => ({
  type: COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST,
  roomId: roomId,
});

export interface ICombinedUserAndRoomAndMessagesFetchRequestAction extends Action {
  type: CombinedActionTypes;
  apiKey: string;
  apiEndpoint: string;
  realtimeEndpoint: string;
  userId: string;
  accessToken: string;
  roomId: string;
}
export const combinedUserAndRoomAndMessagesFetchRequestActionCreator = (apiKey: string, apiEndpoint: string, realtimeEndpoint: string, userId: string, accessToken: string, roomId: string): ICombinedUserAndRoomAndMessagesFetchRequestAction => ({
  type: COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST,
  apiKey: apiKey,
  apiEndpoint: apiEndpoint,
  realtimeEndpoint: realtimeEndpoint,
  userId: userId,
  accessToken: accessToken,
  roomId: roomId,
});

export interface ICombinedUserAndRoomFetchRequestAction extends Action {
  type: CombinedActionTypes;
  apiKey: string;
  apiEndpoint: string;
  realtimeEndpoint: string;
  userId: string;
  accessToken: string;
  roomId: string;
}
export const combinedUserAndRoomFetchRequestActionCreator = (apiKey: string, apiEndpoint: string, realtimeEndpoint: string, userId: string, accessToken: string, roomId: string): ICombinedUserAndRoomFetchRequestAction => ({
  type: COMBINED_USER_AND_ROOM_FETCH_REQUEST,
  apiKey: apiKey,
  apiEndpoint: apiEndpoint,
  realtimeEndpoint: realtimeEndpoint,
  userId: userId,
  accessToken: accessToken,
  roomId: roomId,
});

export interface ICombinedAssetPostAndSendMessageRequestAction extends Action {
  type: CombinedActionTypes;
  file: Blob;
}
export const combinedAssetPostAndSendMessageRequestActionCreator = (file: Blob): ICombinedAssetPostAndSendMessageRequestAction => ({
  type: COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST,
  file: file,
});

export interface ICombinedUpdateMessagesAction extends Action {
  type: CombinedActionTypes;
  messages: IMessage[];
}
export const combinedUpdateMessagesActionCreator = (messages: IMessage[]): ICombinedUpdateMessagesAction => ({
  type: COMBINED_UPDATE_MESSAGES,
  messages: messages,
});

export interface ICombinedCreateRoomAndMessagesFetchRequestAction extends Action {
  type: CombinedActionTypes;
  room: IRoom;
}
export const combinedCreateRoomAndMessagesFetchRequestActionCreator = (room: IRoom): ICombinedCreateRoomAndMessagesFetchRequestAction => ({
  type: COMBINED_CREATE_ROOM_AND_MESSAGES_FETCH_REQUEST,
  room: room,
});

export interface ICombinedAssetPostAndRoomUpdateRequestAction extends Action {
  type: CombinedActionTypes;
}
export const combinedAssetPostAndRoomUpdateRequestActionCreator = (): ICombinedAssetPostAndRoomUpdateRequestAction => ({
  type: COMBINED_ASSET_POST_AND_ROOM_UPDATE_REQUEST,
});

export interface ICombinedAssetPostAndRoomCreatAndMessageFetchRequestAction extends Action {
  type: CombinedActionTypes;
}
export const combinedAssetPostAndRoomCreateAndMessageFetchRequestActionCreator = (): ICombinedAssetPostAndRoomCreatAndMessageFetchRequestAction => ({
  type: COMBINED_ASSET_POST_AND_ROOM_CREATE_AND_MESSAGES_FETCH_REQUEST,
});

export type CombinedActions = ICombinedRoomAndMessagesFetchRequestAction
  | ICombinedUserAndRoomAndMessagesFetchRequestAction
  | ICombinedUserAndRoomFetchRequestAction
  | ICombinedAssetPostAndSendMessageRequestAction
  | ICombinedUpdateMessagesAction
  | ICombinedCreateRoomAndMessagesFetchRequestAction
  | ICombinedAssetPostAndRoomUpdateRequestAction
  | ICombinedAssetPostAndRoomCreatAndMessageFetchRequestAction
;
