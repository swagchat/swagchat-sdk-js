import { Action } from 'redux';
import { IUser, IProblemDetail } from '../';
import { store } from '../stores';

export const SET_USER_AUTH_PARAMS = 'SET_USER_AUTH_PARAMS';
export const USER_AUTH_REQUEST = 'USER_AUTH_REQUEST';
export const CONTACTS_FETCH_REQUEST = 'CONTACTS_FETCH_REQUEST';
export const CONTACTS_FETCH_REQUEST_SUCCESS = 'CONTACTS_FETCH_REQUEST_SUCCESS';
export const CONTACTS_FETCH_REQUEST_FAILURE = 'CONTACTS_FETCH_REQUEST_FAILURE';
export const USER_FETCH_REQUEST = 'USER_FETCH_REQUEST';
export const USER_FETCH_REQUEST_SUCCESS = 'USER_FETCH_REQUEST_SUCCESS';
export const USER_FETCH_REQUEST_FAILURE = 'USER_FETCH_REQUEST_FAILURE';
export const MARK_AS_READ_REQUEST = 'MARK_AS_READ_REQUEST';
export const MARK_AS_READ_REQUEST_SUCCESS = 'MARK_AS_READ_REQUEST_SUCCESS';
export const MARK_AS_READ_REQUEST_FAILURE = 'MARK_AS_READ_REQUEST_FAILURE';
export const USER_BLOCK_FETCH_REQUEST = 'USER_BLOCK_FETCH_REQUEST';
export const USER_BLOCK_FETCH_REQUEST_SUCCESS = 'USER_BLOCK_FETCH_REQUEST_SUCCESS';
export const USER_BLOCK_FETCH_REQUEST_FAILURE = 'USER_BLOCK_FETCH_REQUEST_FAILURE';
export const USER_UNBLOCK_FETCH_REQUEST = 'USER_UNBLOCK_FETCH_REQUEST';
export const USER_UNBLOCK_FETCH_REQUEST_SUCCESS = 'USER_UNBLOCK_FETCH_REQUEST_SUCCESS';
export const USER_UNBLOCK_FETCH_REQUEST_FAILURE = 'USER_UNBLOCK_FETCH_REQUEST_FAILURE';
export const UPDATE_SELECT_CONTACTS = 'UPDATE_SELECT_CONTACTS';
export const CLEAR_SELECT_CONTACTS = 'CLEAR_SELECT_CONTACTS';

export type UserActionTypes = typeof SET_USER_AUTH_PARAMS
  | typeof USER_AUTH_REQUEST
  | typeof CONTACTS_FETCH_REQUEST
  | typeof CONTACTS_FETCH_REQUEST_SUCCESS
  | typeof CONTACTS_FETCH_REQUEST_FAILURE
  | typeof USER_FETCH_REQUEST
  | typeof USER_FETCH_REQUEST_SUCCESS
  | typeof USER_FETCH_REQUEST_FAILURE
  | typeof MARK_AS_READ_REQUEST
  | typeof MARK_AS_READ_REQUEST_SUCCESS
  | typeof MARK_AS_READ_REQUEST_FAILURE
  | typeof USER_BLOCK_FETCH_REQUEST
  | typeof USER_BLOCK_FETCH_REQUEST_SUCCESS
  | typeof USER_BLOCK_FETCH_REQUEST_FAILURE
  | typeof USER_UNBLOCK_FETCH_REQUEST
  | typeof USER_UNBLOCK_FETCH_REQUEST_SUCCESS
  | typeof USER_UNBLOCK_FETCH_REQUEST_FAILURE
  | typeof UPDATE_SELECT_CONTACTS
  | typeof CLEAR_SELECT_CONTACTS
;

