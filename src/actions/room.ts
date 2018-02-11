import { Action } from 'redux';
import { Room, IRoom, IProblemDetail, IRoomUser } from '../';

export const FETCH_ROOM_REQUEST = 'FETCH_ROOM_REQUEST';
export const FETCH_ROOM_REQUEST_SUCCESS = 'FETCH_ROOM_REQUEST_SUCCESS';
export const FETCH_ROOM_REQUEST_FAILURE = 'FETCH_ROOM_REQUEST_FAILURE';
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
export const UPDATE_ROOM_REQUEST = 'UPDATE_ROOM_REQUEST';
export const CLEAR_ROOM = 'CLEAR_ROOM';

export type RoomActionTypes =
  typeof FETCH_ROOM_REQUEST |
  typeof FETCH_ROOM_REQUEST_SUCCESS |
  typeof FETCH_ROOM_REQUEST_FAILURE |
  typeof UPDATE_ROOM_REQUEST |
  typeof ADD_ROOM_USER_REQUEST |
  typeof ADD_ROOM_USER_REQUEST_SUCCESS |
  typeof ADD_ROOM_USER_REQUEST_FAILURE |
  typeof REMOVE_ROOM_USER_REQUEST |
  typeof REMOVE_ROOM_USER_REQUEST_SUCCESS |
  typeof REMOVE_ROOM_USER_REQUEST_FAILURE |
  typeof UPDATE_ROOM_NAME |
  typeof UPDATE_ROOM_PICTURE |
  typeof UPDATE_ROOM_PICTURE_URL |
  typeof UPDATE_ROOM_TYPE |
  typeof CLEAR_ROOM
;

export interface RoomBaseAction extends Action {
  type: RoomActionTypes;
}

export interface FetchRoomRequestAction extends RoomBaseAction {
  roomId: string;
}
export const fetchRoomRequestActionCreator = (roomId: string): FetchRoomRequestAction => ({
  type: FETCH_ROOM_REQUEST,
  roomId: roomId,
});

export interface FetchRoomRequestSuccessAction extends RoomBaseAction {
  room: Room;
}
export const fetchRoomRequestSuccessActionCreator = (room: Room): FetchRoomRequestSuccessAction => ({
  type: FETCH_ROOM_REQUEST_SUCCESS,
  room: room,
});

export interface FetchRoomRequestFailureAction extends RoomBaseAction {
  problemDetail: IProblemDetail;
}
export const fetchRoomRequestFailureActionCreator = (problemDetail: IProblemDetail): FetchRoomRequestFailureAction => ({
  type: FETCH_ROOM_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface UpdateRoomRequestAction extends RoomBaseAction {
  putRoom: IRoom;
}
export const updateRoomRequestActionCreator = (putRoom: IRoom): UpdateRoomRequestAction => ({
  type: UPDATE_ROOM_REQUEST,
  putRoom: putRoom,
});

export interface AddRoomUserRequestAction extends RoomBaseAction {
  userIds: string[];
}
export const addRoomUserRequestActionCreator = (userIds: string[]): AddRoomUserRequestAction => ({
  type: ADD_ROOM_USER_REQUEST,
  userIds: userIds,
});

export interface AddRoomUserRequestSuccessAction extends RoomBaseAction {
  roomUsers: IRoomUser[];
}
export const addRoomUserRequestSuccessActionCreator = (roomUsers: IRoomUser[]): AddRoomUserRequestSuccessAction => ({
  type: ADD_ROOM_USER_REQUEST_SUCCESS,
  roomUsers: roomUsers,
});

export interface AddRoomUserRequestFailureAction extends RoomBaseAction {
  problemDetail: IProblemDetail;
}
export const addRoomUserRequestFailureActionCreator = (problemDetail: IProblemDetail): AddRoomUserRequestFailureAction => ({
  type: ADD_ROOM_USER_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface RemoveRoomUserRequestAction extends RoomBaseAction {
  userIds: string[];
}
export const removeRoomUserRequestActionCreator = (userIds: string[]): RemoveRoomUserRequestAction => ({
  type: REMOVE_ROOM_USER_REQUEST,
  userIds: userIds,
});

export interface RemoveRoomUserRequestSuccessAction extends RoomBaseAction {
  roomUsers: IRoomUser[];
}
export const removeRoomUserRequestSuccessActionCreator = (roomUsers: IRoomUser[]): RemoveRoomUserRequestSuccessAction => ({
  type: REMOVE_ROOM_USER_REQUEST_SUCCESS,
  roomUsers: roomUsers,
});

export interface RemoveRoomUserRequestFailureAction extends RoomBaseAction {
  problemDetail: IProblemDetail;
}
export const removeRoomUserRequestFailureActionCreator = (problemDetail: IProblemDetail): RemoveRoomUserRequestFailureAction => ({
  type: REMOVE_ROOM_USER_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface UpdateRoomNameAction extends RoomBaseAction {
  updateName: string;
}
export const updateRoomNameActionCreator = (updateName: string): UpdateRoomNameAction => ({
  type: UPDATE_ROOM_NAME,
  updateName: updateName,
});

export interface UpdateRoomPictureAction extends RoomBaseAction {
  updatePicture: Blob;
}
export const updateRoomPictureActionCreator = (updatePicture: Blob): UpdateRoomPictureAction => ({
  type: UPDATE_ROOM_PICTURE,
  updatePicture: updatePicture,
});

export interface UpdateRoomPictureUrlAction extends RoomBaseAction {
  updatePictureUrl: string;
}
export const updateRoomPictureUrlActionCreator = (updatePictureUrl: string): UpdateRoomPictureUrlAction => ({
  type: UPDATE_ROOM_PICTURE_URL,
  updatePictureUrl: updatePictureUrl,
});

export interface UpdateRoomTypeAction extends RoomBaseAction {
  updateType: number;
}
export const updateRoomTypeActionCreator = (updateType: number): UpdateRoomTypeAction => ({
  type: UPDATE_ROOM_TYPE,
  updateType: updateType,
});

export interface ClearRoomAction extends RoomBaseAction {
}
export const clearRoomActionCreator = (): ClearRoomAction => ({
  type: CLEAR_ROOM,
});

export type RoomActions =
  FetchRoomRequestAction |
  FetchRoomRequestSuccessAction |
  FetchRoomRequestFailureAction |
  AddRoomUserRequestAction |
  AddRoomUserRequestSuccessAction |
  AddRoomUserRequestFailureAction |
  RemoveRoomUserRequestAction |
  RemoveRoomUserRequestSuccessAction |
  RemoveRoomUserRequestFailureAction |
  UpdateRoomNameAction |
  UpdateRoomPictureAction |
  UpdateRoomPictureUrlAction |
  UpdateRoomTypeAction |
  ClearRoomAction
  ;