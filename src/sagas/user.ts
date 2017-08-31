import { takeLatest, call, put, select, ForkEffect } from 'redux-saga/effects';
import {
  Client,
  IFetchUserResponse,
  IFetchUsersResponse,
  IFetchBlockUsersResponse,
  addBlockUsers,
  removeBlockUsers,
  getContacts,
  markAsRead,
} from '../';
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

function* gAuthUser() {
  const state: State = yield select();
  const res: IFetchUserResponse = yield call(() => {
    return Client.auth({
      apiKey: state.user.apiKey,
      apiEndpoint: state.user.apiEndpoint,
      realtimeEndpoint: state.user.realtimeEndpoint,
      userId: state.user.userId,
      accessToken: state.user.accessToken,
    });
  });
  if (res.user) {
    const client = new Client({
      apiKey: state.user.apiKey,
      apiEndpoint: state.user.apiEndpoint,
      realtime: {
        endpoint: state.user.realtimeEndpoint,
      },
      userId: state.user.userId,
      userAccessToken: state.user.accessToken,
    });
    yield put(setClientActionCreator(client));
    yield put(userFetchRequestSuccessActionCreator(res.user));
  } else {
    yield put(userFetchRequestFailureActionCreator(res.error!));
  }
}

function* gGetContacts() {
  const res: IFetchUsersResponse = yield call(() => {
    return getContacts();
  });
  if (res.users) {
    yield put(contactsFetchRequestSuccessActionCreator(res.users));
  } else {
    yield put(contactsFetchRequestFailureActionCreator(res.error!));
  }
}

function* gGetUser(action: IUserFetchRequestAction) {
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

function* gMarkAsRead(action: IMarkAsReadRequestAction) {
  const res: IFetchUserResponse = yield call((roomId: string) => {
    return markAsRead(roomId);
  }, action.roomId);
  if (res.error) {
    yield put(markAsReadRequestFailureActionCreator(res.error!));
  } else {
    yield put(markAsReadRequestSuccessActionCreator());
  }
}

function* gGetUserBlock(action: IUserBlockFetchRequestAction) {
  const res: IFetchBlockUsersResponse = yield call((blockUserIds: string[]) => {
    return addBlockUsers(blockUserIds);
  }, action.blockUserIds);
  if (res.blockUsers) {
    yield put(userBlockFetchRequestSuccessActionCreator(res.blockUsers));
  } else {
    yield put(userBlockFetchRequestFailureActionCreator(res.error!));
  }
}

function* gGetUserUnBlock(action: IUserUnBlockFetchRequestAction) {
  const res: IFetchBlockUsersResponse = yield call((blockUserIds: string[]) => {
    return removeBlockUsers(blockUserIds);
  }, action.blockUserIds);
  if (res.blockUsers) {
    yield put(userUnBlockFetchRequestSuccessActionCreator(res.blockUsers));
  } else {
    yield put(userUnBlockFetchRequestFailureActionCreator(res.error!));
  }
}

export function* userSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(USER_AUTH_REQUEST, gAuthUser);
  yield takeLatest(CONTACTS_FETCH_REQUEST, gGetContacts);
  yield takeLatest(USER_FETCH_REQUEST, gGetUser);
  yield takeLatest(MARK_AS_READ_REQUEST, gMarkAsRead);
  yield takeLatest(USER_BLOCK_FETCH_REQUEST, gGetUserBlock);
  yield takeLatest(USER_UNBLOCK_FETCH_REQUEST, gGetUserUnBlock);
}