export interface ISetUserAuthParamsAction extends Action {
  type: UserActionTypes;
  apiKey: string;
  apiEndpoint: string;
  realtimeEndpoint: string;
  userId: string;
  accessToken: string;
}
export const setUserAuthParamsActionCreator = (
  apiKey: string,
  apiEndpoint: string,
  realtimeEndpoint: string,
  userId: string,
  accessToken: string,
  ): ISetUserAuthParamsAction => ({
  type: SET_USER_AUTH_PARAMS,
  apiKey: apiKey,
  apiEndpoint: apiEndpoint,
  realtimeEndpoint: realtimeEndpoint,
  userId: userId,
  accessToken: accessToken,
});

export interface IUserAuthRequestAction extends Action {
  type: UserActionTypes;
}
export const userAuthRequestActionCreator = (): IContactsFetchRequestAction => ({
  type: USER_AUTH_REQUEST,
});

export interface IContactsFetchRequestAction extends Action {
  type: UserActionTypes;
}
export const contactsFetchRequestActionCreator = (): IContactsFetchRequestAction => ({
  type: CONTACTS_FETCH_REQUEST,
});

export interface IContactsFetchRequestSuccessAction extends Action {
  type: UserActionTypes;
  contacts: IUser[];
}
export const contactsFetchRequestSuccessActionCreator = (contacts: IUser[]): IContactsFetchRequestSuccessAction => ({
  type: CONTACTS_FETCH_REQUEST_SUCCESS,
  contacts: contacts,
});

