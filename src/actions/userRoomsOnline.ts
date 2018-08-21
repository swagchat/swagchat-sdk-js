import { Action } from 'redux';

import { IErrorResponse, IMiniRoom, IUserRoomsResponse } from '..';

export const RETRIEVE_USER_ROOMS_ONLINE_REQUEST = 'RETRIEVE_USER_ROOMS_ONLINE_REQUEST';
export const RETRIEVE_USER_ROOMS_ONLINE_REQUEST_SUCCESS = 'RETRIEVE_USER_ROOMS_ONLINE_REQUEST_SUCCESS';
export const RETRIEVE_USER_ROOMS_ONLINE_REQUEST_FAILURE = 'RETRIEVE_USER_ROOMS_ONLINE_REQUEST_FAILURE';
export const CLEAR_USER_ROOMS_ONLINE = 'CLEAR_USER_ROOMS_ONLINE';
export const UPDATE_USER_ROOMS_ONLINE = 'UPDATE_USER_ROOMS_ONLINE';

export type UserRoomsOnlineActionTypes =
  typeof RETRIEVE_USER_ROOMS_ONLINE_REQUEST |
  typeof RETRIEVE_USER_ROOMS_ONLINE_REQUEST_SUCCESS |
  typeof RETRIEVE_USER_ROOMS_ONLINE_REQUEST_FAILURE |
  typeof CLEAR_USER_ROOMS_ONLINE |
  typeof UPDATE_USER_ROOMS_ONLINE
;

export interface UserRoomsOnlineBaseAction extends Action {
  type: UserRoomsOnlineActionTypes;
}

export interface RetrieveUserRoomsOnlineRequestAction extends UserRoomsOnlineBaseAction {
  limit?: number;
  offset?: number;
}
export const retrieveUserRoomsOnlineRequestActionCreator = (limit?: number, offset?: number): RetrieveUserRoomsOnlineRequestAction => ({
  type: RETRIEVE_USER_ROOMS_ONLINE_REQUEST,
  limit,
  offset
});

export interface RetrieveUserRoomsOnlineRequestSuccessAction extends UserRoomsOnlineBaseAction {
  userRoomsResponse: IUserRoomsResponse;
}
export const retrieveUserRoomsOnlineRequestSuccessActionCreator = (userRoomsResponse: IUserRoomsResponse): RetrieveUserRoomsOnlineRequestSuccessAction => ({
  type: RETRIEVE_USER_ROOMS_ONLINE_REQUEST_SUCCESS,
  userRoomsResponse
});

export interface RetrieveUserRoomsOnlineRequestFailureAction extends UserRoomsOnlineBaseAction {
  errorResponse: IErrorResponse;
}
export const retrieveUserRoomsOnlineRequestFailureActionCreator = (errorResponse: IErrorResponse): RetrieveUserRoomsOnlineRequestFailureAction => ({
  type: RETRIEVE_USER_ROOMS_ONLINE_REQUEST_FAILURE,
  errorResponse
});

export interface ClearUserRoomsOnlineAction extends UserRoomsOnlineBaseAction {
}
export const clearUserRoomsOnlineActionCreator = (): ClearUserRoomsOnlineAction => ({
  type: CLEAR_USER_ROOMS_ONLINE,
});

export interface UpdateUserRoomsOnlineAction extends UserRoomsOnlineBaseAction {
  userRooms: IMiniRoom[];
}
export const updateUserRoomsOnlineActionCreator = (userRooms: IMiniRoom[]): UpdateUserRoomsOnlineAction => ({
  type: UPDATE_USER_ROOMS_ONLINE,
  userRooms
});

export type UserRoomsOnlineActions =
  UserRoomsOnlineBaseAction |
  RetrieveUserRoomsOnlineRequestAction |
  RetrieveUserRoomsOnlineRequestSuccessAction |
  RetrieveUserRoomsOnlineRequestFailureAction |
  ClearUserRoomsOnlineAction |
  UpdateUserRoomsOnlineAction
;
