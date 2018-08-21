import { call, ForkEffect, put, select, takeLatest } from 'redux-saga/effects';

import {
    IAddBlockUsersRequest, IDeleteBlockUsersRequest, IFetchBlockUsersResponse, IFetchUserResponse,
    IFetchUsersResponse, IRetrieveUserRequest, IUser
} from '..';
import { setCurrentRoomIdActionCreator } from '../actions/room';
import {
    FETCH_CONTACTS_REQUEST, FETCH_PROFILE_USER_REQUEST, FETCH_USER_REQUEST,
    fetchContactsRequestFailureActionCreator, fetchContactsRequestSuccessActionCreator,
    FetchProfileUserRequestAction, fetchProfileUserRequestFailureActionCreator,
    fetchProfileUserRequestSuccessActionCreator, FetchUserRequestAction,
    fetchUserRequestActionCreator, fetchUserRequestFailureActionCreator,
    fetchUserRequestSuccessActionCreator, MARK_AS_READ_REQUEST, MarkAsReadRequestAction,
    markAsReadRequestFailureActionCreator, markAsReadRequestSuccessActionCreator,
    USER_BLOCK_REQUEST, USER_UNBLOCK_REQUEST, UserBlockRequestAction,
    userBlockRequestFailureActionCreator, userBlockRequestSuccessActionCreator,
    UserUnBlockRequestAction, userUnBlockRequestFailureActionCreator,
    userUnBlockRequestSuccessActionCreator
} from '../actions/user';

import { State } from '../stores';

function* gFetchUserRequest(action: FetchUserRequestAction) {
  const state: State = yield select();
  const client = state.client.client;

  if (!client) {
    return;
  }

  // let userRooms: {[key: string]: IMiniRoom} = {};
  const userRes: IFetchUserResponse = yield call((userId: string) => {
    const req = {
      userId
    } as IRetrieveUserRequest;
    return client.retrieveUser(req);
  }, action.userId);
  if (userRes.user !== null) {
    // if (userRes.user.rooms !== undefined) {
    //   userRes.user.rooms!.map((roomForUser: IMiniRoom) => {
    //     const users = opponentUser(roomForUser.users, userRes.user!.userId);
    //     if (users) {
    //       if (roomForUser.name === '') {
    //         roomForUser.name = roomForUser.name === '' ?
    //           generateRoomName(roomForUser.users, userRes.user!.userId) : roomForUser.name;
    //       }
    //       roomForUser.pictureUrl = users[0].pictureUrl ? users[0].pictureUrl : '';
    //     }
    //     userRooms[roomForUser.roomId] = roomForUser;
    //   });
      yield put(fetchUserRequestSuccessActionCreator(userRes.user));
    // }

    if (location) {
      let messagesPathRegExp = location.pathname.match(new RegExp('^' + client.paths.messageListPath));
      if (messagesPathRegExp !== null) {
        const roomIds = location.pathname.match(new RegExp(client.paths.messageListPath + '/([a-zA-z0-9-]+)'));
        if (roomIds !== null) {
          // const currentRoomId = roomIds[1];
          // let state: State = yield select();
          // if (state.user.userRoomsMap![currentRoomId] !== undefined) {
          //   yield put(setCurrentRoomIdActionCreator(currentRoomId));
          //   // yield put(setCurrentRoomNameActionCreator(state.user.userRooms![currentRoomId].name));
          // }
          return;
        }
      }
    }

    const lastAccessRoomId = userRes.user!.lastAccessRoomId;
    if (action.updateLastAccessRoomId && lastAccessRoomId) {
      yield put(setCurrentRoomIdActionCreator(lastAccessRoomId));
      // yield put(setCurrentRoomNameActionCreator(userRooms[lastAccessRoomId].name));
    }
  } else {
    yield put(fetchUserRequestFailureActionCreator(userRes.error!));
  }
}

function* gFetchProfileUserRequest(action: FetchProfileUserRequestAction) {
  const state: State = yield select();
  const user = state.user.user!;
  const userRes: IFetchUserResponse = yield call((userId: string) => {
    const req = {
      userId
    } as IRetrieveUserRequest;
    return user.retrieveProfile(req);
  }, action.profileUserId);
  if (userRes.user !== null) {
    yield put(fetchProfileUserRequestSuccessActionCreator(userRes.user));
  } else {
    yield put(fetchProfileUserRequestFailureActionCreator(userRes.error!));
  }
}

function* gFetchContactsRequest() {
  const state: State = yield select();
  const user = state.user.user!;
  const res: IFetchUsersResponse = yield call(() => {
    return user.retrieveContacts();
  });
  if (res.users) {
    let users: {[key: string]: IUser} = {};
    res.users.map((value: IUser) => {
      users[value.userId!] = value;
    });
    yield put(fetchContactsRequestSuccessActionCreator(users));
  } else {
    yield put(fetchContactsRequestFailureActionCreator(res.error!));
  }
}

function* gMarkAsReadRequest(action: MarkAsReadRequestAction) {
  const state: State = yield select();
  const room = state.room.room!;
  const res: IFetchUserResponse = yield call(() => {
    return room.markAsRead();
  }, action.roomId);
  if (res.error) {
    yield put(markAsReadRequestFailureActionCreator(res.error!));
  } else {
    yield put(markAsReadRequestSuccessActionCreator());
  }
}

function* gUserBlockRequest(action: UserBlockRequestAction) {
  const state: State = yield select();
  const user = state.user.user;
  const res: IFetchBlockUsersResponse = yield call((blockUserIdsList: string[]) => {
    const req = {
      blockUserIdsList
    } as IAddBlockUsersRequest;
    return user!.addBlockUsers(req);
  }, action.blockUserIds);
  if (res.blockUsers) {
    yield put(userBlockRequestSuccessActionCreator(res.blockUsers));
    yield put(fetchUserRequestActionCreator(user!.userId, false));
  } else {
    yield put(userBlockRequestFailureActionCreator(res.error!));
  }
}

function* gUserUnBlockRequest(action: UserUnBlockRequestAction) {
  const state: State = yield select();
  const user = state.user.user;
  const res: IFetchBlockUsersResponse = yield call((blockUserIdsList: string[]) => {
    const req = {
      blockUserIdsList
    } as IDeleteBlockUsersRequest;
    return user!.deleteBlockUsers(req);
  }, action.unBlockUserIds);
  if (res.blockUsers) {
    yield put(userUnBlockRequestSuccessActionCreator(res.blockUsers));
    yield put(fetchUserRequestActionCreator(user!.userId, false));
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
