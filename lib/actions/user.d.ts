import { Action } from 'redux';
import { User, IUser, IProblemDetail } from '../';
export declare const SET_USER_AUTH_PARAMS = "SET_USER_AUTH_PARAMS";
export declare const USER_AUTH_REQUEST = "USER_AUTH_REQUEST";
export declare const CONTACTS_FETCH_REQUEST = "CONTACTS_FETCH_REQUEST";
export declare const CONTACTS_FETCH_REQUEST_SUCCESS = "CONTACTS_FETCH_REQUEST_SUCCESS";
export declare const CONTACTS_FETCH_REQUEST_FAILURE = "CONTACTS_FETCH_REQUEST_FAILURE";
export declare const USER_FETCH_REQUEST = "USER_FETCH_REQUEST";
export declare const USER_FETCH_REQUEST_SUCCESS = "USER_FETCH_REQUEST_SUCCESS";
export declare const USER_FETCH_REQUEST_FAILURE = "USER_FETCH_REQUEST_FAILURE";
export declare const MARK_AS_READ_REQUEST = "MARK_AS_READ_REQUEST";
export declare const MARK_AS_READ_REQUEST_SUCCESS = "MARK_AS_READ_REQUEST_SUCCESS";
export declare const MARK_AS_READ_REQUEST_FAILURE = "MARK_AS_READ_REQUEST_FAILURE";
export declare const USER_BLOCK_FETCH_REQUEST = "USER_BLOCK_FETCH_REQUEST";
export declare const USER_BLOCK_FETCH_REQUEST_SUCCESS = "USER_BLOCK_FETCH_REQUEST_SUCCESS";
export declare const USER_BLOCK_FETCH_REQUEST_FAILURE = "USER_BLOCK_FETCH_REQUEST_FAILURE";
export declare const USER_UNBLOCK_FETCH_REQUEST = "USER_UNBLOCK_FETCH_REQUEST";
export declare const USER_UNBLOCK_FETCH_REQUEST_SUCCESS = "USER_UNBLOCK_FETCH_REQUEST_SUCCESS";
export declare const USER_UNBLOCK_FETCH_REQUEST_FAILURE = "USER_UNBLOCK_FETCH_REQUEST_FAILURE";
export declare const UPDATE_SELECT_CONTACTS = "UPDATE_SELECT_CONTACTS";
export declare const CLEAR_SELECT_CONTACTS = "CLEAR_SELECT_CONTACTS";
export declare type UserActionTypes = typeof SET_USER_AUTH_PARAMS | typeof USER_AUTH_REQUEST | typeof CONTACTS_FETCH_REQUEST | typeof CONTACTS_FETCH_REQUEST_SUCCESS | typeof CONTACTS_FETCH_REQUEST_FAILURE | typeof USER_FETCH_REQUEST | typeof USER_FETCH_REQUEST_SUCCESS | typeof USER_FETCH_REQUEST_FAILURE | typeof MARK_AS_READ_REQUEST | typeof MARK_AS_READ_REQUEST_SUCCESS | typeof MARK_AS_READ_REQUEST_FAILURE | typeof USER_BLOCK_FETCH_REQUEST | typeof USER_BLOCK_FETCH_REQUEST_SUCCESS | typeof USER_BLOCK_FETCH_REQUEST_FAILURE | typeof USER_UNBLOCK_FETCH_REQUEST | typeof USER_UNBLOCK_FETCH_REQUEST_SUCCESS | typeof USER_UNBLOCK_FETCH_REQUEST_FAILURE | typeof UPDATE_SELECT_CONTACTS | typeof CLEAR_SELECT_CONTACTS;
export interface ISetUserAuthParamsAction extends Action {
    type: UserActionTypes;
    apiKey: string;
    apiEndpoint: string;
    realtimeEndpoint: string;
    userId: string;
    accessToken: string;
}
export declare const setUserAuthParamsActionCreator: (apiKey: string, apiEndpoint: string, realtimeEndpoint: string, userId: string, accessToken: string) => ISetUserAuthParamsAction;
export interface IUserAuthRequestAction extends Action {
    type: UserActionTypes;
}
export declare const userAuthRequestActionCreator: () => IContactsFetchRequestAction;
export interface IContactsFetchRequestAction extends Action {
    type: UserActionTypes;
}
export declare const contactsFetchRequestActionCreator: () => IContactsFetchRequestAction;
export interface IContactsFetchRequestSuccessAction extends Action {
    type: UserActionTypes;
    contacts: IUser[];
}
export declare const contactsFetchRequestSuccessActionCreator: (contacts: IUser[]) => IContactsFetchRequestSuccessAction;
export interface IContactsFetchRequestFailureAction extends Action {
    type: UserActionTypes;
    problemDetail: IProblemDetail;
}
export declare const contactsFetchRequestFailureActionCreator: (problemDetail: IProblemDetail) => IContactsFetchRequestFailureAction;
export interface IUserFetchRequestAction extends Action {
    type: UserActionTypes;
    userId: string;
    accessToken?: string;
}
export declare const userFetchRequestActionCreator: (userId: string, accessToken?: string | undefined) => IUserFetchRequestAction;
export interface IUserFetchRequestSuccessAction extends Action {
    type: UserActionTypes;
    user: User;
}
export declare const userFetchRequestSuccessActionCreator: (user: User) => IUserFetchRequestSuccessAction;
export interface IUserFetchRequestFailureAction extends Action {
    type: UserActionTypes;
    problemDetail: IProblemDetail;
}
export declare const userFetchRequestFailureActionCreator: (problemDetail: IProblemDetail) => IUserFetchRequestFailureAction;
export interface IMarkAsReadRequestAction extends Action {
    type: UserActionTypes;
    roomId: string;
}
export declare const markAsReadRequestActionCreator: (roomId: string) => IMarkAsReadRequestAction;
export interface IMarkAsReadRequestSuccessAction extends Action {
    type: UserActionTypes;
}
export declare const markAsReadRequestSuccessActionCreator: () => IMarkAsReadRequestSuccessAction;
export interface IMarkAsReadRequestFailureAction extends Action {
    type: UserActionTypes;
    problemDetail: IProblemDetail;
}
export declare const markAsReadRequestFailureActionCreator: (problemDetail: IProblemDetail) => IMarkAsReadRequestFailureAction;
export interface IUserBlockFetchRequestAction extends Action {
    type: UserActionTypes;
    blockUserIds: string[];
}
export declare const userBlockFetchRequestActionCreator: (blockUserIds: string[]) => IUserBlockFetchRequestAction;
export interface IUserBlockFetchRequestSuccessAction extends Action {
    type: UserActionTypes;
    blocks: string[];
}
export declare const userBlockFetchRequestSuccessActionCreator: (blocks: string[]) => IUserBlockFetchRequestSuccessAction;
export interface IUserBlockFetchRequestFailureAction extends Action {
    type: UserActionTypes;
    problemDetail: IProblemDetail;
}
export declare const userBlockFetchRequestFailureActionCreator: (problemDetail: IProblemDetail) => IUserBlockFetchRequestFailureAction;
export interface IUserUnBlockFetchRequestAction extends Action {
    type: UserActionTypes;
    blockUserIds: string[];
}
export declare const userUnBlockFetchRequestActionCreator: (blockUserIds: string[]) => IUserUnBlockFetchRequestAction;
export interface IUserUnBlockFetchRequestSuccessAction extends Action {
    type: UserActionTypes;
    blocks: string[];
}
export declare const userUnBlockFetchRequestSuccessActionCreator: (blocks: string[]) => IUserUnBlockFetchRequestSuccessAction;
export interface IUserUnBlockFetchRequestFailureAction extends Action {
    type: UserActionTypes;
    problemDetail: IProblemDetail;
}
export declare const userUnBlockFetchRequestFailureActionCreator: (problemDetail: IProblemDetail) => IUserUnBlockFetchRequestFailureAction;
export interface IUpdateSelectContactsAction extends Action {
    type: UserActionTypes;
    contact: IUser;
}
export declare const updateSelectContactsActionCreator: (contact: IUser) => IUpdateSelectContactsAction;
export interface IClearSelectContactsAction extends Action {
    type: UserActionTypes;
}
export declare const clearSelectContactsActionCreator: () => IClearSelectContactsAction;
export declare type UserActions = ISetUserAuthParamsAction | IUserAuthRequestAction | IContactsFetchRequestAction | IContactsFetchRequestSuccessAction | IContactsFetchRequestFailureAction | IUserFetchRequestAction | IUserFetchRequestSuccessAction | IUserFetchRequestFailureAction | IMarkAsReadRequestAction | IMarkAsReadRequestSuccessAction | IMarkAsReadRequestFailureAction | IUserBlockFetchRequestAction | IUserBlockFetchRequestSuccessAction | IUserBlockFetchRequestFailureAction | IUserUnBlockFetchRequestAction | IUserUnBlockFetchRequestSuccessAction | IUserUnBlockFetchRequestFailureAction | IUpdateSelectContactsAction | IClearSelectContactsAction;
