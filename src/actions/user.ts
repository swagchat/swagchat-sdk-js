import { Action } from 'redux';
import { IUser, IProblemDetail } from '../';
import { store } from '../stores';

export const SET_AUTH_PARAMS = 'SET_AUTH_PARAMS';
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const FETCH_CONTACTS_REQUEST = 'FETCH_CONTACTS_REQUEST';
export const FETCH_CONTACTS_REQUEST_SUCCESS = 'FETCH_CONTACTS_REQUEST_SUCCESS';
export const FETCH_CONTACTS_REQUEST_FAILURE = 'FETCH_CONTACTS_REQUEST_FAILURE';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_REQUEST_SUCCESS = 'FETCH_USER_REQUEST_SUCCESS';
export const FETCH_USER_REQUEST_FAILURE = 'FETCH_USER_REQUEST_FAILURE';
export const MARK_AS_READ_REQUEST = 'MARK_AS_READ_REQUEST';
export const MARK_AS_READ_REQUEST_SUCCESS = 'MARK_AS_READ_REQUEST_SUCCESS';
export const MARK_AS_READ_REQUEST_FAILURE = 'MARK_AS_READ_REQUEST_FAILURE';
export const USER_BLOCK_REQUEST = 'USER_BLOCK_REQUEST';
export const USER_BLOCK_REQUEST_SUCCESS = 'USER_BLOCK_REQUEST_SUCCESS';
export const USER_BLOCK_REQUEST_FAILURE = 'USER_BLOCK_REQUEST_FAILURE';
export const USER_UNBLOCK_REQUEST = 'USER_UNBLOCK_REQUEST';
export const USER_UNBLOCK_REQUEST_SUCCESS = 'USER_UNBLOCK_REQUEST_SUCCESS';
export const USER_UNBLOCK_REQUEST_FAILURE = 'USER_UNBLOCK_REQUEST_FAILURE';
export const UPDATE_SELECT_CONTACTS = 'UPDATE_SELECT_CONTACTS';
export const CLEAR_SELECT_CONTACTS = 'CLEAR_SELECT_CONTACTS';

export type UserActionTypes = typeof SET_AUTH_PARAMS
  | typeof AUTH_REQUEST
  | typeof FETCH_CONTACTS_REQUEST
  | typeof FETCH_CONTACTS_REQUEST_SUCCESS
  | typeof FETCH_CONTACTS_REQUEST_FAILURE
  | typeof FETCH_USER_REQUEST
  | typeof FETCH_USER_REQUEST_SUCCESS
  | typeof FETCH_USER_REQUEST_FAILURE
  | typeof MARK_AS_READ_REQUEST
  | typeof MARK_AS_READ_REQUEST_SUCCESS
  | typeof MARK_AS_READ_REQUEST_FAILURE
  | typeof USER_BLOCK_REQUEST
  | typeof USER_BLOCK_REQUEST_SUCCESS
  | typeof USER_BLOCK_REQUEST_FAILURE
  | typeof USER_UNBLOCK_REQUEST
  | typeof USER_UNBLOCK_REQUEST_SUCCESS
  | typeof USER_UNBLOCK_REQUEST_FAILURE
  | typeof UPDATE_SELECT_CONTACTS
  | typeof CLEAR_SELECT_CONTACTS
;

export interface IUserBaseAction extends Action {
  type: UserActionTypes;
}

export interface ISetAuthParamsAction extends IUserBaseAction {
  apiKey: string;
  apiEndpoint: string;
  realtimeEndpoint: string;
  userId: string;
  accessToken: string;
}
export const setAuthParamsActionCreator = (
  apiKey: string,
  apiEndpoint: string,
  realtimeEndpoint: string,
  userId: string,
  accessToken: string,
  ): ISetAuthParamsAction => ({
  type: SET_AUTH_PARAMS,
  apiKey: apiKey,
  apiEndpoint: apiEndpoint,
  realtimeEndpoint: realtimeEndpoint,
  userId: userId,
  accessToken: accessToken,
});

export interface IAuthRequestAction extends IUserBaseAction {
}
export const authRequestActionCreator = (): IAuthRequestAction => ({
  type: AUTH_REQUEST,
});

export interface IFetchContactsRequestAction extends IUserBaseAction {
}
export const fetchContactsRequestActionCreator = (): IFetchContactsRequestAction => ({
  type: FETCH_CONTACTS_REQUEST,
});

export interface IFetchContactsRequestSuccessAction extends IUserBaseAction {
  contacts: IUser[];
}
export const fetchContactsRequestSuccessActionCreator = (contacts: IUser[]): IFetchContactsRequestSuccessAction => ({
  type: FETCH_CONTACTS_REQUEST_SUCCESS,
  contacts: contacts,
});

