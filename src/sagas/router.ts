import { LOCATION_CHANGE } from 'react-router-redux';
import { ForkEffect, put, select, take, takeLatest } from 'redux-saga/effects';

import {
    retrieveRoomMessagesRequestActionCreator, setIsFirstFetchActionCreator
} from '../actions/message';
import { FETCH_ROOM_REQUEST_SUCCESS, fetchRoomRequestActionCreator } from '../actions/room';
import {
    clearProfileUserActionCreator, FETCH_USER_REQUEST_SUCCESS, fetchUserRequestActionCreator,
    setProfileUserIdActionCreator
} from '../actions/user';
import { retrieveUserRoomsAllRequestActionCreator } from '../actions/userRoomsAll';
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
    // yield put(createGuestuserAndCreateRoomAndRetrieveRoomMessagesRequestActionCreator());
    return;
  }

  if (state.user.user === null) {
    yield put(fetchUserRequestActionCreator(client.userId, false));
    yield take(FETCH_USER_REQUEST_SUCCESS);
  }

  let roomsPathRegExp = location.pathname.match(new RegExp('^' + client.paths.roomListPath));
  if (!roomsPathRegExp) {
    roomsPathRegExp = location.hash.match(new RegExp('^#' + client.paths.roomListPath));
  }

  if (roomsPathRegExp !== null) {
    // rooms page
    yield put(retrieveUserRoomsAllRequestActionCreator());
  }

  let messagesPathRegExp = location.pathname.match(new RegExp('^' + client.paths.messageListPath));
  if (messagesPathRegExp !== null) {
    // messages page
    const roomIds = location.pathname.match(new RegExp(client.paths.messageListPath + '/([a-zA-z0-9-]+)'));
    if (roomIds !== null) {
      const currentRoomId = roomIds[1];
      yield put(setIsFirstFetchActionCreator(true));
      yield put(fetchRoomRequestActionCreator(currentRoomId));
      yield take(FETCH_ROOM_REQUEST_SUCCESS);
      yield put(retrieveRoomMessagesRequestActionCreator());
    }
  }

  let roomSettingPathRegExp = location.pathname.match(new RegExp('^' + client.paths.roomSettingPath));
  if (roomSettingPathRegExp !== null) {
    // roomSetting page
    const roomIds = location.pathname.match(new RegExp(client.paths.roomSettingPath + '/([a-zA-z0-9-]+)'));
    if (roomIds !== null) {
      const currentRoomId = roomIds[1];
      yield put(fetchRoomRequestActionCreator(currentRoomId));
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
