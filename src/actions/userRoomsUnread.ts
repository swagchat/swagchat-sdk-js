import { Action } from 'redux';

import { IErrorResponse, IMiniRoom, IUserRoomsResponse } from '..';

export const RETRIEVE_USER_ROOMS_UNREAD_REQUEST = 'RETRIEVE_USER_ROOMS_UNREAD_REQUEST';
export const RETRIEVE_USER_ROOMS_UNREAD_REQUEST_SUCCESS = 'RETRIEVE_USER_ROOMS_UNREAD_REQUEST_SUCCESS';
export const RETRIEVE_USER_ROOMS_UNREAD_REQUEST_FAILURE = 'RETRIEVE_USER_ROOMS_UNREAD_REQUEST_FAILURE';
export const CLEAR_USER_ROOMS_UNREAD = 'CLEAR_USER_ROOMS_UNREAD';
export const UPDATE_USER_ROOMS_UNREAD = 'UPDATE_USER_ROOMS_UNREAD';

export type UserRoomsUnreadActionTypes =
  typeof RETRIEVE_USER_ROOMS_UNREAD_REQUEST |
  typeof RETRIEVE_USER_ROOMS_UNREAD_REQUEST_SUCCESS |
  typeof RETRIEVE_USER_ROOMS_UNREAD_REQUEST_FAILURE |
  typeof CLEAR_USER_ROOMS_UNREAD |
  typeof UPDATE_USER_ROOMS_UNREAD
;

export interface UserRoomsUnreadBaseAction extends Action {
  type: UserRoomsUnreadActionTypes;
}

export interface RetrieveUserRoomsUnreadRequestAction extends UserRoomsUnreadBaseAction {
  limit?: number;
  offset?: number;
}
export const retrieveUserRoomsUnreadRequestActionCreator = (limit?: number, offset?: number): RetrieveUserRoomsUnreadRequestAction => ({
  type: RETRIEVE_USER_ROOMS_UNREAD_REQUEST,
  limit,
  offset
});

export interface RetrieveUserRoomsUnreadRequestSuccessAction extends UserRoomsUnreadBaseAction {
  userRoomsResponse: IUserRoomsResponse;
}
export const retrieveUserRoomsUnreadRequestSuccessActionCreator = (userRoomsResponse: IUserRoomsResponse): RetrieveUserRoomsUnreadRequestSuccessAction => ({
  type: RETRIEVE_USER_ROOMS_UNREAD_REQUEST_SUCCESS,
  userRoomsResponse
});

export interface RetrieveUserRoomsUnreadRequestFailureAction extends UserRoomsUnreadBaseAction {
  errorResponse: IErrorResponse;
}
export const retrieveUserRoomsUnreadRequestFailureActionCreator = (errorResponse: IErrorResponse): RetrieveUserRoomsUnreadRequestFailureAction => ({
  type: RETRIEVE_USER_ROOMS_UNREAD_REQUEST_FAILURE,
  errorResponse
});

export interface ClearUserRoomsUnreadAction extends UserRoomsUnreadBaseAction {
}
export const clearUserRoomsUnreadActionCreator = (): ClearUserRoomsUnreadAction => ({
  type: CLEAR_USER_ROOMS_UNREAD,
});

export interface UpdateUserRoomsUnreadAction extends UserRoomsUnreadBaseAction {
  userRooms: IMiniRoom[];
}
export const updateUserRoomsUnreadActionCreator = (userRooms: IMiniRoom[]): UpdateUserRoomsUnreadAction => ({
  type: UPDATE_USER_ROOMS_UNREAD,
  userRooms
});

export type UserRoomsUnreadActions =
  UserRoomsUnreadBaseAction |
  RetrieveUserRoomsUnreadRequestAction |
  RetrieveUserRoomsUnreadRequestSuccessAction |
  RetrieveUserRoomsUnreadRequestFailureAction |
  ClearUserRoomsUnreadAction |
  UpdateUserRoomsUnreadAction
;