export interface IFetchContactsRequestFailureAction extends IUserBaseAction {
  problemDetail: IProblemDetail;
}
export const fetchContactsRequestFailureActionCreator
 = (problemDetail: IProblemDetail): IFetchContactsRequestFailureAction => ({
  type: FETCH_CONTACTS_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IFetchUserRequestAction extends IUserBaseAction {
  userId: string;
  accessToken?: string;
}
export const fetchUserRequestActionCreator = (userId: string, accessToken?: string): IFetchUserRequestAction => ({
  type: FETCH_USER_REQUEST,
  userId: userId,
  accessToken: accessToken,
});

export interface IFetchUserRequestSuccessAction extends IUserBaseAction {
  user: IUser;
}
export const fetchUserRequestSuccessActionCreator = (user: IUser): IFetchUserRequestSuccessAction => ({
  type: FETCH_USER_REQUEST_SUCCESS,
  user: user,
});

export interface IFetchUserRequestFailureAction extends IUserBaseAction {
  problemDetail: IProblemDetail;
}
export const fetchUserRequestFailureActionCreator = (problemDetail: IProblemDetail): IFetchUserRequestFailureAction => ({
  type: FETCH_USER_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IMarkAsReadRequestAction extends IUserBaseAction {
  roomId: string;
}
export const markAsReadRequestActionCreator = (roomId: string): IMarkAsReadRequestAction => ({
  type: MARK_AS_READ_REQUEST,
  roomId: roomId,
});

export interface IMarkAsReadRequestSuccessAction extends IUserBaseAction {
}
export const markAsReadRequestSuccessActionCreator = (): IMarkAsReadRequestSuccessAction => ({
  type: MARK_AS_READ_REQUEST_SUCCESS,
});

export interface IMarkAsReadRequestFailureAction extends IUserBaseAction {
  problemDetail: IProblemDetail;
}

export const markAsReadRequestFailureActionCreator = (problemDetail: IProblemDetail): IMarkAsReadRequestFailureAction => ({
  type: MARK_AS_READ_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IUserBlockRequestAction extends IUserBaseAction {
  blockUserIds: string[];
}
export const userBlockRequestActionCreator = (blockUserIds: string[]): IUserBlockRequestAction => ({
  type: USER_BLOCK_REQUEST,
  blockUserIds: blockUserIds,
});

export interface IUserBlockRequestSuccessAction extends IUserBaseAction {
  blocks: string[];
}
export const userBlockRequestSuccessActionCreator = (blocks: string[]): IUserBlockRequestSuccessAction => ({
  type: USER_BLOCK_REQUEST_SUCCESS,
  blocks: blocks,
});

export interface IUserBlockRequestFailureAction extends IUserBaseAction {
  problemDetail: IProblemDetail;
}
export const userBlockRequestFailureActionCreator = (problemDetail: IProblemDetail): IUserBlockRequestFailureAction => ({
  type: USER_BLOCK_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IUserUnBlockRequestAction extends IUserBaseAction {
  blockUserIds: string[];
}
export const userUnBlockRequestActionCreator = (blockUserIds: string[]): IUserUnBlockRequestAction => ({
  type: USER_UNBLOCK_REQUEST,
  blockUserIds: blockUserIds,
});

export interface IUserUnBlockRequestSuccessAction extends IUserBaseAction {
  blocks: string[];
}
export const userUnBlockRequestSuccessActionCreator = (blocks: string[]): IUserUnBlockRequestSuccessAction => ({
  type: USER_UNBLOCK_REQUEST_SUCCESS,
  blocks: blocks,
});

export interface IUserUnBlockRequestFailureAction extends IUserBaseAction {
  problemDetail: IProblemDetail;
}
export const userUnBlockRequestFailureActionCreator = (problemDetail: IProblemDetail): IUserUnBlockRequestFailureAction => ({
  type: USER_UNBLOCK_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IUpdateSelectContactsAction extends IUserBaseAction {
  contact: IUser;
}
export const updateSelectContactsActionCreator = (contact: IUser): IUpdateSelectContactsAction => ({
  type: UPDATE_SELECT_CONTACTS,
  contact: contact,
});

export interface IClearSelectContactsAction extends IUserBaseAction {
}
export const clearSelectContactsActionCreator = (): IClearSelectContactsAction => ({
  type: CLEAR_SELECT_CONTACTS,
});

export type UserActions = ISetAuthParamsAction
  | IAuthRequestAction
  | IFetchContactsRequestAction
  | IFetchContactsRequestSuccessAction
  | IFetchContactsRequestFailureAction
  | IFetchUserRequestAction
  | IFetchUserRequestSuccessAction
  | IFetchUserRequestFailureAction
  | IMarkAsReadRequestAction
  | IMarkAsReadRequestSuccessAction
  | IMarkAsReadRequestFailureAction
  | IUserBlockRequestAction
  | IUserBlockRequestSuccessAction
  | IUserBlockRequestFailureAction
  | IUserUnBlockRequestAction
  | IUserUnBlockRequestSuccessAction
  | IUserUnBlockRequestFailureAction
  | IUpdateSelectContactsAction
  | IClearSelectContactsAction
;

export const userBlockRequestActionDispatch = (blockUserIds: string[]) => store.dispatch(userBlockRequestActionCreator(blockUserIds));
export const userUnBlockRequestActionDispatch = (blockUserIds: string[]) => store.dispatch(userUnBlockRequestActionCreator(blockUserIds));
export const fetchContactsRequestActionDispatch = () => store.dispatch(fetchContactsRequestActionCreator());
export const updateSelectContactsActionDispatch = (contact: IUser) => store.dispatch(updateSelectContactsActionCreator(contact));
export const clearSelectContactsActionDispatch = () => store.dispatch(clearSelectContactsActionCreator());
export const markAsReadRequestActionDispatch = (roomId: string) => store.dispatch(markAsReadRequestActionCreator(roomId));
