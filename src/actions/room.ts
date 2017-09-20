import { Action } from 'redux';
import { store } from '../stores';
import { IRoom, IProblemDetail, IRoomUser } from '../';

export const FETCH_ROOM_REQUEST = 'FETCH_ROOM_REQUEST';
export const FETCH_ROOM_REQUEST_SUCCESS = 'FETCH_ROOM_REQUEST_SUCCESS';
export const FETCH_ROOM_REQUEST_FAILURE = 'FETCH_ROOM_REQUEST_FAILURE';
export const UPDATE_ROOM_REQUEST = 'UPDATE_ROOM_REQUEST';
export const ADD_ROOM_USER_REQUEST = 'ADD_ROOM_USER_REQUEST';
export const ADD_ROOM_USER_REQUEST_SUCCESS = 'ADD_ROOM_USER_REQUEST_SUCCESS';
export const ADD_ROOM_USER_REQUEST_FAILURE = 'ADD_ROOM_USER_REQUEST_FAILURE';
export const REMOVE_ROOM_USER_REQUEST = 'REMOVE_ROOM_USER_REQUEST';
export const REMOVE_ROOM_USER_REQUEST_SUCCESS = 'REMOVE_ROOM_USER_REQUEST_SUCCESS';
export const REMOVE_ROOM_USER_REQUEST_FAILURE = 'REMOVE_ROOM_USER_REQUEST_FAILURE';
export const UPDATE_ROOM_NAME = 'UPDATE_ROOM_NAME';
export const UPDATE_ROOM_PICTURE = 'UPDATE_ROOM_PICTURE';
export const UPDATE_ROOM_PICTURE_URL = 'UPDATE_ROOM_PICTURE_URL';
export const UPDATE_ROOM_TYPE = 'UPDATE_ROOM_TYPE';
export const CLEAR_ROOM = 'CLEAR_ROOM';

export type RoomActionTypes = typeof FETCH_ROOM_REQUEST
  | typeof FETCH_ROOM_REQUEST_SUCCESS
  | typeof FETCH_ROOM_REQUEST_FAILURE
  | typeof UPDATE_ROOM_REQUEST
  | typeof ADD_ROOM_USER_REQUEST
  | typeof ADD_ROOM_USER_REQUEST_SUCCESS
  | typeof ADD_ROOM_USER_REQUEST_FAILURE
  | typeof REMOVE_ROOM_USER_REQUEST
  | typeof REMOVE_ROOM_USER_REQUEST_SUCCESS
  | typeof REMOVE_ROOM_USER_REQUEST_FAILURE
  | typeof UPDATE_ROOM_NAME
  | typeof UPDATE_ROOM_PICTURE
  | typeof UPDATE_ROOM_PICTURE_URL
  | typeof UPDATE_ROOM_TYPE
  | typeof CLEAR_ROOM
;

export interface IRoomBaseAction extends Action {
  type: RoomActionTypes;
}

export interface IFetchRoomRequestAction extends IRoomBaseAction {
  roomId: string;
}
export const fetchRoomRequestActionCreator = (roomId: string): IFetchRoomRequestAction => ({
  type: FETCH_ROOM_REQUEST,
  roomId: roomId,
});

export interface IFetchRoomRequestSuccessAction extends IRoomBaseAction {
  room: IRoom;
}
export const fetchRoomRequestSuccessActionCreator = (room: IRoom): IFetchRoomRequestSuccessAction => ({
  type: FETCH_ROOM_REQUEST_SUCCESS,
  room: room,
});

