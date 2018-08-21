import { Action } from 'redux';

import { IErrorResponse, IUser, User } from '..';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_REQUEST_SUCCESS = 'FETCH_USER_REQUEST_SUCCESS';
export const FETCH_USER_REQUEST_FAILURE = 'FETCH_USER_REQUEST_FAILURE';
export const SET_PROFILE_USER_ID = 'SET_PROFILE_USER_ID';
export const FETCH_PROFILE_USER_REQUEST = 'FETCH_PROFILE_USER_REQUEST';
export const FETCH_PROFILE_USER_REQUEST_SUCCESS = 'FETCH_PROFILE_USER_REQUEST_SUCCESS';
export const FETCH_PROFILE_USER_REQUEST_FAILURE = 'FETCH_PROFILE_USER_REQUEST_FAILURE';
export const CLEAR_PROFILE_USER = 'CLEAR_PROFILE_USER';
export const FETCH_CONTACTS_REQUEST = 'FETCH_CONTACTS_REQUEST';
export const FETCH_CONTACTS_REQUEST_SUCCESS = 'FETCH_CONTACTS_REQUEST_SUCCESS';
export const FETCH_CONTACTS_REQUEST_FAILURE = 'FETCH_CONTACTS_REQUEST_FAILURE';
export const UPDATE_SELECT_CONTACTS = 'UPDATE_SELECT_CONTACTS';
export const CLEAR_SELECT_CONTACTS = 'CLEAR_SELECT_CONTACTS';
export const MARK_AS_READ_REQUEST = 'MARK_AS_READ_REQUEST';
export const MARK_AS_READ_REQUEST_SUCCESS = 'MARK_AS_READ_REQUEST_SUCCESS';
export const MARK_AS_READ_REQUEST_FAILURE = 'MARK_AS_READ_REQUEST_FAILURE';
export const USER_BLOCK_REQUEST = 'USER_BLOCK_REQUEST';
export const USER_BLOCK_REQUEST_SUCCESS = 'USER_BLOCK_REQUEST_SUCCESS';
export const USER_BLOCK_REQUEST_FAILURE = 'USER_BLOCK_REQUEST_FAILURE';
export const USER_UNBLOCK_REQUEST = 'USER_UNBLOCK_REQUEST';
export const USER_UNBLOCK_REQUEST_SUCCESS = 'USER_UNBLOCK_REQUEST_SUCCESS';
export const USER_UNBLOCK_REQUEST_FAILURE = 'USER_UNBLOCK_REQUEST_FAILURE';

export type UserActionTypes =
  typeof FETCH_USER_REQUEST |
  typeof FETCH_USER_REQUEST_SUCCESS |
  typeof FETCH_USER_REQUEST_FAILURE |
  typeof SET_PROFILE_USER_ID |
  typeof FETCH_PROFILE_USER_REQUEST |
  typeof FETCH_PROFILE_USER_REQUEST_SUCCESS |
  typeof FETCH_PROFILE_USER_REQUEST_FAILURE |
  typeof CLEAR_PROFILE_USER |
  typeof FETCH_CONTACTS_REQUEST |
  typeof FETCH_CONTACTS_REQUEST_SUCCESS |
  typeof FETCH_CONTACTS_REQUEST_FAILURE |
  typeof UPDATE_SELECT_CONTACTS |
  typeof CLEAR_SELECT_CONTACTS |
  typeof MARK_AS_READ_REQUEST |
  typeof MARK_AS_READ_REQUEST_SUCCESS |
  typeof MARK_AS_READ_REQUEST_FAILURE |
  typeof USER_BLOCK_REQUEST |
  typeof USER_BLOCK_REQUEST_SUCCESS |
  typeof USER_BLOCK_REQUEST_FAILURE |
  typeof USER_UNBLOCK_REQUEST |
  typeof USER_UNBLOCK_REQUEST_SUCCESS |
  typeof USER_UNBLOCK_REQUEST_FAILURE
