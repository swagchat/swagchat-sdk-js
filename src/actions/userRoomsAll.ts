import { Action } from 'redux';

import { IErrorResponse, IMiniRoom, IUserRoomsResponse } from '..';

export const RETRIEVE_USER_ROOMS_ALL_REQUEST = 'RETRIEVE_USER_ROOMS_ALL_REQUEST';
export const RETRIEVE_USER_ROOMS_ALL_REQUEST_SUCCESS = 'RETRIEVE_USER_ROOMS_ALL_REQUEST_SUCCESS';
export const RETRIEVE_USER_ROOMS_ALL_REQUEST_FAILURE = 'RETRIEVE_USER_ROOMS_ALL_REQUEST_FAILURE';
export const CLEAR_USER_ROOMS_ALL = 'CLEAR_USER_ROOMS_ALL';
export const UPDATE_USER_ROOMS_ALL = 'UPDATE_USER_ROOMS_ALL';

export type UserRoomsAllActionTypes =
  typeof RETRIEVE_USER_ROOMS_ALL_REQUEST |
  typeof RETRIEVE_USER_ROOMS_ALL_REQUEST_SUCCESS |
  typeof RETRIEVE_USER_ROOMS_ALL_REQUEST_FAILURE |
  typeof CLEAR_USER_ROOMS_ALL |
  typeof UPDATE_USER_ROOMS_ALL
;

export interface UserRoomsAllBaseAction extends Action {
  type: UserRoomsAllActionTypes;
}

export interface RetrieveUserRoomsAllRequestAction extends UserRoomsAllBaseAction {
  limit?: number;
  offset?: number;
}
export const retrieveUserRoomsAllRequestActionCreator = (limit?: number, offset?: number): RetrieveUserRoomsAllRequestAction => ({
  type: RETRIEVE_USER_ROOMS_ALL_REQUEST,
  limit,
  offset
});

export interface RetrieveUserRoomsAllRequestSuccessAction extends UserRoomsAllBaseAction {
  userRoomsResponse: IUserRoomsResponse;
}
export const retrieveUserRoomsAllRequestSuccessActionCreator = (userRoomsResponse: IUserRoomsResponse): RetrieveUserRoomsAllRequestSuccessAction => ({
  type: RETRIEVE_USER_ROOMS_ALL_REQUEST_SUCCESS,
  userRoomsResponse
});

export interface RetrieveUserRoomsAllRequestFailureAction extends UserRoomsAllBaseAction {
  errorResponse: IErrorResponse;
}
export const retrieveUserRoomsAllRequestFailureActionCreator = (errorResponse: IErrorResponse): RetrieveUserRoomsAllRequestFailureAction => ({
  type: RETRIEVE_USER_ROOMS_ALL_REQUEST_FAILURE,
  errorResponse
});

export interface ClearUserRoomsAllAction extends UserRoomsAllBaseAction {
}
export const clearUserRoomsAllActionCreator = (): ClearUserRoomsAllAction => ({
  type: CLEAR_USER_ROOMS_ALL,
});

export interface UpdateUserRoomsAllAction extends UserRoomsAllBaseAction {
  userRooms: IMiniRoom[];
}
export const updateUserRoomsAllActionCreator = (userRooms: IMiniRoom[]): UpdateUserRoomsAllAction => ({
  type: UPDATE_USER_ROOMS_ALL,
  userRooms
});

export type UserRoomsAllActions =
  UserRoomsAllBaseAction |
  RetrieveUserRoomsAllRequestAction |
  RetrieveUserRoomsAllRequestSuccessAction |
  RetrieveUserRoomsAllRequestFailureAction |
  ClearUserRoomsAllAction |
  UpdateUserRoomsAllAction
;
