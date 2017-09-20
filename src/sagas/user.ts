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
  AUTH_REQUEST,
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
import { setClientActionCreator } from '../actions/client';
import { State } from '../stores';

function* gAuthRequest() {
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
    yield put(fetchUserRequestSuccessActionCreator(res.user));
  } else {
    yield put(fetchUserRequestFailureActionCreator(res.error!));
  }
}

function* gFetchContactsRequest() {
  const res: IFetchUsersResponse = yield call(() => {
    return getContacts();
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
  const res: IFetchUserResponse = yield call((roomId: string) => {
    return markAsRead(roomId);
  }, action.roomId);
  if (res.error) {
    yield put(markAsReadRequestFailureActionCreator(res.error!));
  } else {
    yield put(markAsReadRequestSuccessActionCreator());
  }
}

function* gUserBlockRequest(action: IUserBlockRequestAction) {
  const res: IFetchBlockUsersResponse = yield call((blockUserIds: string[]) => {
    return addBlockUsers(blockUserIds);
  }, action.blockUserIds);
  if (res.blockUsers) {
    yield put(userBlockRequestSuccessActionCreator(res.blockUsers));
  } else {
    yield put(userBlockRequestFailureActionCreator(res.error!));
  }
}

function* gUserUnBlockRequest(action: IUserUnBlockRequestAction) {
  const res: IFetchBlockUsersResponse = yield call((blockUserIds: string[]) => {
    return removeBlockUsers(blockUserIds);
  }, action.blockUserIds);
  if (res.blockUsers) {
    yield put(userUnBlockRequestSuccessActionCreator(res.blockUsers));
  } else {
    yield put(userUnBlockRequestFailureActionCreator(res.error!));
  }
}

export function* userSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(AUTH_REQUEST, gAuthRequest);
  yield takeLatest(FETCH_CONTACTS_REQUEST, gFetchContactsRequest);
  yield takeLatest(FETCH_USER_REQUEST, gFetchUserRequest);
  yield takeLatest(MARK_AS_READ_REQUEST, gMarkAsReadRequest);
  yield takeLatest(USER_BLOCK_REQUEST, gUserBlockRequest);
  yield takeLatest(USER_UNBLOCK_REQUEST, gUserUnBlockRequest);
}
