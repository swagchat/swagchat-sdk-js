import { Action } from 'redux';
import { User, IUser, IRoomForUser, IProblemDetail } from '../';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_REQUEST_SUCCESS = 'FETCH_USER_REQUEST_SUCCESS';
export const FETCH_USER_REQUEST_FAILURE = 'FETCH_USER_REQUEST_FAILURE';
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_REQUEST_SUCCESS = 'FETCH_USERS_REQUEST_SUCCESS';
export const FETCH_USERS_REQUEST_FAILURE = 'FETCH_USERS_REQUEST_FAILURE';
export const FETCH_CONTACTS_REQUEST = 'FETCH_CONTACTS_REQUEST';
export const FETCH_CONTACTS_REQUEST_SUCCESS = 'FETCH_CONTACTS_REQUEST_SUCCESS';
export const FETCH_CONTACTS_REQUEST_FAILURE = 'FETCH_CONTACTS_REQUEST_FAILURE';
export const UPDATE_SELECT_CONTACTS = 'UPDATE_SELECT_CONTACTS';
export const CLEAR_SELECT_CONTACTS = 'CLEAR_SELECT_CONTACTS';

export type UserActionTypes =
  typeof FETCH_USER_REQUEST |
  typeof FETCH_USER_REQUEST_SUCCESS |
  typeof FETCH_USER_REQUEST_FAILURE |
  typeof FETCH_USERS_REQUEST |
  typeof FETCH_USERS_REQUEST_SUCCESS |
  typeof FETCH_USERS_REQUEST_FAILURE |
  typeof FETCH_CONTACTS_REQUEST |
  typeof FETCH_CONTACTS_REQUEST_SUCCESS |
  typeof FETCH_CONTACTS_REQUEST_FAILURE |
  typeof UPDATE_SELECT_CONTACTS |
  typeof CLEAR_SELECT_CONTACTS
;

export interface UserBaseAction extends Action {
  type: UserActionTypes;
}

export interface FetchUserRequestAction extends UserBaseAction {
}
export const fetchUserRequestActionCreator = (): FetchUserRequestAction => ({
  type: FETCH_USER_REQUEST,
});

export interface FetchUserRequestSuccessAction extends UserBaseAction {
  user: User;
  userRooms: {[key: string]: IRoomForUser};
}
export const fetchUserRequestSuccessActionCreator = (
  user: User, userRooms: {[key: string]: IRoomForUser}): FetchUserRequestSuccessAction => ({
    type: FETCH_USER_REQUEST_SUCCESS,
    user: user,
    userRooms: userRooms,
});

export interface FetchUserRequestFailureAction extends UserBaseAction {
  problemDetail: IProblemDetail;
}
export const fetchUserRequestFailureActionCreator = (problemDetail: IProblemDetail): FetchUserRequestFailureAction => ({
  type: FETCH_USER_REQUEST_FAILURE,
  problemDetail: problemDetail,
});

export interface FetchUsersRequestAction extends UserBaseAction {
}
export const fetchUsersRequestActionCreator = (): FetchUsersRequestAction => ({
  type: FETCH_USERS_REQUEST,
});

export interface FetchUsersRequestSuccessAction extends UserBaseAction {
  users: {[key: string]: IUser};
}
export const fetchUsersRequestSuccessActionCreator = (users: {[key: string]: IUser}): FetchUsersRequestSuccessAction => ({
    type: FETCH_USERS_REQUEST_SUCCESS,
    users: users,
});

export interface FetchUsersRequestFailureAction extends UserBaseAction {
  problemDetail: IProblemDetail;
}
export const fetchUsersRequestFailureActionCreator = (problemDetail: IProblemDetail): FetchUsersRequestFailureAction => ({
  type: FETCH_USERS_REQUEST_FAILURE,
  problemDetail: problemDetail,
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
  problemDetail: IProblemDetail;
}
export const fetchContactsRequestFailureActionCreator
 = (problemDetail: IProblemDetail): FetchContactsRequestFailureAction => ({
  type: FETCH_CONTACTS_REQUEST_FAILURE,
  problemDetail: problemDetail,
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

export type UserActions =
  UserBaseAction |
  FetchUserRequestAction |
  FetchUserRequestSuccessAction |
  FetchUserRequestFailureAction |
  FetchUsersRequestAction |
  FetchUsersRequestSuccessAction |
  FetchUsersRequestFailureAction |
  FetchContactsRequestAction |
  FetchContactsRequestSuccessAction |
  FetchContactsRequestFailureAction |
  UpdateSelectContactsAction |
  ClearSelectContactsAction
;
