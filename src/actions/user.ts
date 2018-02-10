import { Action } from 'redux';
import { User, IRoomForUser, IProblemDetail } from '../';

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_REQUEST_SUCCESS = 'FETCH_USER_REQUEST_SUCCESS';
export const FETCH_USER_REQUEST_FAILURE = 'FETCH_USER_REQUEST_FAILURE';

export type UserActionTypes =
  typeof FETCH_USER_REQUEST |
  typeof FETCH_USER_REQUEST_SUCCESS |
  typeof FETCH_USER_REQUEST_FAILURE
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

export type UserActions =
  UserBaseAction |
  FetchUserRequestAction |
  FetchUserRequestSuccessAction |
  FetchUserRequestFailureAction
;
