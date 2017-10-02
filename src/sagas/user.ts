import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import {
  IFetchUserResponse,
  IFetchUsersResponse,
  IFetchBlockUsersResponse,
} from '../';
import {
  FETCH_CONTACTS_REQUEST,
  FETCH_USER_REQUEST,
  MARK_AS_READ_REQUEST,
  USER_BLOCK_REQUEST,
  USER_UNBLOCK_REQUEST,
  IFetchUserRequestAction,
  IMarkAsReadRequestAction,
  IUserBlockRequestAction,
  IUserUnBlockRequestAction,
  fetchContactsRequestSuccessActionCreator,
  fetchContactsRequestFailureActionCreator,
  fetchUserRequestSuccessActionCreator,
  fetchUserRequestFailureActionCreator,
  markAsReadRequestSuccessActionCreator,
  markAsReadRequestFailureActionCreator,
  userBlockRequestSuccessActionCreator,
  userBlockRequestFailureActionCreator,
  userUnBlockRequestSuccessActionCreator,
  userUnBlockRequestFailureActionCreator,
} from '../actions/user';
import { State } from '../stores';

function* gFetchContactsRequest() {
  const state: State = yield select();
  const res: IFetchUsersResponse = yield call(() => {
    return state.client.client!.user.getContacts();
  });
  if (res.users) {
    yield put(fetchContactsRequestSuccessActionCreator(res.users));
  } else {
    yield put(fetchContactsRequestFailureActionCreator(res.error!));
  }
}

function* gFetchUserRequest(action: IFetchUserRequestAction) {
  const state: State = yield select();
  const res: IFetchUserResponse = yield call((userId: string, accessToken: string) => {
    return state.client.client!.getUser(userId, accessToken);
  }, action.userId, action.accessToken);
  if (res.user) {
    yield put(fetchUserRequestSuccessActionCreator(res.user));
  } else {
    yield put(fetchUserRequestFailureActionCreator(res.error!));
  }
}

function* gMarkAsReadRequest(action: IMarkAsReadRequestAction) {
  const state: State = yield select();
  const res: IFetchUserResponse = yield call((roomId: string) => {
    return state.client.client!.user.markAsRead(roomId);
  }, action.roomId);
  if (res.error) {
    yield put(markAsReadRequestFailureActionCreator(res.error!));
  } else {
    yield put(markAsReadRequestSuccessActionCreator());
  }
}

function* gUserBlockRequest(action: IUserBlockRequestAction) {
  const state: State = yield select();
  const res: IFetchBlockUsersResponse = yield call((blockUserIds: string[]) => {
    return state.client.client!.user.addBlockUsers(blockUserIds);
  }, action.blockUserIds);
  if (res.blockUsers) {
    yield put(userBlockRequestSuccessActionCreator(res.blockUsers));
  } else {
    yield put(userBlockRequestFailureActionCreator(res.error!));
  }
}

function* gUserUnBlockRequest(action: IUserUnBlockRequestAction) {
  const state: State = yield select();
  const res: IFetchBlockUsersResponse = yield call((blockUserIds: string[]) => {
    return state.client.client!.user.removeBlockUsers(blockUserIds);
  }, action.blockUserIds);
  if (res.blockUsers) {
    yield put(userUnBlockRequestSuccessActionCreator(res.blockUsers));
  } else {
    yield put(userUnBlockRequestFailureActionCreator(res.error!));
  }
}

export function* userSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(FETCH_CONTACTS_REQUEST, gFetchContactsRequest);
  yield takeLatest(FETCH_USER_REQUEST, gFetchUserRequest);
  yield takeLatest(MARK_AS_READ_REQUEST, gMarkAsReadRequest);
  yield takeLatest(USER_BLOCK_REQUEST, gUserBlockRequest);
  yield takeLatest(USER_UNBLOCK_REQUEST, gUserUnBlockRequest);
}
