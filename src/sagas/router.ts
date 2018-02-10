import { takeLatest, ForkEffect, put, select, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  setCurrentRoomIdActionCreator,
  setCurrentRoomNameActionCreator,
} from '../actions/client';
import {
  fetchUserRequestSuccessActionCreator,
  fetchUserRequestFailureActionCreator,
} from '../actions/user';
import {
  State,
  IFetchUserResponse,
  IRoomForUser,
  opponentUser,
} from '../';

function* gLocationChange() {
  const state: State = yield select();
  const location = state.router.location;
  if (location === null) {
    return;
  }

  if (state.client.client === null || state.client.userId === '' || state.client.accessToken === '') {
    return;
  }
  const client = state.client.client;

  let userRooms: {[key: string]: IRoomForUser} = {};
  if (state.user.user === null) {
    const userRes: IFetchUserResponse = yield call(() => {
      return client.getUser(state.client.userId, state.client.accessToken);
    });
    if (userRes.user) {
      userRes.user.rooms!.map((value: IRoomForUser) => {
        const users = opponentUser(value.users, state.client.userId);
        let userNames = '';
        if (users) {
          for (let i = 0; i < users.length; i++) {
            if (users[i].isShowUsers) {
              userNames += users[i].name + ' ';
            }
          }
          value.name = userNames;
          value.pictureUrl = users[0].pictureUrl;
        }
        userRooms[value.roomId] = value;
      });
      yield put(fetchUserRequestSuccessActionCreator(userRes.user, userRooms));
    } else {
      yield put(fetchUserRequestFailureActionCreator(userRes.error!));
    }
  }

  let messagePathRegExp = location.pathname.match(new RegExp('^' + '/messages'));
  if (messagePathRegExp !== null) {
    // messages page
    const roomIds = location.pathname.match(new RegExp('/messages' + '/([a-zA-z0-9-]+)'));
    if (roomIds !== null) {
      const currentRoomId = roomIds[1];
      yield put(setCurrentRoomIdActionCreator(currentRoomId));
      yield put(setCurrentRoomNameActionCreator(userRooms[currentRoomId].name));
    }
  }
  yield put;
}

export function* routerSaga(): IterableIterator<ForkEffect> {
  yield takeLatest(LOCATION_CHANGE, gLocationChange);
}