;

export interface UserBaseAction extends Action {
  type: UserActionTypes;
}

export interface FetchUserRequestAction extends UserBaseAction {
  userId: string;
  updateLastAccessRoomId: boolean;
}
export const fetchUserRequestActionCreator = (userId: string, updateLastAccessRoomId: boolean): FetchUserRequestAction => ({
  type: FETCH_USER_REQUEST,
  userId,
  updateLastAccessRoomId,
});

export interface FetchUserRequestSuccessAction extends UserBaseAction {
  user: User;
}
export const fetchUserRequestSuccessActionCreator = (user: User): FetchUserRequestSuccessAction => ({
  type: FETCH_USER_REQUEST_SUCCESS,
  user: user,
});

export interface FetchUserRequestFailureAction extends UserBaseAction {
  errorResponse: IErrorResponse;
}
export const fetchUserRequestFailureActionCreator = (errorResponse: IErrorResponse): FetchUserRequestFailureAction => ({
  type: FETCH_USER_REQUEST_FAILURE,
  errorResponse: errorResponse,
});

export interface SetProfileUserIdAction extends UserBaseAction {
  profileUserId: string;
}
export const setProfileUserIdActionCreator = (profileUserId: string): SetProfileUserIdAction => ({
  type: SET_PROFILE_USER_ID,
  profileUserId: profileUserId,
});

export interface FetchProfileUserRequestAction extends UserBaseAction {
  profileUserId: string;
}
export const fetchProfileUserRequestActionCreator = (profileUserId: string): FetchProfileUserRequestAction => ({
  type: FETCH_PROFILE_USER_REQUEST,
  profileUserId: profileUserId,
});

export interface FetchProfileUserRequestSuccessAction extends UserBaseAction {
  profileUser: User;
}
export const fetchProfileUserRequestSuccessActionCreator = (profileUser: User): FetchProfileUserRequestSuccessAction => ({
  type: FETCH_PROFILE_USER_REQUEST_SUCCESS,
  profileUser: profileUser,
});

export interface FetchProfileUserRequestFailureAction extends UserBaseAction {
  errorResponse: IErrorResponse;
}
export const fetchProfileUserRequestFailureActionCreator = (errorResponse: IErrorResponse): FetchProfileUserRequestFailureAction => ({
  type: FETCH_PROFILE_USER_REQUEST_FAILURE,
  errorResponse: errorResponse,
});

export interface ClearProfileUserAction extends UserBaseAction {
}
export const clearProfileUserActionCreator = (): ClearProfileUserAction => ({
  type: CLEAR_PROFILE_USER,
});

export interface FetchContactsRequestAction extends UserBaseAction {
}
export const fetchContactsRequestActionCreator = (): FetchContactsRequestAction => ({
  type: FETCH_CONTACTS_REQUEST,
});

export interface FetchContactsRequestSuccessAction extends UserBaseAction {
  contacts: {[key: string]: IUser};
}
export const fetchContactsRequestSuccessActionCreator = (contacts: {[key: string]: IUser}): FetchContactsRequestSuccessAction => ({
  type: FETCH_CONTACTS_REQUEST_SUCCESS,
  contacts: contacts,
});

export interface FetchContactsRequestFailureAction extends UserBaseAction {
  errorResponse: IErrorResponse;
}
export const fetchContactsRequestFailureActionCreator
 = (errorResponse: IErrorResponse): FetchContactsRequestFailureAction => ({
  type: FETCH_CONTACTS_REQUEST_FAILURE,
  errorResponse: errorResponse,
});

export interface UpdateSelectContactsAction extends UserBaseAction {
  contact: IUser;
}
export const updateSelectContactsActionCreator = (contact: IUser): UpdateSelectContactsAction => ({
  type: UPDATE_SELECT_CONTACTS,
  contact: contact,
});

export interface ClearSelectContactsAction extends UserBaseAction {
}
export const clearSelectContactsActionCreator = (): ClearSelectContactsAction => ({
  type: CLEAR_SELECT_CONTACTS,
});

