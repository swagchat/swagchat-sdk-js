import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import { User, IFetchUserResponse, IFetchUsersResponse, IFetchBlockUsersResponse } from '../';
import {
  USER_AUTH_REQUEST,
  CONTACTS_FETCH_REQUEST,
  USER_FETCH_REQUEST,
  MARK_AS_READ_REQUEST,
  USER_BLOCK_FETCH_REQUEST,
  USER_UNBLOCK_FETCH_REQUEST,
  IUserFetchRequestAction,
  IMarkAsReadRequestAction,
  IUserBlockFetchRequestAction,
  IUserUnBlockFetchRequestAction,
  contactsFetchRequestSuccessActionCreator,
  contactsFetchRequestFailureActionCreator,
  userFetchRequestSuccessActionCreator,
  userFetchRequestFailureActionCreator,
  markAsReadRequestSuccessActionCreator,
  markAsReadRequestFailureActionCreator,
  userBlockFetchRequestSuccessActionCreator,
  userBlockFetchRequestFailureActionCreator,
  userUnBlockFetchRequestSuccessActionCreator,
  userUnBlockFetchRequestFailureActionCreator,
} from '../actions/user';
import { setClientActionCreator } from '../actions/client';
import { State } from '../stores';

function* authUser() {
  const state: State = yield select();
  const res: IFetchUserResponse = yield call(() => {
    return User.auth({
      apiKey: state.user.apiKey,
      apiEndpoint: state.user.apiEndpoint,
      realtimeEndpoint: state.user.realtimeEndpoint,
      userId: state.user.userId,
      accessToken: state.user.accessToken,
    });
  });
  if (res.user) {
    yield put(setClientActionCreator(res.user._client));
    yield put(userFetchRequestSuccessActionCreator(res.user));
  } else {
    yield put(userFetchRequestFailureActionCreator(res.error!));
  }
}

function* fetchContacts() {
  const state: State = yield select();
  const res: IFetchUsersResponse = yield call(() => {
    return state.user.user!.getContacts();
  });
  if (res.users) {
    yield put(contactsFetchRequestSuccessActionCreator(res.users));
  } else {
    yield put(contactsFetchRequestFailureActionCreator(res.error!));
  }
}

function* fetchUser(action: IUserFetchRequestAction) {
  const state: State = yield select();
  const res: IFetchUserResponse = yield call((userId: string, accessToken: string) => {
    return state.client.client!.getUser(userId, accessToken);
  }, action.userId, action.accessToken);
  if (res.user) {
    yield put(userFetchRequestSuccessActionCreator(res.user));
  } else {
    yield put(userFetchRequestFailureActionCreator(res.error!));
  }
}

function* markAsRead(action: IMarkAsReadRequestAction) {
  const state: State = yield select();
  const res: IFetchUserResponse = yield call((roomId: string) => {
    return state.user.user!.markAsRead(roomId);
  }, action.roomId);
  if (res.error) {
    yield put(markAsReadRequestFailureActionCreator(res.error!));
  } else {
    yield put(markAsReadRequestSuccessActionCreator());
  }
}

function* fetchUserBlock(action: IUserBlockFetchRequestAction) {
  const state: State = yield select();
  const res: IFetchBlockUsersResponse = yield call((blockUserIds: string[]) => {
    return state.user.user!.addBlockUsers(blockUserIds);
  }, action.blockUserIds);
  if (res.blockUsers) {
    yield put(userBlockFetchRequestSuccessActionCreator(res.blockUsers));
  } else {
    yield put(userBlockFetchRequestFailureActionCreator(res.error!));
  }
}

function* fetchUserUnBlock(action: IUserUnBlockFetchRequestAction) {
  const state: State = yield select();
  const res: IFetchBlockUsersResponse = yield call((blockUserIds: string[]) => {
    return state.user.user!.removeBlockUsers(blockUserIds);
  }, action.blockUserIds);
  if (res.blockUsers) {
    yield put(userUnBlockFetchRequestSuccessActionCreator(res.blockUsers));
  } else {
    yield put(userUnBlockFetchRequestFailureActionCreator(res.error!));
  }
}

export function* userSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(USER_AUTH_REQUEST, authUser);
  yield takeLatest(CONTACTS_FETCH_REQUEST, fetchContacts);
  yield takeLatest(USER_FETCH_REQUEST, fetchUser);
  yield takeLatest(MARK_AS_READ_REQUEST, markAsRead);
  yield takeLatest(USER_BLOCK_FETCH_REQUEST, fetchUserBlock);
  yield takeLatest(USER_UNBLOCK_FETCH_REQUEST, fetchUserUnBlock);
}
