import { Action } from 'redux';
import { IMessage, IRoom } from '../';
export declare const COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST = "COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST";
export declare const COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST = "COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST";
export declare const COMBINED_USER_AND_ROOM_FETCH_REQUEST = "COMBINED_USER_AND_ROOM_FETCH_REQUEST";
export declare const COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST = "COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST";
export declare const COMBINED_UPDATE_MESSAGES = "COMBINED_UPDATE_MESSAGES";
export declare const COMBINED_CREATE_ROOM_AND_MESSAGES_FETCH_REQUEST = "COMBINED_CREATE_ROOM_AND_MESSAGES_FETCH_REQUEST";
export declare const COMBINED_ASSET_POST_AND_ROOM_UPDATE_REQUEST = "COMBINED_ASSET_POST_AND_ROOM_UPDATE_REQUEST";
export declare const COMBINED_ASSET_POST_AND_ROOM_CREATE_AND_MESSAGES_FETCH_REQUEST = "COMBINED_ASSET_POST_AND_ROOM_CREATE_AND_MESSAGES_FETCH_REQUEST";
export declare type CombinedActionTypes = typeof COMBINED_ROOM_AND_MESSAGES_FETCH_REQUEST | typeof COMBINED_USER_AND_ROOM_AND_MESSAGES_FETCH_REQUEST | typeof COMBINED_USER_AND_ROOM_FETCH_REQUEST | typeof COMBINED_ASSET_POST_AND_SEND_MESSAGE_REQUEST | typeof COMBINED_UPDATE_MESSAGES | typeof COMBINED_CREATE_ROOM_AND_MESSAGES_FETCH_REQUEST | typeof COMBINED_ASSET_POST_AND_ROOM_UPDATE_REQUEST | typeof COMBINED_ASSET_POST_AND_ROOM_CREATE_AND_MESSAGES_FETCH_REQUEST;
export interface ICombinedRoomAndMessagesFetchRequestAction extends Action {
    type: CombinedActionTypes;
    roomId: string;
}
export declare const combinedRoomAndMessagesFetchRequestActionCreator: (roomId: string) => ICombinedRoomAndMessagesFetchRequestAction;
export interface ICombinedUserAndRoomAndMessagesFetchRequestAction extends Action {
    type: CombinedActionTypes;
    apiKey: string;
    apiEndpoint: string;
    realtimeEndpoint: string;
    userId: string;
    accessToken: string;
    roomId: string;
}
export declare const combinedUserAndRoomAndMessagesFetchRequestActionCreator: (apiKey: string, apiEndpoint: string, realtimeEndpoint: string, userId: string, accessToken: string, roomId: string) => ICombinedUserAndRoomAndMessagesFetchRequestAction;
export interface ICombinedUserAndRoomFetchRequestAction extends Action {
    type: CombinedActionTypes;
    apiKey: string;
    apiEndpoint: string;
    realtimeEndpoint: string;
    userId: string;
    accessToken: string;
    roomId: string;
}
export declare const combinedUserAndRoomFetchRequestActionCreator: (apiKey: string, apiEndpoint: string, realtimeEndpoint: string, userId: string, accessToken: string, roomId: string) => ICombinedUserAndRoomFetchRequestAction;
export interface ICombinedAssetPostAndSendMessageRequestAction extends Action {
    type: CombinedActionTypes;
    file: Blob;
}
export declare const combinedAssetPostAndSendMessageRequestActionCreator: (file: Blob) => ICombinedAssetPostAndSendMessageRequestAction;
export interface ICombinedUpdateMessagesAction extends Action {
    type: CombinedActionTypes;
    messages: IMessage[];
}
export declare const combinedUpdateMessagesActionCreator: (messages: IMessage[]) => ICombinedUpdateMessagesAction;
export interface ICombinedCreateRoomAndMessagesFetchRequestAction extends Action {
    type: CombinedActionTypes;
    room: IRoom;
}
export declare const combinedCreateRoomAndMessagesFetchRequestActionCreator: (room: IRoom) => ICombinedCreateRoomAndMessagesFetchRequestAction;
export interface ICombinedAssetPostAndRoomUpdateRequestAction extends Action {
    type: CombinedActionTypes;
}
export declare const combinedAssetPostAndRoomUpdateRequestActionCreator: () => ICombinedAssetPostAndRoomUpdateRequestAction;
export interface ICombinedAssetPostAndRoomCreatAndMessageFetchRequestAction extends Action {
    type: CombinedActionTypes;
}
export declare const combinedAssetPostAndRoomCreateAndMessageFetchRequestActionCreator: () => ICombinedAssetPostAndRoomCreatAndMessageFetchRequestAction;
export declare type CombinedActions = ICombinedRoomAndMessagesFetchRequestAction | ICombinedUserAndRoomAndMessagesFetchRequestAction | ICombinedUserAndRoomFetchRequestAction | ICombinedAssetPostAndSendMessageRequestAction | ICombinedUpdateMessagesAction | ICombinedCreateRoomAndMessagesFetchRequestAction | ICombinedAssetPostAndRoomUpdateRequestAction | ICombinedAssetPostAndRoomCreatAndMessageFetchRequestAction;
