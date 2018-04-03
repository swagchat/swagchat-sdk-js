import { Action } from 'redux';
import { Room, IProblemDetail, IRoomUser } from '../';

export const SET_CURRENT_ROOM_ID = 'SET_CURRENT_ROOM_ID';
export const SET_CURRENT_ROOM_NAME = 'SET_CURRENT_ROOM_NAME';
export const FETCH_ROOM_REQUEST = 'FETCH_ROOM_REQUEST';
export const FETCH_ROOM_REQUEST_SUCCESS = 'FETCH_ROOM_REQUEST_SUCCESS';
export const FETCH_ROOM_REQUEST_FAILURE = 'FETCH_ROOM_REQUEST_FAILURE';
export const ADD_ROOM_USER_REQUEST = 'ADD_ROOM_USER_REQUEST';
export const ADD_ROOM_USER_REQUEST_SUCCESS = 'ADD_ROOM_USER_REQUEST_SUCCESS';
export const ADD_ROOM_USER_REQUEST_FAILURE = 'ADD_ROOM_USER_REQUEST_FAILURE';
export const REMOVE_ROOM_USER_REQUEST = 'REMOVE_ROOM_USER_REQUEST';
export const REMOVE_ROOM_USER_REQUEST_SUCCESS = 'REMOVE_ROOM_USER_REQUEST_SUCCESS';
export const REMOVE_ROOM_USER_REQUEST_FAILURE = 'REMOVE_ROOM_USER_REQUEST_FAILURE';

export type RoomActionTypes =
  typeof SET_CURRENT_ROOM_ID |
  typeof SET_CURRENT_ROOM_NAME |
  typeof FETCH_ROOM_REQUEST |
  typeof FETCH_ROOM_REQUEST_SUCCESS |
  typeof FETCH_ROOM_REQUEST_FAILURE |
  typeof ADD_ROOM_USER_REQUEST |
  typeof ADD_ROOM_USER_REQUEST_SUCCESS |
  typeof ADD_ROOM_USER_REQUEST_FAILURE |
  typeof REMOVE_ROOM_USER_REQUEST |
  typeof REMOVE_ROOM_USER_REQUEST_SUCCESS |
  typeof REMOVE_ROOM_USER_REQUEST_FAILURE
;

export interface RoomBaseAction extends Action {
  type: RoomActionTypes;
}

export interface SetCurrentRoomIdAction extends RoomBaseAction {
  currentRoomId: string;
}
export const setCurrentRoomIdActionCreator = (currentRoomId: string): SetCurrentRoomIdAction => ({
  type: SET_CURRENT_ROOM_ID,
  currentRoomId: currentRoomId,
});

export interface SetCurrentRoomNameAction extends RoomBaseAction {
  currentRoomName: string;
}
export const setCurrentRoomNameActionCreator = (currentRoomName: string): SetCurrentRoomNameAction => ({
  type: SET_CURRENT_ROOM_NAME,
  currentRoomName: currentRoomName,
});

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

export type RoomActions =
  RoomBaseAction |
  SetCurrentRoomIdAction |
  SetCurrentRoomNameAction |
  FetchRoomRequestAction |
  FetchRoomRequestSuccessAction |
  FetchRoomRequestFailureAction |
  AddRoomUserRequestAction |
  AddRoomUserRequestSuccessAction |
  AddRoomUserRequestFailureAction |
  RemoveRoomUserRequestAction |
  RemoveRoomUserRequestSuccessAction |
  RemoveRoomUserRequestFailureAction
;