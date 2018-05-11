import { takeLatest, call, put, ForkEffect, select } from 'redux-saga/effects';
import { State } from '../stores';

import {
  IUser,
  IRoomForUser,
  IFetchUserResponse,
  IFetchUsersResponse,
  IFetchBlockUsersResponse,
  opponentUser,
  generateRoomName,
} from '../';
import {
  FETCH_USER_REQUEST,
  FETCH_PROFILE_USER_REQUEST,
  FETCH_CONTACTS_REQUEST,
  MARK_AS_READ_REQUEST,
  USER_BLOCK_REQUEST,
  USER_UNBLOCK_REQUEST,
  FetchProfileUserRequestAction,
  MarkAsReadRequestAction,
  UserBlockRequestAction,
  UserUnBlockRequestAction,
  FetchUserRequestAction,
  fetchUserRequestActionCreator,
  fetchUserRequestSuccessActionCreator,
  fetchUserRequestFailureActionCreator,
  fetchProfileUserRequestSuccessActionCreator,
  fetchProfileUserRequestFailureActionCreator,
  fetchContactsRequestSuccessActionCreator,
  fetchContactsRequestFailureActionCreator,
  markAsReadRequestSuccessActionCreator,
  markAsReadRequestFailureActionCreator,
  userBlockRequestSuccessActionCreator,
  userBlockRequestFailureActionCreator,
  userUnBlockRequestSuccessActionCreator,
  userUnBlockRequestFailureActionCreator,
} from '../actions/user';
import {
  setCurrentRoomIdActionCreator,
  setCurrentRoomNameActionCreator,
} from '../actions/room';

function* gFetchUserRequest(action: FetchUserRequestAction) {
  const state: State = yield select();
  let userRooms: {[key: string]: IRoomForUser} = {};
  const userRes: IFetchUserResponse = yield call(() => {
    return state.client.client!.getUser();
  });
  if (userRes.user !== null) {
    if (userRes.user.rooms !== undefined) {
      userRes.user.rooms!.map((roomForUser: IRoomForUser) => {
        const users = opponentUser(roomForUser.users, userRes.user!.userId);
        if (users) {
          roomForUser.name = roomForUser.name === '' ?
            generateRoomName(roomForUser.users, userRes.user!.userId, roomForUser.type) : roomForUser.name;
          roomForUser.pictureUrl = users[0].pictureUrl;
        }
        userRooms[roomForUser.roomId] = roomForUser;
      });
    }
    yield put(fetchUserRequestSuccessActionCreator(userRes.user, userRooms, userRes.user.blocks!));
    if (action.updateLastAccessRoomId && userRes.user.lastAccessRoomId) {
      yield put(setCurrentRoomIdActionCreator(userRes.user.lastAccessRoomId));
      yield put(setCurrentRoomNameActionCreator(userRooms[userRes.user.lastAccessRoomId].name));
    }
  } else {
    yield put(fetchUserRequestFailureActionCreator(userRes.error!));
  }
}

function* gFetchProfileUserRequest(action: FetchProfileUserRequestAction) {
  const state: State = yield select();
  const userRes: IFetchUserResponse = yield call((profileUserId: string) => {
    return state.client.client!.getProfileUser(profileUserId);
  }, action.profileUserId);
  if (userRes.user !== null) {
    yield put(fetchProfileUserRequestSuccessActionCreator(userRes.user));
  } else {
    yield put(fetchProfileUserRequestFailureActionCreator(userRes.error!));
  }
}

function* gFetchContactsRequest() {
  const state: State = yield select();
  const res: IFetchUsersResponse = yield call(() => {
    return state.client.client!.getContacts();
  });
  if (res.users) {
    let users: {[key: string]: IUser} = {};
    res.users.map((value: IUser) => {
      users[value.userId] = value;
    });
    yield put(fetchContactsRequestSuccessActionCreator(users));
  } else {
    yield put(fetchContactsRequestFailureActionCreator(res.error!));
  }
}

function* gMarkAsReadRequest(action: MarkAsReadRequestAction) {
  const state: State = yield select();
  const res: IFetchUserResponse = yield call((roomId: string) => {
    return state.client.client!.markAsRead(roomId);
  }, action.roomId);
  if (res.error) {
    yield put(markAsReadRequestFailureActionCreator(res.error!));
  } else {
    yield put(markAsReadRequestSuccessActionCreator());
  }
}

function* gUserBlockRequest(action: UserBlockRequestAction) {
  const state: State = yield select();
  const res: IFetchBlockUsersResponse = yield call((blockUserIds: string[]) => {
    return state.client.client!.addBlockUsers(blockUserIds);
  }, action.blockUserIds);
  if (res.blockUsers) {
    yield put(userBlockRequestSuccessActionCreator(res.blockUsers));
    yield put(fetchUserRequestActionCreator(false));
  } else {
    yield put(userBlockRequestFailureActionCreator(res.error!));
  }
}

function* gUserUnBlockRequest(action: UserUnBlockRequestAction) {
  const state: State = yield select();
  const res: IFetchBlockUsersResponse = yield call((unBlockUserIds: string[]) => {
    return state.client.client!.removeBlockUsers(unBlockUserIds);
  }, action.unBlockUserIds);
  if (res.blockUsers) {
    yield put(userUnBlockRequestSuccessActionCreator(res.blockUsers));
    yield put(fetchUserRequestActionCreator(false));
  } else {
    yield put(userUnBlockRequestFailureActionCreator(res.error!));
  }
}

export function* userSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(FETCH_USER_REQUEST, gFetchUserRequest);
  yield takeLatest(FETCH_PROFILE_USER_REQUEST, gFetchProfileUserRequest);
  yield takeLatest(FETCH_CONTACTS_REQUEST, gFetchContactsRequest);
  yield takeLatest(MARK_AS_READ_REQUEST, gMarkAsReadRequest);
  yield takeLatest(USER_BLOCK_REQUEST, gUserBlockRequest);
  yield takeLatest(USER_UNBLOCK_REQUEST, gUserUnBlockRequest);
}
