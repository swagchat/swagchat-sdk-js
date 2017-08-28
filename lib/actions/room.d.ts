import { Action } from 'redux';
import { Room, IRoom, IProblemDetail, IRoomUser } from '../';
export declare const ROOM_FETCH_REQUEST = "ROOM_FETCH_REQUEST";
export declare const ROOM_FETCH_REQUEST_SUCCESS = "ROOM_FETCH_REQUEST_SUCCESS";
export declare const ROOM_FETCH_REQUEST_FAILURE = "ROOM_FETCH_REQUEST_FAILURE";
export declare const ROOM_UPDATE_REQUEST = "ROOM_UPDATE_REQUEST";
export declare const ROOM_USER_ADD_FETCH_REQUEST = "ROOM_USER_ADD_FETCH_REQUEST";
export declare const ROOM_USER_ADD_FETCH_REQUEST_SUCCESS = "ROOM_USER_ADD_FETCH_REQUEST_SUCCESS";
export declare const ROOM_USER_ADD_FETCH_REQUEST_FAILURE = "ROOM_USER_ADD_FETCH_REQUEST_FAILURE";
export declare const ROOM_USER_REMOVE_FETCH_REQUEST = "ROOM_USER_REMOVE_FETCH_REQUEST";
export declare const ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS = "ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS";
export declare const ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE = "ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE";
export declare const ROOM_UPDATE_NAME = "ROOM_UPDATE_NAME";
export declare const ROOM_UPDATE_PICTURE = "ROOM_UPDATE_PICTURE";
export declare const ROOM_UPDATE_PICTURE_URL = "ROOM_UPDATE_PICTURE_URL";
export declare const ROOM_UPDATE_TYPE = "ROOM_UPDATE_TYPE";
export declare const ROOM_UPDATE_CLEAR = "ROOM_UPDATE_CLEAR";
export declare type RoomActionTypes = typeof ROOM_FETCH_REQUEST | typeof ROOM_FETCH_REQUEST_SUCCESS | typeof ROOM_FETCH_REQUEST_FAILURE | typeof ROOM_UPDATE_REQUEST | typeof ROOM_USER_ADD_FETCH_REQUEST | typeof ROOM_USER_ADD_FETCH_REQUEST_SUCCESS | typeof ROOM_USER_ADD_FETCH_REQUEST_FAILURE | typeof ROOM_USER_REMOVE_FETCH_REQUEST | typeof ROOM_USER_REMOVE_FETCH_REQUEST_SUCCESS | typeof ROOM_USER_REMOVE_FETCH_REQUEST_FAILURE | typeof ROOM_UPDATE_NAME | typeof ROOM_UPDATE_PICTURE | typeof ROOM_UPDATE_PICTURE_URL | typeof ROOM_UPDATE_CLEAR | typeof ROOM_UPDATE_TYPE;
export interface IRoomFetchRequestAction extends Action {
    type: RoomActionTypes;
    roomId: string;
}
export declare const roomFetchRequestActionCreator: (roomId: string) => IRoomFetchRequestAction;
export interface IRoomFetchRequestSuccessAction extends Action {
    type: RoomActionTypes;
    room: Room;
}
export declare const roomFetchRequestSuccessActionCreator: (room: Room) => IRoomFetchRequestSuccessAction;
export interface IRoomFetchRequestFailureAction extends Action {
    type: RoomActionTypes;
    problemDetail: IProblemDetail;
}
export declare const roomFetchRequestFailureActionCreator: (problemDetail: IProblemDetail) => IRoomFetchRequestFailureAction;
export interface IRoomUpdateRequestAction extends Action {
    type: RoomActionTypes;
    putRoom: IRoom;
}
export declare const roomUpdateRequestActionCreator: (putRoom: IRoom) => IRoomUpdateRequestAction;
export interface IRoomUserAddFetchRequestAction extends Action {
    type: RoomActionTypes;
    userIds: string[];
}
export declare const roomUserAddFetchRequestActionCreator: (userIds: string[]) => IRoomUserAddFetchRequestAction;
export interface IRoomUserAddFetchRequestSuccessAction extends Action {
    type: RoomActionTypes;
    roomUsers: IRoomUser[];
}
export declare const roomUserAddFetchRequestSuccessActionCreator: (roomUsers: IRoomUser[]) => IRoomUserAddFetchRequestSuccessAction;
export interface IRoomUserAddFetchRequestFailureAction extends Action {
    type: RoomActionTypes;
    problemDetail: IProblemDetail;
}
export declare const roomUserAddFetchRequestFailureActionCreator: (problemDetail: IProblemDetail) => IRoomUserAddFetchRequestFailureAction;
export interface IRoomUserRemoveFetchRequestAction extends Action {
    type: RoomActionTypes;
    userIds: string[];
}
export declare const roomUserRemoveFetchRequestActionCreator: (userIds: string[]) => IRoomUserRemoveFetchRequestAction;
export interface IRoomUserRemoveFetchRequestSuccessAction extends Action {
    type: RoomActionTypes;
    roomUsers: IRoomUser[];
}
export declare const roomUserRemoveFetchRequestSuccessActionCreator: (roomUsers: IRoomUser[]) => IRoomUserRemoveFetchRequestSuccessAction;
export interface IRoomUserRemoveFetchRequestFailureAction extends Action {
    type: RoomActionTypes;
    problemDetail: IProblemDetail;
}
export declare const roomUserRemoveFetchRequestFailureActionCreator: (problemDetail: IProblemDetail) => IRoomUserRemoveFetchRequestFailureAction;
export interface IRoomUpdateNameAction extends Action {
    type: RoomActionTypes;
    updateName: string;
}
export declare const roomUpdateNameActionCreator: (updateName: string) => IRoomUpdateNameAction;
export interface IRoomUpdatePictureAction extends Action {
    type: RoomActionTypes;
    updatePicture: Blob;
}
export declare const roomUpdatePictureActionCreator: (updatePicture: Blob) => IRoomUpdatePictureAction;
export interface IRoomUpdatePictureUrlAction extends Action {
    type: RoomActionTypes;
    updatePictureUrl: string;
}
export declare const roomUpdatePictureUrlActionCreator: (updatePictureUrl: string) => IRoomUpdatePictureUrlAction;
export interface IRoomUpdateTypeAction extends Action {
    type: RoomActionTypes;
    updateType: number;
}
export declare const roomUpdateTypeActionCreator: (updateType: number) => IRoomUpdateTypeAction;
export interface IRoomUpdateClearAction extends Action {
    type: RoomActionTypes;
}
export declare const roomUpdateClearActionCreator: () => IRoomUpdateClearAction;
export declare type RoomActions = IRoomFetchRequestAction | IRoomFetchRequestSuccessAction | IRoomFetchRequestFailureAction | IRoomUserAddFetchRequestAction | IRoomUserAddFetchRequestSuccessAction | IRoomUserAddFetchRequestFailureAction | IRoomUserRemoveFetchRequestAction | IRoomUserRemoveFetchRequestSuccessAction | IRoomUserRemoveFetchRequestFailureAction | IRoomUpdateNameAction | IRoomUpdatePictureAction | IRoomUpdatePictureUrlAction | IRoomUpdateClearAction | IRoomUpdateTypeAction;
