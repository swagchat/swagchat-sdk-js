import { LOCATION_CHANGE } from 'react-router-redux';
import { ForkEffect, put, select, take, takeLatest } from 'redux-saga/effects';

import { createMessage, IMessage, MessageType } from '../';
import {
    setIsFirstFetchActionCreator, updateMessagesActionCreator, retrieveRoomMessagesRequestActionCreator
} from '../actions/message';
import { FETCH_ROOM_REQUEST_SUCCESS, fetchRoomRequestActionCreator } from '../actions/room';
import {
    clearProfileUserActionCreator, FETCH_USER_REQUEST_SUCCESS, fetchUserRequestActionCreator,
    setProfileUserIdActionCreator
} from '../actions/user';
import { retrieveUserRoomsAllRequestActionCreator } from '../actions/userRoomsAll';
import { State } from '../stores';
import { RetrieveRoomMessagesReason } from '../const';

function* gLocationChange() {
  const state: State = yield select();
  const location = state.router.location;
  if (location === null) {
    return;
  }

  if (state.client.client === null || state.client.settings === null) {
    return;
  }

  const client = state.client.client;
  const settings = state.client.settings;

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

  let roomsPathRegExp = location.pathname === client.paths.roomListPath ? true : false;
  if (!roomsPathRegExp) {
    roomsPathRegExp = location.hash === '#' + client.paths.roomListPath ? true : false;
  }

  if (roomsPathRegExp) {
    // rooms page
    yield put(retrieveUserRoomsAllRequestActionCreator());
  }

  let messagesPathRegExp = location.pathname.match(new RegExp('^' + client.paths.messageListPath)) ? true : false;
  if (messagesPathRegExp) {
    // messages page
    const roomIds = location.pathname.match(new RegExp(client.paths.messageListPath + '/([a-zA-z0-9-]+)'));
    if (roomIds !== null) {
      const currentRoomId = roomIds[1];

      yield put(setIsFirstFetchActionCreator(true));
      yield put(fetchRoomRequestActionCreator(currentRoomId));
      yield take(FETCH_ROOM_REQUEST_SUCCESS);

      if (settings.messageListPlaceholderCount! > 0) {
        const placeholderMessags = new Array<IMessage>();
        for (let i = 1; i <= settings.messageListPlaceholderCount!; i++) {
          const placeholderMessage = createMessage(
            MessageType.PLACEHOLDER + '-' + i,
            currentRoomId,
            client.userId,
            MessageType.PLACEHOLDER,
            {}
          );
          placeholderMessags.push(placeholderMessage);
        }
        yield put(updateMessagesActionCreator(placeholderMessags, RetrieveRoomMessagesReason.PLACEHOLDER));
      }
      yield put(retrieveRoomMessagesRequestActionCreator(RetrieveRoomMessagesReason.PAGING));
    }
  }

  let roomSettingPathRegExp = location.pathname.match(new RegExp('^' + client.paths.roomSettingPath)) ? true : false;
  if (roomSettingPathRegExp) {
    // roomSetting page
    const roomIds = location.pathname.match(new RegExp(client.paths.roomSettingPath + '/([a-zA-z0-9-]+)'));
    if (roomIds !== null) {
      const currentRoomId = roomIds[1];
      yield put(fetchRoomRequestActionCreator(currentRoomId));
    }
  }

  let profilePathRegExp = location.pathname.match(new RegExp('^' + client.paths.profilePath)) ? true : false;
  if (profilePathRegExp) {
    // profile page
    yield put(clearProfileUserActionCreator());
    const userIds = location.pathname.match(new RegExp(client.paths.profilePath + '/([a-zA-z0-9-]+)'));
    if (userIds !== null) {
      const userId = userIds[1];
      yield put(setProfileUserIdActionCreator(userId));
    }
  }

  let accountPathRegExp = location.pathname === client.paths.accountPath ? true : false;
  if (accountPathRegExp) {
    // accout page
  }

  yield put;
}

export function* routerSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(LOCATION_CHANGE, gLocationChange);
}