export interface MarkAsReadRequestAction extends UserBaseAction {
  roomId: string;
}
export const markAsReadRequestActionCreator = (roomId: string): MarkAsReadRequestAction => ({
  type: MARK_AS_READ_REQUEST,
  roomId: roomId,
});

export interface MarkAsReadRequestSuccessAction extends UserBaseAction {
}
export const markAsReadRequestSuccessActionCreator = (): MarkAsReadRequestSuccessAction => ({
  type: MARK_AS_READ_REQUEST_SUCCESS,
});

export interface MarkAsReadRequestFailureAction extends UserBaseAction {
  errorResponse: IErrorResponse;
}

export const markAsReadRequestFailureActionCreator = (errorResponse: IErrorResponse): MarkAsReadRequestFailureAction => ({
  type: MARK_AS_READ_REQUEST_FAILURE,
  errorResponse: errorResponse,
});

export interface UserBlockRequestAction extends UserBaseAction {
  blockUserIds: string[];
}
export const userBlockRequestActionCreator = (blockUserIds: string[]): UserBlockRequestAction => ({
  type: USER_BLOCK_REQUEST,
  blockUserIds: blockUserIds,
});

export interface UserBlockRequestSuccessAction extends UserBaseAction {
  blocks: string[];
}
export const userBlockRequestSuccessActionCreator = (blocks: string[]): UserBlockRequestSuccessAction => ({
  type: USER_BLOCK_REQUEST_SUCCESS,
  blocks: blocks,
});

export interface UserBlockRequestFailureAction extends UserBaseAction {
  errorResponse: IErrorResponse;
}
export const userBlockRequestFailureActionCreator = (errorResponse: IErrorResponse): UserBlockRequestFailureAction => ({
  type: USER_BLOCK_REQUEST_FAILURE,
  errorResponse: errorResponse,
});

export interface UserUnBlockRequestAction extends UserBaseAction {
  unBlockUserIds: string[];
}
export const userUnBlockRequestActionCreator = (unBlockUserIds: string[]): UserUnBlockRequestAction => ({
  type: USER_UNBLOCK_REQUEST,
  unBlockUserIds: unBlockUserIds,
});

export interface UserUnBlockRequestSuccessAction extends UserBaseAction {
  blocks: string[];
}
export const userUnBlockRequestSuccessActionCreator = (blocks: string[]): UserUnBlockRequestSuccessAction => ({
  type: USER_UNBLOCK_REQUEST_SUCCESS,
  blocks: blocks,
});

export interface UserUnBlockRequestFailureAction extends UserBaseAction {
  errorResponse: IErrorResponse;
}
export const userUnBlockRequestFailureActionCreator = (errorResponse: IErrorResponse): UserUnBlockRequestFailureAction => ({
  type: USER_UNBLOCK_REQUEST_FAILURE,
  errorResponse: errorResponse,
});

export type UserActions =
  UserBaseAction |
  FetchUserRequestAction |
  FetchUserRequestSuccessAction |
  FetchUserRequestFailureAction |
  UpdateSelectContactsAction |
  SetProfileUserIdAction |
  FetchProfileUserRequestAction |
  FetchProfileUserRequestSuccessAction |
  FetchProfileUserRequestFailureAction |
  ClearProfileUserAction |
  FetchContactsRequestAction |
  FetchContactsRequestSuccessAction |
  FetchContactsRequestFailureAction |
  UpdateSelectContactsAction |
  ClearSelectContactsAction |
  MarkAsReadRequestAction |
  MarkAsReadRequestSuccessAction |
  MarkAsReadRequestFailureAction |
  UserBlockRequestAction |
  UserBlockRequestSuccessAction |
  UserBlockRequestFailureAction |
  UserUnBlockRequestAction |
  UserUnBlockRequestSuccessAction |
  UserUnBlockRequestFailureAction
;