export interface IContactsFetchRequestFailureAction extends Action {
  type: UserActionTypes;
  problemDetail: IProblemDetail;
}
export const contactsFetchRequestFailureActionCreator = (problemDetail: IProblemDetail): IContactsFetchRequestFailureAction => ({
  type: CONTACTS_FETCH_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IUserFetchRequestAction extends Action {
  type: UserActionTypes;
  userId: string;
  accessToken?: string;
}
export const userFetchRequestActionCreator = (userId: string, accessToken?: string): IUserFetchRequestAction => ({
  type: USER_FETCH_REQUEST,
  userId: userId,
  accessToken: accessToken,
});

export interface IUserFetchRequestSuccessAction extends Action {
  type: UserActionTypes;
  user: IUser;
}
export const userFetchRequestSuccessActionCreator = (user: IUser): IUserFetchRequestSuccessAction => ({
  type: USER_FETCH_REQUEST_SUCCESS,
  user: user,
});

export interface IUserFetchRequestFailureAction extends Action {
  type: UserActionTypes;
  problemDetail: IProblemDetail;
}
export const userFetchRequestFailureActionCreator = (problemDetail: IProblemDetail): IUserFetchRequestFailureAction => ({
  type: USER_FETCH_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IMarkAsReadRequestAction extends Action {
  type: UserActionTypes;
  roomId: string;
}
export const markAsReadRequestActionCreator = (roomId: string): IMarkAsReadRequestAction => ({
  type: MARK_AS_READ_REQUEST,
  roomId: roomId,
});

export interface IMarkAsReadRequestSuccessAction extends Action {
  type: UserActionTypes;
}
export const markAsReadRequestSuccessActionCreator = (): IMarkAsReadRequestSuccessAction => ({
  type: MARK_AS_READ_REQUEST_SUCCESS,
});

export interface IMarkAsReadRequestFailureAction extends Action {
  type: UserActionTypes;
  problemDetail: IProblemDetail;
}

export const markAsReadRequestFailureActionCreator = (problemDetail: IProblemDetail): IMarkAsReadRequestFailureAction => ({
  type: MARK_AS_READ_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IUserBlockFetchRequestAction extends Action {
  type: UserActionTypes;
  blockUserIds: string[];
}
export const userBlockFetchRequestActionCreator = (blockUserIds: string[]): IUserBlockFetchRequestAction => ({
  type: USER_BLOCK_FETCH_REQUEST,
  blockUserIds: blockUserIds,
});

export interface IUserBlockFetchRequestSuccessAction extends Action {
  type: UserActionTypes;
  blocks: string[];
}
export const userBlockFetchRequestSuccessActionCreator = (blocks: string[]): IUserBlockFetchRequestSuccessAction => ({
  type: USER_BLOCK_FETCH_REQUEST_SUCCESS,
  blocks: blocks,
});

export interface IUserBlockFetchRequestFailureAction extends Action {
  type: UserActionTypes;
  problemDetail: IProblemDetail;
}
export const userBlockFetchRequestFailureActionCreator = (problemDetail: IProblemDetail): IUserBlockFetchRequestFailureAction => ({
  type: USER_BLOCK_FETCH_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IUserUnBlockFetchRequestAction extends Action {
  type: UserActionTypes;
  blockUserIds: string[];
}
export const userUnBlockFetchRequestActionCreator = (blockUserIds: string[]): IUserUnBlockFetchRequestAction => ({
  type: USER_UNBLOCK_FETCH_REQUEST,
  blockUserIds: blockUserIds,
});

export interface IUserUnBlockFetchRequestSuccessAction extends Action {
  type: UserActionTypes;
  blocks: string[];
}
export const userUnBlockFetchRequestSuccessActionCreator = (blocks: string[]): IUserUnBlockFetchRequestSuccessAction => ({
  type: USER_UNBLOCK_FETCH_REQUEST_SUCCESS,
  blocks: blocks,
});

export interface IUserUnBlockFetchRequestFailureAction extends Action {
  type: UserActionTypes;
  problemDetail: IProblemDetail;
}
export const userUnBlockFetchRequestFailureActionCreator = (problemDetail: IProblemDetail): IUserUnBlockFetchRequestFailureAction => ({
  type: USER_UNBLOCK_FETCH_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface IUpdateSelectContactsAction extends Action {
  type: UserActionTypes;
  contact: IUser;
}
export const updateSelectContactsActionCreator = (contact: IUser): IUpdateSelectContactsAction => ({
  type: UPDATE_SELECT_CONTACTS,
  contact: contact,
});

export interface IClearSelectContactsAction extends Action {
  type: UserActionTypes;
}
export const clearSelectContactsActionCreator = (): IClearSelectContactsAction => ({
  type: CLEAR_SELECT_CONTACTS,
});

export type UserActions = ISetUserAuthParamsAction
  | IUserAuthRequestAction
  | IContactsFetchRequestAction
  | IContactsFetchRequestSuccessAction
  | IContactsFetchRequestFailureAction
  | IUserFetchRequestAction
  | IUserFetchRequestSuccessAction
  | IUserFetchRequestFailureAction
  | IMarkAsReadRequestAction
  | IMarkAsReadRequestSuccessAction
  | IMarkAsReadRequestFailureAction
  | IUserBlockFetchRequestAction
  | IUserBlockFetchRequestSuccessAction
  | IUserBlockFetchRequestFailureAction
  | IUserUnBlockFetchRequestAction
  | IUserUnBlockFetchRequestSuccessAction
  | IUserUnBlockFetchRequestFailureAction
  | IUpdateSelectContactsAction
  | IClearSelectContactsAction
;

export const userBlockFetchRequestActionDispatch = (blockUserIds: string[]) => store.dispatch(userBlockFetchRequestActionCreator(blockUserIds));
export const userUnBlockFetchRequestActionDispatch = (blockUserIds: string[]) => store.dispatch(userUnBlockFetchRequestActionCreator(blockUserIds));
export const contactsFetchRequestActionDispatch = () => store.dispatch(contactsFetchRequestActionCreator());
export const updateSelectContactsActionDispatch = (contact: IUser) => store.dispatch(updateSelectContactsActionCreator(contact));
export const clearSelectContactsActionDispatch = () => store.dispatch(clearSelectContactsActionCreator());
export const markAsReadRequestActionDispatch = (roomId: string) => store.dispatch(markAsReadRequestActionCreator(roomId));
