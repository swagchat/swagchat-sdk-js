import { LOCATION_CHANGE } from 'react-router-redux';
import { call, ForkEffect, put, select, takeLatest } from 'redux-saga/effects';

import { IFetchUserResponse, IRetrieveUserRequest, UserRoomsFilter } from '../';
import { setIsFirstFetchActionCreator } from '../actions/message';
// import { createGuestuserAndCreateRoomAndFetchMessagesRequestActionCreator } from '../actions/combined';
import { setCurrentRoomIdActionCreator } from '../actions/room';
import {
    clearProfileUserActionCreator, fetchUserRequestFailureActionCreator,
    fetchUserRequestSuccessActionCreator, retrieveUserRoomsRequestActionCreator,
    setProfileUserIdActionCreator
} from '../actions/user';
import { State } from '../stores';

function* gLocationChange() {
  const state: State = yield select();
  const location = state.router.location;
  if (location === null) {
    return;
  }

  if (state.client.client === null) {
    return;
  }

  const client = state.client.client;

  let guestMessagesPathRegExp = location.pathname.match(new RegExp('^' + client.paths.guestMessageListPath));
  if (guestMessagesPathRegExp !== null) {
    // guest messages page
    // yield put(createGuestuserAndCreateRoomAndFetchMessagesRequestActionCreator());
    return;
  }

  let roomsPathRegExp = location.pathname.match(new RegExp('^' + client.paths.roomListPath));
  if (!roomsPathRegExp) {
    roomsPathRegExp = location.hash.match(new RegExp('^#' + client.paths.roomListPath));
  }

  if (state.user.user === null) {
    // let userRooms: {[key: string]: IRoomForUser} = {};
    const userRes: IFetchUserResponse = yield call(() => {
      const req = {
        userId: client.userId
      } as IRetrieveUserRequest;
      return client.retrieveUser(req);
    });
    if (userRes.user !== null) {
      // if (userRes.user.rooms !== undefined && Object.keys(userRes.user.rooms).length > 0) {
      //   userRes.user.rooms!.map((roomForUser: IRoomForUser) => {
      //     const users = opponentUser(roomForUser.users, userRes.user!.userId);
      //     if (users) {
      //       roomForUser.name = roomForUser.name === '' ?
      //         generateRoomName(roomForUser.users, userRes.user!.userId) : roomForUser.name;
      //       roomForUser.pictureUrl = users[0].pictureUrl ? users[0].pictureUrl : '';
      //     }
      //     userRooms[roomForUser.roomId] = roomForUser;
      //   });
      // }
      yield put(fetchUserRequestSuccessActionCreator(userRes.user));
    } else {
      yield put(fetchUserRequestFailureActionCreator(userRes.error!));
      return;
    }
  }

  if (roomsPathRegExp !== null) {
    // rooms page
    yield put(retrieveUserRoomsRequestActionCreator(UserRoomsFilter.NONE));
  }

  let messagesPathRegExp = location.pathname.match(new RegExp('^' + client.paths.messageListPath));
  if (messagesPathRegExp !== null) {
    // messages page
    const roomIds = location.pathname.match(new RegExp(client.paths.messageListPath + '/([a-zA-z0-9-]+)'));
    if (roomIds !== null) {
      const currentRoomId = roomIds[1];
      let state: State = yield select();
      if (state.user.userRoomsMap![currentRoomId] !== undefined) {
        yield put(setIsFirstFetchActionCreator(true));
        yield put(setCurrentRoomIdActionCreator(currentRoomId));
        // yield put(setCurrentRoomNameActionCreator(state.user.userRooms![currentRoomId].name));
      }
    }
  }

  let roomSettingPathRegExp = location.pathname.match(new RegExp('^' + client.paths.roomSettingPath));
  if (roomSettingPathRegExp !== null) {
    // roomSetting page
    const roomIds = location.pathname.match(new RegExp(client.paths.roomSettingPath + '/([a-zA-z0-9-]+)'));
    if (roomIds !== null) {
      const currentRoomId = roomIds[1];
      let state: State = yield select();
      if (state.user.userRoomsMap![currentRoomId] !== undefined) {
        yield put(setCurrentRoomIdActionCreator(currentRoomId));
        // yield put(setCurrentRoomNameActionCreator(state.user.userRooms![currentRoomId].name));
      }
    }
  }

  let profilePathRegExp = location.pathname.match(new RegExp('^' + client.paths.profilePath));
  if (profilePathRegExp !== null) {
    // profile page
    yield put(clearProfileUserActionCreator());
    const userIds = location.pathname.match(new RegExp(client.paths.profilePath + '/([a-zA-z0-9-]+)'));
    if (userIds !== null) {
      const userId = userIds[1];
      yield put(setProfileUserIdActionCreator(userId));
    }
  }

  let accountPathRegExp = location.pathname.match(new RegExp('^' + client.paths.accountPath));
  if (accountPathRegExp !== null) {
    // accout page
  }

  yield put;
}

export function* routerSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(LOCATION_CHANGE, gLocationChange);
}