export interface IFetchRoomRequestFailureAction extends IRoomBaseAction {
  problemDetail: IProblemDetail;
}
export const fetchRoomRequestFailureActionCreator = (problemDetail: IProblemDetail): IFetchRoomRequestFailureAction => ({
  type: FETCH_ROOM_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IUpdateRoomRequestAction extends IRoomBaseAction {
  putRoom: IRoom;
}
export const updateRoomRequestActionCreator = (putRoom: IRoom): IUpdateRoomRequestAction => ({
  type: UPDATE_ROOM_REQUEST,
  putRoom: putRoom,
});

export interface IAddRoomUserRequestAction extends IRoomBaseAction {
  userIds: string[];
}
export const addRoomUserRequestActionCreator = (userIds: string[]): IAddRoomUserRequestAction => ({
  type: ADD_ROOM_USER_REQUEST,
  userIds: userIds,
});

export interface IAddRoomUserRequestSuccessAction extends IRoomBaseAction {
  roomUsers: IRoomUser[];
}
export const addRoomUserRequestSuccessActionCreator = (roomUsers: IRoomUser[]): IAddRoomUserRequestSuccessAction => ({
  type: ADD_ROOM_USER_REQUEST_SUCCESS,
  roomUsers: roomUsers,
});

export interface IAddRoomUserRequestFailureAction extends IRoomBaseAction {
  problemDetail: IProblemDetail;
}
export const addRoomUserRequestFailureActionCreator = (problemDetail: IProblemDetail): IAddRoomUserRequestFailureAction => ({
  type: ADD_ROOM_USER_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IRemoveRoomUserRequestAction extends IRoomBaseAction {
  userIds: string[];
}
export const removeRoomUserRequestActionCreator = (userIds: string[]): IRemoveRoomUserRequestAction => ({
  type: REMOVE_ROOM_USER_REQUEST,
  userIds: userIds,
});

export interface IRemoveRoomUserRequestSuccessAction extends IRoomBaseAction {
  roomUsers: IRoomUser[];
}
export const removeRoomUserRequestSuccessActionCreator = (roomUsers: IRoomUser[]): IRemoveRoomUserRequestSuccessAction => ({
  type: REMOVE_ROOM_USER_REQUEST_SUCCESS,
  roomUsers: roomUsers,
});

export interface IRemoveRoomUserRequestFailureAction extends IRoomBaseAction {
  problemDetail: IProblemDetail;
}
export const removeRoomUserRequestFailureActionCreator = (problemDetail: IProblemDetail): IRemoveRoomUserRequestFailureAction => ({
  type: REMOVE_ROOM_USER_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IUpdateRoomNameAction extends IRoomBaseAction {
  updateName: string;
}
export const updateRoomNameActionCreator = (updateName: string): IUpdateRoomNameAction => ({
  type: UPDATE_ROOM_NAME,
  updateName: updateName,
});

export interface IUpdateRoomPictureAction extends IRoomBaseAction {
  updatePicture: Blob;
}
export const updateRoomPictureActionCreator = (updatePicture: Blob): IUpdateRoomPictureAction => ({
  type: UPDATE_ROOM_PICTURE,
  updatePicture: updatePicture,
});

export interface IUpdateRoomPictureUrlAction extends IRoomBaseAction {
  updatePictureUrl: string;
}
export const updateRoomPictureUrlActionCreator = (updatePictureUrl: string): IUpdateRoomPictureUrlAction => ({
  type: UPDATE_ROOM_PICTURE_URL,
  updatePictureUrl: updatePictureUrl,
});

export interface IUpdateRoomTypeAction extends IRoomBaseAction {
  updateType: number;
}
export const updateRoomTypeActionCreator = (updateType: number): IUpdateRoomTypeAction => ({
  type: UPDATE_ROOM_TYPE,
  updateType: updateType,
});

export interface IClearRoomAction extends IRoomBaseAction {
}
export const clearRoomActionCreator = (): IClearRoomAction => ({
  type: CLEAR_ROOM,
});

export type RoomActions = IFetchRoomRequestAction
  | IFetchRoomRequestSuccessAction
  | IFetchRoomRequestFailureAction
  | IAddRoomUserRequestAction
  | IAddRoomUserRequestSuccessAction
  | IAddRoomUserRequestFailureAction
  | IRemoveRoomUserRequestAction
  | IRemoveRoomUserRequestSuccessAction
  | IRemoveRoomUserRequestFailureAction
  | IUpdateRoomNameAction
  | IUpdateRoomPictureAction
  | IUpdateRoomPictureUrlAction
  | IUpdateRoomTypeAction
  | IClearRoomAction
  ;

export const removeRoomUserRequestActionDispatch = (userIds: string[]) => store.dispatch(removeRoomUserRequestActionCreator(userIds));
export const updateRoomNameActionDispatch = (updateName: string) =>  store.dispatch(updateRoomNameActionCreator(updateName));
export const updateRoomPictureActionDispatch = (updatePicture: Blob) => store.dispatch(updateRoomPictureActionCreator(updatePicture));
export const updateRoomRequestActionDispatch = (putRoom: IRoom) => store.dispatch(updateRoomRequestActionCreator(putRoom));
